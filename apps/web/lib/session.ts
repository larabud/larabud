'use server'
import 'server-only'
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { Session } from './definitions';
import { BACKEND_URL } from './constants';

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: 'lax' as const,
        path: '/',
    } as const,
};

export async function encrypt(payload: Record<string, any>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

// Decrypt the session token to extract payload
export async function decrypt(session: string) {
    try {
        const { payload } = await jwtVerify<Session>(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error("Session decryption failed:", error);
        return null;
    }
}

// Create and set the session cookie
export async function createSession(payload: Session) {
    const session = await encrypt({ payload });
    cookies().set(cookie.name, session, cookie.options);
}

// Verify if the session is valid (decrypt the cookie)
export async function verifySession() {
    const session = cookies().get(cookie.name)?.value;

    if (!session) {
        return null; // No session cookie found
    }

    const payload = await decrypt(session);
    if (!payload) {
        return null; // Invalid or expired session
    }

    return payload; // Return session payload if valid
}

export async function removeSession() {
    await cookies().delete("session")

}

export async function getSession() {
    const cookie = cookies().get("session")?.value;
    if (!cookie) return null;
    try {

        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"]
        })

        return payload.payload as Session
    } catch (err) {
        console.error("Failed to verify the session", err)
    }
}


export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${oldRefreshToken}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to refresh token!")
        }

        const { accessToken, refreshToken } = await response.json()

        await updateTokens({ accessToken, refreshToken })

    } catch (err) {
        console.error("Refresh token failed:", err)
        return null
    }
}

export async function updateTokens({
    accessToken,
    refreshToken,
}: {
    accessToken: string;
    refreshToken: string;
}) {
    const cookie = cookies().get("session")?.value;
    if (!cookie) return null;

    const { payload } = await jwtVerify<Session>(
        cookie,
        encodedKey
    );

    if (!payload) throw new Error("Session not found");

    const newPayload: Session = {
        user: {
            ...payload.user,
        },
        accessToken,
        refreshToken,
    };

    await createSession(newPayload);
}
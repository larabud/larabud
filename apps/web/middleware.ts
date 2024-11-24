import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    let hostname = req.headers
        .get("host")!
        .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    // special case for Vercel preview deployment URLs
    if (
        hostname.includes("---") &&
        hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
        hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN
            }`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
        }`;


    // rewrite root application to `/home` folder
    if (
        hostname === "localhost:3000" ||
        hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
        return NextResponse.rewrite(
            new URL(`/home${path === "/" ? "" : path}`, req.url),
        );
    }

    // rewrites for app pages
    if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
        const cookie = cookies().get('session')?.value;
        if (!cookie) {
            if (path !== "/login") {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        } else {
            const session = await decrypt(cookie);

            if (!session && path !== "/login") {
                return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if session is invalid or expired
            } else if (session && path === "/login") {
                return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if already logged in
            }
        }

        return NextResponse.rewrite(
            new URL(`/app${path === "/" ? "" : path}`, req.url),
        );
    }
    // rewrite everything else to `/[domain]/[slug] dynamic route
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
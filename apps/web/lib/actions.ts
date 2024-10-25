"use server"
import { authFetch } from "./authFetch";
import { BACKEND_URL } from "./constants";
import { WorkspaceFormSchema, WorkspaceFormState } from "./type"

export const getWorkspaces = async () => {
    const response = await authFetch(`${BACKEND_URL}/workspaces`);

    const result = await response.json();
    return result;
};


export async function createWorkspace(state: WorkspaceFormState, formData: FormData): Promise<WorkspaceFormState> {

    const validatedFields = WorkspaceFormSchema.safeParse({
        name: formData.get("name"),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }
    const response = await authFetch(`${BACKEND_URL}/workspaces`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data)
    });

    if (!response.ok) {
        return {
            message: response.status === 409
                ? "A project with this title already exists"
                : response.statusText
        };
    }
}


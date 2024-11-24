import { authFetch } from '@/lib/authFetch';
import { BACKEND_URL } from '@/lib/constants';
import { Workspace } from '@/lib/type';
import useWorkspaceStore from '@/stores/workspaceStore';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface WorkspaceProps {
    redirectIfSelected?: string;
}

interface CreateWorkspaceProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    [key: string]: any;
}

interface UpdateWorkspaceProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    [key: string]: any;
}

interface DeleteWorkspaceProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    workspaceId: string;
}

interface SwitchWorkspaceProps {
    workspaceId: string;
}

const fetchWorkspaces = async () => {
    const response = await authFetch(`${BACKEND_URL}/workspaces`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const useWorkspace = ({ redirectIfSelected }: WorkspaceProps = {}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const setWorkspaceId = useWorkspaceStore((state) => state.setWorkspaceId);

    const { data: workspaces, error, isLoading, isError, isFetching } = useQuery<Workspace[]>({
        queryKey: ['workspaces'],
        queryFn: fetchWorkspaces,
    });

    const createWorkspace = useMutation({
        mutationFn: async ({ setErrors, ...props }: CreateWorkspaceProps) => {
            const response = await authFetch(`${BACKEND_URL}/workspaces`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    setErrors(errorData.errors);
                }
                throw new Error('Failed to create workspace');
            }
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "You've created a new workspace!",
            });
        },
        onError: (error: any) => {
            console.error("Error creating workspace:", error);
            toast({
                title: "Error",
                description: "Error creating workspace!",
            });
        }
    });

    const updateWorkspace = useMutation({
        mutationFn: async ({ setErrors, ...props }: UpdateWorkspaceProps) => {
            const response = await authFetch(`${BACKEND_URL}/workspaces/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    setErrors(errorData.errors);
                }
                throw new Error('Failed to update workspace');
            }
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        }
    });

    const deleteWorkspace = useMutation({
        mutationFn: async ({ setErrors, workspaceId }: DeleteWorkspaceProps) => {
            const response = await authFetch(`${BACKEND_URL}/workspaces/${workspaceId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    setErrors(errorData.errors);
                }
                throw new Error('Failed to delete workspace');
            }
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        }
    });

    const switchWorkspace = useMutation({
        mutationFn: async ({ workspaceId }: SwitchWorkspaceProps) => {
            setWorkspaceId(workspaceId)

            toast({
                title: "Workspace Switched",
                description: `Switched to workspace ID: ${workspaceId}`,
            });

            if (redirectIfSelected) {
                router.push(redirectIfSelected);
            }
        },
        onError: (error: any) => {
            console.error("Error switching workspace:", error);
            toast({
                title: "Error",
                description: "Error switching workspace!",
            });
        }
    });


    return {
        workspaces,
        error,
        isLoading,
        isError,
        isFetching,
        createWorkspace: createWorkspace.mutate,
        updateWorkspace: updateWorkspace.mutate,
        deleteWorkspace: deleteWorkspace.mutate,
        switchWorkspace: switchWorkspace.mutate,
    };
};

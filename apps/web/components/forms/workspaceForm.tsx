import { createWorkspace } from '@/lib/actions';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

const WorkspaceForm = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => createWorkspace(undefined, formData),
        onSuccess: () => {
            // Invalidate and refetch any relevant queries
            queryClient.invalidateQueries({
                queryKey: ['workspaces']
            });

        },
        onError: (error: any) => {
            console.error("Error creating workspace:", error);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        mutation.mutate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Workspace name</Label>
                        <Input id="name" name="name" placeholder="Acme Inc." />
                    </div>
                </div>
            </div>
            {children}
        </form>
    );
};

export default WorkspaceForm;

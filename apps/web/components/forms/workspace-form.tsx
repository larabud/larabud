"use client"
import { useWorkspace } from '@/hooks/workspace';
import { Input } from '@repo/ui/components/ui/input'
import { Label } from '@repo/ui/components/ui/label'
import React, { PropsWithChildren, useState } from 'react'


const WorkspaceForm = ({ children }: PropsWithChildren) => {
    const { createWorkspace } = useWorkspace();
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        createWorkspace({
            setErrors,
            name: formData.get('name'),
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Workspace name</Label>
                        <Input id="name" name="name" placeholder="Acme Inc." />
                    </div>
                    {errors.length > 0 && (
                        <div className="text-red-500">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {children}
        </form>
    )
}

export default WorkspaceForm
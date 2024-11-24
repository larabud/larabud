"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@repo/ui/components/ui/avatar";
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@repo/ui/components/ui/command";
import SubmitButton from "./ui/submit-button";
import { Workspace } from "@/lib/type";
import { useWorkspace } from "@/hooks/workspace";
import useWorkspaceStore from "@/stores/workspaceStore";
import WorkspaceForm from "./forms/workspace-form";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const WorkspaceSwitcher = () => {
    const {
        workspaces,
        isLoading,
        isError,
        switchWorkspace,
    } = useWorkspace();

    const [open, setOpen] = React.useState(false);
    const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = React.useState(false);
    const { currentWorkspaceId } = useWorkspaceStore();

    const currentWorkspace = workspaces?.find(workspace => workspace.id === currentWorkspaceId);

    if (isLoading) return <WorkspaceSwitcherSkeleton />;
    if (isError) return <div>Error loading workspaces.</div>;

    return (
        <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="link"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a workspace"
                        className={cn("w-[200px] mx-0 px-1 justify-between font-thin hover:no-underline")}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${currentWorkspace?.id}.png`}
                                alt={currentWorkspace?.name}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {currentWorkspace?.name || "Select a workspace"}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search workspace..." />
                        <CommandList>
                            <CommandEmpty>No workspace found.</CommandEmpty>
                            {workspaces?.map((workspace: Workspace) => (
                                <CommandItem
                                    key={workspace.id}
                                    onSelect={() => {
                                        switchWorkspace({ workspaceId: workspace.id }); // Switch workspace on selection
                                        setOpen(false);
                                    }}
                                    className="text-sm font-thin"
                                >
                                    <Avatar className="mr-2 h-5 w-5">
                                        <AvatarImage
                                            src={`https://avatar.vercel.sh/${workspace.id}.png`}
                                            alt={workspace.name}
                                            className="grayscale"
                                        />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    {workspace.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentWorkspace?.id === workspace.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false);
                                            setShowNewWorkspaceDialog(true);
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Workspace
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create workspace</DialogTitle>
                    <DialogDescription>
                        Add a new workspace to manage products and servers.
                    </DialogDescription>
                </DialogHeader>
                <WorkspaceForm>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewWorkspaceDialog(false)}>
                            Cancel
                        </Button>
                        <SubmitButton fullWidth={false} onClick={() => setShowNewWorkspaceDialog(false)}>Create</SubmitButton>
                    </DialogFooter>
                </WorkspaceForm>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceSwitcher;



export const WorkspaceSwitcherSkeleton: React.FC = () => {
    return (
        <div className='flex items-center gap-1'>
            <Skeleton className="w-[20px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[16px] rounded-full" />
        </div>
    );
};


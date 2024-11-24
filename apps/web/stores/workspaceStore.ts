import { create } from 'zustand';

interface WorkspaceState {
    currentWorkspaceId: string | null;
    setWorkspaceId: (workspaceId: string) => void;
    removeWorkspaceId: () => void;
}

const useWorkspaceStore = create<WorkspaceState>((set) => ({
    currentWorkspaceId: typeof window !== 'undefined' ? localStorage.getItem('workspace-id') || null : null,
    setWorkspaceId: (workspaceId: string) => {
        set({ currentWorkspaceId: workspaceId });
        if (typeof window !== 'undefined') {
            localStorage.setItem('workspace-id', workspaceId);
        }
    },
    removeWorkspaceId: () => {
        set({ currentWorkspaceId: null });
        if (typeof window !== 'undefined') {
            localStorage.removeItem('workspace-id');
        }
    },
}));

export default useWorkspaceStore;

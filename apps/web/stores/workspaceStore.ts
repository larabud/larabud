import { create } from 'zustand';

interface WorkspaceState {
    currentWorkspaceId: string | null;
    setWorkspaceId: (workspaceId: string) => void;
    removeWorkspaceId: () => void;
}

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

const useWorkspaceStore = create<WorkspaceState>((set: SetState<WorkspaceState>) => ({
    currentWorkspaceId: localStorage.getItem('workspace-id') || null,
    setWorkspaceId: (workspaceId: string) => {
        set({ currentWorkspaceId: workspaceId });
        localStorage.setItem('workspace-id', workspaceId);
    },
    removeWorkspaceId: () => {
        set({ currentWorkspaceId: null });
        localStorage.removeItem('workspace-id');
    },
}));

export default useWorkspaceStore;

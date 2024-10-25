import { create } from 'zustand';

interface WorkspaceState {
    currentWorkspaceId: string | null;
    setWorkspaceId: (workspaceId: string) => void;
}

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

const useWorkspaceStore = create<WorkspaceState>((set: SetState<WorkspaceState>) => ({
    currentWorkspaceId: localStorage.getItem('currentWorkspaceId') || null,
    setWorkspaceId: (workspaceId: string) => {
        set({ currentWorkspaceId: workspaceId });
        localStorage.setItem('currentWorkspaceId', workspaceId);
    },
}));

export default useWorkspaceStore;

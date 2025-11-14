import { create } from "zustand";
import { persist } from 'zustand/middleware'

//Aqui define a tipagem do estado inicial
type State = {
  autoplay: boolean;
  expandedModule?: string | null;
  modulesListCollapsed: boolean;
};

//Este trecho define as funções que alteram o estado
type Actions = {
  setAutoplay: (autoplay: boolean) => void;
  setExpandedModule: (expandedModule: string | undefined) => void;
  setModulesListCollapsed: (modulesListCollapsed: boolean) => void;
};

//Aqui junta o estado com as ações
type Store = State & Actions;

//Criação do store com persistência
export const usePreferencesStore = create<Store>()(
  persist(
    (set) => ({
      autoplay: false,
      expandedModule: null,
      modulesListCollapsed: false,
      setAutoplay: (autoplay) => set({ autoplay }),
      setExpandedModule: (expandedModule) => set({ expandedModule }),
      setModulesListCollapsed: (modulesListCollapsed) =>
        set({ modulesListCollapsed }),
    }),
    {
      name: "codelab:preferences",
    }
  )
);
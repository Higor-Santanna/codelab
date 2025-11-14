"use client"
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { ModuleItem } from "./module-item";
import { usePreferencesStore } from "@/stores/preferences";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";

type ModulesListProps = {
  modules: CourseModuleWithLessons[];
};

export const ModulesList = ({ modules }: ModulesListProps) => {
  const {expandedModule, setExpandedModule, modulesListCollapsed, setModulesListCollapsed} = usePreferencesStore();

  const handleToggleCollapsed = () => setModulesListCollapsed(!modulesListCollapsed);
  return (
    <aside
      className={cn(
        "h-full border-l border-border bg-sidebar p-4 overflow-y-auto overflow-x-hidden min-w-[380px] max-w-[380px] transition-all flex flex-col items-center",
        !modulesListCollapsed && "fixed top-0 bottom-0 z-10 right-0 sm:relative", modulesListCollapsed && "w-18 max-w-18 min-w-18 hidden sm:flex"
      )}
    >
      <div className="absolute z-10 left-0 top-0 bottom-0 w-4 flex justify-start group cursor-e-resize group" onClick={handleToggleCollapsed}>
        <div className="h-full w-0.5 group-hover:bg-sidebar-border transition-all" />
      </div>

      {modulesListCollapsed ? (
        <Button size="icon" variant="outline" onClick={handleToggleCollapsed}>
          <PanelRightOpen />
        </Button>
      ) : (
        <Accordion.Root
        type="single"
        className="w-full h-full flex flex-col gap-3"
        collapsible
      >
        {modules.map((courseModule) => (
          <ModuleItem key={courseModule.id} data={courseModule} />
        ))}
      </Accordion.Root>
      )}
    </aside>
  );
};
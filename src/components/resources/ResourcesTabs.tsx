
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Resource } from "@/hooks/use-resources";
import { ResourcesList } from "./ResourcesList";

interface ResourcesTabsProps {
  filteredResources: Resource[];
  isLoading: boolean;
}

export function ResourcesTabs({ filteredResources, isLoading }: ResourcesTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-4">
        <ResourcesList resources={filteredResources} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="popular">
        <ResourcesList 
          resources={filteredResources
            .slice()
            .sort((a, b) => b.downloads - a.downloads)
            .slice(0, 6)}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="recent">
        <ResourcesList 
          resources={filteredResources
            .slice()
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 6)}
          isLoading={isLoading} 
        />
      </TabsContent>
    </Tabs>
  );
}

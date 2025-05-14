
import React from "react";
import { Resource } from "@/hooks/use-resources";
import { ResourceCard } from "./ResourceCard";
import { FileText } from "lucide-react";

interface ResourcesListProps {
  resources: Resource[];
  isLoading: boolean;
}

export function ResourcesList({ resources, isLoading }: ResourcesListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading resources...</p>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No resources found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}

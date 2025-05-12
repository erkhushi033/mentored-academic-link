
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string | null;
  tags: string[] | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  downloads: number;
  thumbnail_url: string | null;
}

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setResources(data || []);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      toast({
        title: "Error loading resources",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addResource = async (resource: Omit<Resource, 'id' | 'created_at' | 'updated_at' | 'downloads'>) => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert(resource)
        .select()
        .single();
      
      if (error) throw error;
      
      setResources(prev => [data, ...prev]);
      return data;
    } catch (e: any) {
      toast({
        title: "Error adding resource",
        description: e.message,
        variant: "destructive",
      });
      throw e;
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return {
    resources,
    isLoading,
    error,
    fetchResources,
    addResource
  };
}

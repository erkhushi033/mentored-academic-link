
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useResources, Resource } from "@/hooks/use-resources";
import { ResourcesHeader } from "@/components/resources/ResourcesHeader";
import { SearchFilters } from "@/components/resources/SearchFilters";
import { ResourcesTabs } from "@/components/resources/ResourcesTabs";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { resources, isLoading, fetchResources } = useResources();

  // Get unique subjects and types from resources
  const subjects = Array.from(new Set(resources.map(r => r.category)));
  const types = Array.from(new Set(resources.map(r => r.category)));

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = subjectFilter === "" || resource.category === subjectFilter;
    const matchesType = typeFilter === "" || resource.category === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleUploadComplete = (newResource: Resource) => {
    setIsUploadDialogOpen(false);
    fetchResources(); // Refresh the resources list
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ResourcesHeader 
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
          handleUploadComplete={handleUploadComplete}
        />

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8">
              <SearchFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                subjectFilter={subjectFilter}
                setSubjectFilter={setSubjectFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                subjects={subjects}
                types={types}
                handleSearch={handleSearch}
              />

              <ResourcesTabs 
                filteredResources={filteredResources}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;

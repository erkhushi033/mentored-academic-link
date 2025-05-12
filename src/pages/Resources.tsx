
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockResources, Resource } from "@/lib/mockData";
import { BookOpen, Search, ThumbsUp, Download, File, FileText, Video, BookOpen as Book, Newspaper, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DocumentUpload } from "@/components/resources/DocumentUpload";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Get unique subjects from resources
  const subjects = Array.from(new Set(mockResources.map(r => r.subject)));
  const types = Array.from(new Set(mockResources.map(r => r.type)));

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-5 w-5" />;
      case "paper":
        return <File className="h-5 w-5" />;
      case "book":
        return <Book className="h-5 w-5" />;
      case "article":
        return <Newspaper className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = subjectFilter === "" || resource.subject === subjectFilter;
    const matchesType = typeFilter === "" || resource.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would fetch from an API
    console.log("Searching for:", searchTerm);
  };

  const handleUpload = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadComplete = (newResource: any) => {
    setIsUploadDialogOpen(false);
    // In a real app, you would fetch the updated resources from the API
    // For now, we'll just add the new resource to our local state
    setResources(prev => [
      {
        id: newResource.id || `new-${Date.now()}`,
        title: newResource.title,
        description: newResource.description || "No description provided",
        subject: newResource.category,
        type: newResource.category,
        uploadedBy: "You",
        uploadDate: new Date().toISOString(),
        likes: 0,
        downloads: 0,
        url: newResource.file_url
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-muted py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Academic Resources</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Access and share study materials, papers, and educational content
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleUpload}>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] p-0">
                    <DocumentUpload 
                      onUploadComplete={handleUploadComplete} 
                      onCancel={() => setIsUploadDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Search and filters */}
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-grow">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Search resources..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-48">
                        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="w-full md:w-48">
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {types.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button type="submit" className="w-full md:w-auto">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Resources List */}
              <div>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4">
                    {filteredResources.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((resource) => (
                          <Card key={resource.id} className="overflow-hidden card-hover">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    {getResourceIcon(resource.type)}
                                  </div>
                                  <div className="text-sm font-medium">
                                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {resource.subject}
                                </div>
                              </div>
                              <CardTitle className="mt-3 text-lg">
                                {resource.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {resource.description}
                              </p>
                              <div className="mt-4 text-xs text-muted-foreground">
                                Uploaded by {resource.uploadedBy} on {new Date(resource.uploadDate).toLocaleDateString()}
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/50 px-6 py-3">
                              <div className="flex justify-between items-center w-full">
                                <div className="flex space-x-4">
                                  <div className="flex items-center text-sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {resource.likes}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    {resource.downloads}
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost">View</Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No resources found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Try changing your search or filter criteria.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="popular">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredResources
                        .sort((a, b) => b.likes - a.likes)
                        .slice(0, 6)
                        .map((resource) => (
                          <Card key={resource.id} className="overflow-hidden card-hover">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    {getResourceIcon(resource.type)}
                                  </div>
                                  <div className="text-sm font-medium">
                                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {resource.subject}
                                </div>
                              </div>
                              <CardTitle className="mt-3 text-lg">
                                {resource.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {resource.description}
                              </p>
                              <div className="mt-4 text-xs text-muted-foreground">
                                Uploaded by {resource.uploadedBy} on {new Date(resource.uploadDate).toLocaleDateString()}
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/50 px-6 py-3">
                              <div className="flex justify-between items-center w-full">
                                <div className="flex space-x-4">
                                  <div className="flex items-center text-sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {resource.likes}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    {resource.downloads}
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost">View</Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recent">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredResources
                        .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                        .slice(0, 6)
                        .map((resource) => (
                          <Card key={resource.id} className="overflow-hidden card-hover">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    {getResourceIcon(resource.type)}
                                  </div>
                                  <div className="text-sm font-medium">
                                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {resource.subject}
                                </div>
                              </div>
                              <CardTitle className="mt-3 text-lg">
                                {resource.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {resource.description}
                              </p>
                              <div className="mt-4 text-xs text-muted-foreground">
                                Uploaded by {resource.uploadedBy} on {new Date(resource.uploadDate).toLocaleDateString()}
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/50 px-6 py-3">
                              <div className="flex justify-between items-center w-full">
                                <div className="flex space-x-4">
                                  <div className="flex items-center text-sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {resource.likes}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    {resource.downloads}
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost">View</Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;

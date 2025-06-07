
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  id: string;
  filename: string;
  title: string;
  classification: string;
  subcategory: string;
  uploaded_at: string;
  size: number;
  status: string;
}


const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([]);
  
  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("uploaded_at", { ascending: false });
  
      if (!error && data) {
        setDocuments(data);
      }
    };
  
    fetchDocuments();
  }, []);
  const classifications = ["all", "Education", "Business", "Health"];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassification = selectedClassification === "all" || 
                                 doc.classification === selectedClassification;
    return matchesSearch && matchesClassification;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Education": return "bg-blue-100 text-blue-800";
      case "Business": return "bg-purple-100 text-purple-800";
      case "Health": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Library</h1>
        <p className="text-gray-600">Browse and manage your uploaded documents</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Documents</label>
              <Input
                placeholder="Search by title or filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Classification</label>
              <Select value={selectedClassification} onValueChange={setSelectedClassification}>
                <SelectTrigger>
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent>
                  {classifications.map(classification => (
                    <SelectItem key={classification} value={classification}>
                      {classification === "all" ? "All Classifications" : classification}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredDocuments.length} of {documents.length} documents
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <Badge className={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {doc.filename}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getClassificationColor(doc.classification)}>
                  {doc.classification}
                </Badge>
                <Badge variant="outline">
                  {doc.subcategory}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>Size: {(() => {
                const sizes = ["B", "KB", "MB", "GB"];
                let size = doc.size;
                let index = 0;
                while (size >= 1024 && index < sizes.length - 1) {
                size /= 1024;
                index++;
                }
                return `${size.toFixed(2)} ${sizes[index]}`;
              })()}</p>
                <p>Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}</p>
              </div>
              
              <div className="flex space-x-2">


                <a
                href={supabase.storage.from("cloud").getPublicUrl(doc.filename).data.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or upload some documents to get started.
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default Documents;

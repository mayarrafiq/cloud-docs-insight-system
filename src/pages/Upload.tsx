
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload as UploadIcon, FileText, Link as LinkIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client"; // adjust the path if needed

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  const [storageStats, setStorageStats] = useState({ totalSize: 0, count: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from("documents").select("size");

      if (!error && data) {
        const totalSize = data.reduce((acc, doc) => acc + (doc.size || 0), 0);
        setStorageStats({ totalSize, count: data.length });
      }
    };

    fetchStats();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type === "application/pdf" || file.name.endsWith(".docx")
    );
    
    if (validFiles.length !== droppedFiles.length) {
      toast({
        title: "Invalid files detected",
        description: "Only PDF and DOCX files are allowed",
        variant: "destructive"
      });
    }
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({ title: "No files selected", variant: "destructive" });
      return;
    }
  
    toast({ title: "Uploading...", description: `Uploading ${files.length} file(s)...` });
  
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
  
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/upload", {
        method: "POST",
        body: formData
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        toast({ title: "Upload failed", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: `Uploaded ${result.filename}` });
      }
    }
  
    setFiles([]);
  };
  

  const handleUrlScrape = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }) // the file URL you want to scrape
    });
  
    const result = await res.json();
  
    if (!res.ok) {
      toast({ title: "Error", description: result.error });
    } else {
      toast({ title: "Success", description: `File ${result.filename} uploaded.` });
    }
  };
  
  
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Documents</h1>
        <p className="text-gray-600">Upload PDF and Word documents to the cloud storage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UploadIcon className="mr-2 h-5 w-5" />
              File Upload
            </CardTitle>
            <CardDescription>
              Drag and drop files or click to browse. Supports PDF and DOCX files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-blue-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Supports PDF and DOCX files up to 10MB each
        </p>
        
        {/* Hidden file input triggered by button */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          variant="outline"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Browse Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Selected Files:</h3>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleUpload} className="w-full">
            Upload {files.length} file(s)
          </Button>
        </div>
      )}
    </CardContent>
        </Card>

        {/* URL Scraping */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="mr-2 h-5 w-5" />
              Web Scraping
            </CardTitle>
            <CardDescription>
              Extract documents from web URLs automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url-input">Website URL</Label>
              <Input
                id="url-input"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleUrlScrape} className="w-full" variant="outline">
              Scrape Documents from URL
            </Button>
            
            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-medium">Supported formats:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>PDF documents</li>
                <li>Word documents (.docx)</li>
                <li>Direct download links</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Status */}
            <Card className="mt-8">
        <CardHeader>
          <CardTitle>Storage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {storageStats.totalSize < 1024
                  ? `${storageStats.totalSize} B`
                  : storageStats.totalSize < 1024 * 1024
                  ? `${(storageStats.totalSize / 1024).toFixed(2)} KB`
                  : storageStats.totalSize < 1024 * 1024 * 1024
                  ? `${(storageStats.totalSize / (1024 * 1024)).toFixed(2)} MB`
                  : `${(storageStats.totalSize / (1024 * 1024 * 1024)).toFixed(2)} GB`}
              </p>
              <p className="text-sm text-gray-600">Storage Used</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {storageStats.count}
              </p>
              <p className="text-sm text-gray-600">Documents Stored</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">2 GB</p>
              <p className="text-sm text-gray-600">Storage Limit</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default Upload;

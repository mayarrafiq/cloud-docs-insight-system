
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, FileText, Clock } from "lucide-react";


const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
  
    setIsSearching(true);
    setHasSearched(true);
    const startTime = Date.now();
  
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
  
      const result = await response.json();
      const endTime = Date.now();
  
      setSearchTime(endTime - startTime);
  
      if (!response.ok) {
        console.error(result.error || "Unknown search error");
        setSearchResults([]);
      } else {
        setSearchResults(result.results); // expect an array of { title, filename, highlightedPreview, matchedKeywords, relevanceScore, etc. }
      }
    } catch (err) {
      console.error("Search error", err);
      setSearchResults([]);
    }
  
    setIsSearching(false);
  };
  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Search</h1>
        <p className="text-gray-600">Search through document content with keyword highlighting</p>
      </div>

      {/* Search Interface */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <SearchIcon className="mr-2 h-5 w-5" />
            Full-Text Search
          </CardTitle>
          <CardDescription>
            Search through all uploaded documents using keywords or phrases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter keywords or phrases to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchQuery.trim()}
              className="min-w-[100px]"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
          
          {hasSearched && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              Search completed in {searchTime}ms
              {searchResults.length > 0 && (
                <span className="ml-2">• Found {searchResults.length} result(s)</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-6">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-6 w-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{result.title}</CardTitle>
                        <CardDescription>{result.filename}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Highlighted Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Document Preview</h4>
                      <div 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: result.highlightedPreview }}
                      />
                    </div>
                    
                    {/* Matched Keywords */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Matched Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedKeywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-500">
                        Uploaded: {new Date(result.uploadDate).toLocaleDateString()}
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          View Full Document
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <SearchIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try different keywords or check your spelling.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Search Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Search Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Basic Search</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Use quotation marks for exact phrases</li>
                <li>• Search is case-insensitive</li>
                <li>• Multiple keywords are treated as AND</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Advanced Features</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Results ranked by relevance</li>
                <li>• Keyword highlighting in previews</li>
                <li>• Content-based matching</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;

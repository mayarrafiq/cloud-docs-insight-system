
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FolderTree, 
  FileText, 
  BookOpen, 
  Building, 
  Heart, 
  Play,
  Settings,
  BarChart
} from "lucide-react";

// Classification tree structure
const classificationTree = {
  "Education": {
    icon: BookOpen,
    children: {
      "Research Papers": ["Machine Learning", "Data Science", "Computer Vision", "NLP"],
      "Assignments": ["Programming", "Mathematics", "Physics", "Chemistry"],
      "Textbooks": ["Computer Science", "Engineering", "Mathematics"]
    }
  },
  "Business": {
    icon: Building,
    children: {
      "Reports": ["Financial", "Market Analysis", "Performance", "Quarterly"],
      "Contracts": ["Employment", "Service", "Partnership", "NDA"],
      "Proposals": ["Project", "Business", "Grant", "Research"]
    }
  },
  "Health": {
    icon: Heart,
    children: {
      "Medical Records": ["Patient Files", "Lab Results", "Diagnoses"],
      "Prescriptions": ["Medications", "Treatment Plans", "Dosages"],
      "Research": ["Clinical Trials", "Medical Studies", "Health Reports"]
    }
  }
};

const Classify = () => {
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationProgress, setClassificationProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const startClassification = () => {
    setIsClassifying(true);
    setClassificationProgress(0);
  
    const interval = setInterval(() => {
      setClassificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          fetchResults(); // ← fetch from backend
          setIsClassifying(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const fetchResults = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/classify", {
        method: "POST"
      });
      const data = await res.json();
      if (res.ok) setResults(data.results);
      else console.error(data.error);
    } catch (err) {
      console.error("Classification failed:", err);
    }
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = classificationTree[category as keyof typeof classificationTree];
    if (categoryData) {
      const IconComponent = categoryData.icon;
      return <IconComponent className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Classification</h1>
        <p className="text-gray-600">Automatically classify documents using machine learning algorithms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Classification Tree */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderTree className="mr-2 h-5 w-5" />
                Classification Tree
              </CardTitle>
              <CardDescription>
                Predefined categories for document organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(classificationTree).map(([category, data]) => {
                  const IconComponent = data.icon;
                  return (
                    <div key={category} className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <IconComponent className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">{category}</span>
                      </button>
                      
                      {selectedCategory === category && (
                        <div className="ml-7 space-y-2">
                          {Object.entries(data.children).map(([subcategory, tags]) => (
                            <div key={subcategory} className="space-y-1">
                              <p className="text-sm font-medium text-gray-700">{subcategory}</p>
                              <div className="flex flex-wrap gap-1">
                                {tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Classification Controls */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Classification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Algorithm</h4>
                <Badge variant="secondary">Naive Bayes Classifier</Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• Content-based classification</p>
                  <p>• Keyword extraction</p>
                  <p>• Document structure analysis</p>
                  <p>• Machine learning predictions</p>
                </div>
              </div>
              
              <Button 
                onClick={startClassification} 
                disabled={isClassifying}
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                {isClassifying ? "Classifying..." : "Start Classification"}
              </Button>
              
              {isClassifying && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{classificationProgress}%</span>
                  </div>
                  <Progress value={classificationProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Classification Results */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Classification Results
              </CardTitle>
              <CardDescription>
                Document classification predictions and confidence scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <FileText className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <p className="text-sm text-gray-500">{doc.filename}</p>
                        </div>
                      </div>
                      <Badge variant={doc.status === "classified" ? "default" : "secondary"}>
                        {doc.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Predicted Category</h4>
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(doc.predictedCategory)}
                          <span className="font-medium">{doc.predictedCategory}</span>
                          <span className="text-gray-500">→</span>
                          <span className="text-sm">{doc.predictedSubcategory}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Confidence</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${doc.confidence}%` }}
                            />
                          </div>
                          <span className={`font-medium ${getConfidenceColor(doc.confidence)}`}>
                            {doc.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {doc.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Classification Statistics */}
          <Card className="mt-6">
  <CardHeader>
    <CardTitle>Classification Statistics</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Classified */}
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <p className="text-2xl font-bold text-blue-600">
          {results.length}
        </p>
        <p className="text-sm text-gray-600">Total Classified</p>
      </div>

      {/* Average Confidence */}
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-2xl font-bold text-green-600">
          {results.length > 0
            ? `${(
                results.reduce((sum, doc) => sum + doc.confidence, 0) /
                results.length
              ).toFixed(1)}%`
            : "—"}
        </p>
        <p className="text-sm text-gray-600">Avg. Confidence</p>
      </div>

      {/* Unique Categories */}
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <p className="text-2xl font-bold text-purple-600">
          {
            new Set(results.map((doc) => doc.predictedCategory)).size
          }
        </p>
        <p className="text-sm text-gray-600">Categories</p>
      </div>

      {/* Processing Time (simulated) */}
      <div className="text-center p-4 bg-orange-50 rounded-lg">
        <p className="text-2xl font-bold text-orange-600">
          {`${(results.length * 0.3).toFixed(1)}s`}
        </p>
        <p className="text-sm text-gray-600">Avg. Process Time</p>
      </div>
    </div>
  </CardContent>
</Card>

        </div>
      </div>
    </div>
  );
};

export default Classify;

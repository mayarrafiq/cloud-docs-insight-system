
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Cloud, FileText, Search, BarChart, Users, BookOpen } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Secure document storage powered by Supabase"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Upload, organize, and manage PDF and Word documents"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Full-text search with keyword highlighting"
    }/* ,
    {
      icon: BarChart,
      title: "Analytics",
      description: "Comprehensive statistics and classification insights"
    } */
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              CloudDocs <span className="text-blue-600">Analytics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A Cloud-Based Document Search, Sort & Classification System
            </p>
            <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              CloudDocs Analytics is a cloud-based application designed to store, search, sort, 
              and classify a large set of PDF and Word documents. It uses Supabase for cloud storage 
              and Node.js with Express for the backend. Users can upload documents, perform keyword 
              searches, and sort or classify content based on predefined logic.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link to="/upload">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
              <Link to="/documents">
                <Button variant="outline" size="lg">
                  View Documents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">Powerful document management tools</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow ">
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Development Team</CardTitle>
              <CardDescription>Islamic University of Gaza</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-64 p-4 bg-blue-50 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">ميار رفيق الفالوجي</h3>
                <p className="text-sm text-gray-600">220211605</p>
              </div>
              <div className="w-64 p-4 bg-blue-50 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">ندا أحمد الطويل</h3>
                <p className="text-sm text-gray-600">220211617</p>
              </div>
            </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <BookOpen className="mx-auto h-8 w-8 text-blue-600 mb-3" />
                <p className="text-gray-700 italic">
                  "This project is developed as a partial fulfillment for the course 
                  <strong> Cloud and Distributed Systems (SICT 4313)</strong> at the Islamic University of Gaza, 
                  under the supervision of <strong>Dr. Rebhi S. Baraka</strong>."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

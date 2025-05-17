
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  Filter, 
  Download, 
  Mail, 
  Calendar, 
  MapPin,
  Search
} from "lucide-react";

// Mock application data
const APPLICATIONS = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Frontend Developer Intern",
    location: "Remote",
    appliedDate: "2025-04-29",
    status: "Pending",
    experience: "2 years",
    education: "Computer Science, Stanford",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    email: "alex@example.com"
  },
  {
    id: 2,
    name: "Jamie Smith",
    position: "UX Design Intern",
    location: "New York, NY",
    appliedDate: "2025-04-28",
    status: "Reviewing",
    experience: "1 year",
    education: "Design, RISD",
    skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping"],
    email: "jamie@example.com"
  },
  {
    id: 3,
    name: "Taylor Wilson",
    position: "Full Stack Developer",
    location: "San Francisco, CA",
    appliedDate: "2025-04-26",
    status: "Scheduled",
    experience: "3 years",
    education: "Information Systems, Berkeley",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    email: "taylor@example.com"
  },
  {
    id: 4,
    name: "Morgan Lee",
    position: "Frontend Developer Intern",
    location: "Remote",
    appliedDate: "2025-04-24",
    status: "Rejected",
    experience: "1 year",
    education: "Computer Science, MIT",
    skills: ["Vue.js", "JavaScript", "CSS", "HTML"],
    email: "morgan@example.com"
  }
];

const RecruiterApplications = () => {
  const [applications, setApplications] = useState(APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredApplications = applications.filter(app => {
    // First apply search filter
    const matchesSearch = !searchQuery || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Then apply tab filter
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && app.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'Reviewing':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'Scheduled':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="animate-fadeIn">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Applications</h1>
          <p className="text-gray-600">Manage and review candidate applications</p>
        </div>

        <div className="mb-6 animate-slideUp">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-job-blue focus:border-transparent"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center text-gray-700">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center text-gray-700">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card className="shadow-md animate-fadeIn">
          <CardHeader>
            <CardTitle>Applicants ({filteredApplications.length})</CardTitle>
            <CardDescription>Review and manage candidates for all positions</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredApplications.length > 0 ? (
              <div className="space-y-4">
                {filteredApplications.map(app => (
                  <div 
                    key={app.id}
                    className="border border-gray-100 rounded-lg p-4 transition-all duration-300 hover:border-job-blue/30 hover:bg-blue-50/30"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{app.name}</h3>
                        <p className="text-job-blue">{app.position}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {app.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Applied {formatDate(app.appliedDate)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs flex items-center ${getStatusClass(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="my-3">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {app.skills.map(skill => (
                          <span 
                            key={`${app.id}-${skill}`}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2 justify-between">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Experience:</span> {app.experience} | 
                        <span className="font-medium ml-1">Education:</span> {app.education}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-job-blue hover:bg-job-blue-light transition-all duration-300"
                        >
                          View Resume
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-job-blue border-job-blue hover:bg-job-blue/10"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No applications match your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterApplications;

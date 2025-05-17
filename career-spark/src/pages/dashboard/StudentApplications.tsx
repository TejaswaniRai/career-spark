
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, X, Search } from 'lucide-react';

// Mock data
const ALL_APPLICATIONS = [
  {
    id: 1,
    jobTitle: "Frontend Developer Intern",
    company: "Tech Innovations Inc.",
    location: "New York, NY",
    appliedDate: "2025-04-29",
    status: "Applied",
    logo: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    jobTitle: "UX Design Intern",
    company: "Creative Solutions",
    location: "San Francisco, CA",
    appliedDate: "2025-04-27",
    status: "Reviewing",
    logo: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    jobTitle: "Web Developer",
    company: "WebTech Solutions",
    location: "Remote",
    appliedDate: "2025-04-25",
    status: "Interview",
    logo: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    jobTitle: "Marketing Intern",
    company: "Brand Builders",
    location: "Chicago, IL",
    appliedDate: "2025-04-20",
    status: "Rejected",
    logo: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    jobTitle: "Product Designer",
    company: "DesignHub",
    location: "Seattle, WA",
    appliedDate: "2025-04-18",
    status: "Offer",
    logo: "https://randomuser.me/api/portraits/men/5.jpg"
  }
];

const StudentApplications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter applications based on tab and search term
  const filteredApplications = ALL_APPLICATIONS.filter(app => {
    // First filter by status tab
    if (activeTab !== 'all' && app.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        app.jobTitle.toLowerCase().includes(term) ||
        app.company.toLowerCase().includes(term) ||
        app.location.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Reviewing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Interview':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Rejected':
        return <X className="h-4 w-4 text-red-500" />;
      case 'Offer':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'Interview':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Offer':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="student">
      <div>
        <h1 className="text-2xl font-bold mb-1">My Applications</h1>
        <p className="text-gray-600 mb-6">Track and manage your job applications</p>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
                <TabsTrigger value="interview">Interview</TabsTrigger>
                <TabsTrigger value="offer">Offers</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Search applications..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <div 
                  key={app.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 mr-4">
                      {app.logo ? (
                        <img 
                          src={app.logo} 
                          alt={app.company} 
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {app.company[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{app.jobTitle}</h3>
                      <p className="text-gray-600 text-sm">{app.company}</p>
                      <p className="text-gray-500 text-sm">{app.location} • Applied {formatDate(app.appliedDate)}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-xs flex items-center ${getStatusClass(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1">{app.status}</span>
                      </span>
                      <div className="mt-2 space-x-2 hidden md:block">
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 md:hidden flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Withdraw
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No applications found</p>
                {searchTerm && (
                  <Button
                    variant="link"
                    onClick={() => setSearchTerm('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;

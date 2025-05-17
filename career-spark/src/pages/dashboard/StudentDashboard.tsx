
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, ArrowUpRight, CheckCircle, Clock, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data
const RECENT_APPLICATIONS = [
  {
    id: 1,
    jobTitle: "Frontend Developer Intern",
    company: "Tech Innovations Inc.",
    location: "New York, NY",
    appliedDate: "2025-04-29",
    status: "Applied"
  },
  {
    id: 2,
    jobTitle: "UX Design Intern",
    company: "Creative Solutions",
    location: "San Francisco, CA",
    appliedDate: "2025-04-27",
    status: "Reviewing"
  },
  {
    id: 3,
    jobTitle: "Web Developer",
    company: "WebTech Solutions",
    location: "Remote",
    appliedDate: "2025-04-25",
    status: "Interview"
  }
];

const RECOMMENDED_JOBS = [
  {
    id: 101,
    jobTitle: "React Developer Intern",
    company: "Digital Products Inc.",
    location: "Boston, MA",
    matchPercentage: 95
  },
  {
    id: 102,
    jobTitle: "Frontend Engineer",
    company: "CodeStack",
    location: "Remote",
    matchPercentage: 89
  },
  {
    id: 103,
    jobTitle: "UI Developer",
    company: "Interface Designs",
    location: "Austin, TX",
    matchPercentage: 82
  }
];

const StudentDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="student">
      <div>
        <h1 className="text-2xl font-bold mb-1">Student Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome back! Here's an overview of your job search</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{RECENT_APPLICATIONS.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Applied this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1</div>
                  <p className="text-xs text-gray-500 mt-1">Scheduled interviews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-gray-500 mt-1">Recruiters viewed your profile</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {RECENT_APPLICATIONS.length > 0 ? (
                    <div className="space-y-4">
                      {RECENT_APPLICATIONS.slice(0, 3).map(app => (
                        <div key={app.id} className="flex items-start">
                          <div className="bg-gray-100 p-2 rounded mr-4">
                            <Briefcase className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{app.jobTitle}</h3>
                            <p className="text-sm text-gray-600">{app.company} • {app.location}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                Applied on {formatDate(app.appliedDate)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusClass(app.status)}`}>
                                {getStatusIcon(app.status)}
                                <span className="ml-1">{app.status}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">You haven't applied to any jobs yet.</p>
                  )}
                  
                  {RECENT_APPLICATIONS.length > 0 && (
                    <Button 
                      variant="link" 
                      className="px-0 mt-2" 
                      onClick={() => setActiveTab('applications')}
                    >
                      View all applications
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended For You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {RECOMMENDED_JOBS.slice(0, 3).map(job => (
                      <div key={job.id} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{job.jobTitle}</h3>
                            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {job.matchPercentage}% Match
                          </span>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button 
                            size="sm" 
                            className="bg-job-blue hover:bg-job-blue-light"
                            onClick={() => {
                              toast({
                                title: "Job Page Opening",
                                description: `Viewing details for ${job.jobTitle}`,
                              });
                            }}
                          >
                            View Job <ArrowUpRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="px-0 mt-2"
                    onClick={() => setActiveTab('recommendations')}
                  >
                    View all recommendations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {RECENT_APPLICATIONS.length > 0 ? (
                  <div className="space-y-4">
                    {RECENT_APPLICATIONS.map(app => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{app.jobTitle}</h3>
                            <p className="text-gray-600">{app.company} • {app.location}</p>
                            <p className="text-gray-500 text-sm mt-1">
                              Applied on {formatDate(app.appliedDate)}
                            </p>
                          </div>
                          <div className="mt-3 md:mt-0">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                          <Button variant="ghost" size="sm">
                            View Application
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Recruiter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't applied to any jobs yet. Start your job search now!
                    </p>
                    <Button 
                      className="bg-job-blue hover:bg-job-blue-light"
                      onClick={() => {
                        toast({
                          title: "Redirecting to Jobs",
                          description: "Showing you available opportunities",
                        });
                        window.location.href = '/jobs';
                      }}
                    >
                      Browse Jobs
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recommended Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RECOMMENDED_JOBS.map(job => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{job.jobTitle}</h3>
                          <p className="text-gray-600">{job.company} • {job.location}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {job.matchPercentage}% Match
                        </span>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                        <Button 
                          className="bg-job-blue hover:bg-job-blue-light"
                          onClick={() => {
                            toast({
                              title: "Success",
                              description: `Applied to ${job.jobTitle}`,
                            });
                          }}
                        >
                          Quick Apply
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;

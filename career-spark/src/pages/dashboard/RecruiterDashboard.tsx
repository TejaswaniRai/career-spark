
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const RECENT_JOB_POSTS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    applicants: 12,
    posted: "2025-04-28",
    status: "Active"
  },
  {
    id: 2,
    title: "UX Design Intern",
    applicants: 8,
    posted: "2025-04-26",
    status: "Active"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    applicants: 5,
    posted: "2025-04-20",
    status: "Closed"
  }
];

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const [recentJobs] = useState(RECENT_JOB_POSTS);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and applicants</p>
          </div>
          <Button 
            onClick={() => {
              toast({
                title: "Creating new job post",
                description: "Redirecting to job creation form",
              });
            }} 
            className="bg-job-blue hover:bg-job-blue-light transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-job-blue shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-job-blue">{recentJobs.filter(job => job.status === "Active").length}</div>
              <p className="text-xs text-gray-500 mt-1">Jobs currently accepting applications</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-job-teal shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-job-teal">
                {recentJobs.reduce((total, job) => total + job.applicants, 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Applicants across all positions</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-gray-400 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Profile Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-700">24</div>
              <p className="text-xs text-gray-500 mt-1">Views in the past 7 days</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8 animate-slideUp">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Job Postings</CardTitle>
                <Button variant="link" className="text-job-blue">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Manage your current job listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="border border-gray-100 rounded-lg p-4 hover:border-job-blue/30 hover:bg-blue-50/30 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg mr-3 ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-500">
                            Posted on {formatDate(job.posted)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center text-sm font-medium text-gray-700">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applicants} Applicants
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs ${
                          job.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-job-blue border-job-blue hover:bg-job-blue/10"
                      >
                        View Applicants
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-gray-700 border-gray-300 hover:bg-gray-50"
                      >
                        Edit Listing
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;

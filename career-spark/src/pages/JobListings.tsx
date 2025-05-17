
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Search, Filter, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock job data
const ALL_JOBS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Innovations Inc.",
    location: "New York, NY",
    type: "Internship",
    duration: "3 months",
    stipend: "$2000/month",
    domain: "Web Development",
    postedDate: "2025-04-25",
    description: "Join our team to work on exciting web projects using React, TypeScript and modern frontend technologies."
  },
  {
    id: 2,
    title: "UX Design Intern",
    company: "Creative Solutions",
    location: "San Francisco, CA",
    type: "Internship",
    duration: "6 months",
    stipend: "$2500/month",
    domain: "Design",
    postedDate: "2025-04-28",
    description: "Help design user-friendly interfaces for our products and collaborate with our product team."
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70,000/year",
    domain: "Data Science",
    postedDate: "2025-04-20",
    description: "Analyze large datasets and provide insights to help drive business decisions."
  },
  {
    id: 4,
    title: "Software Engineer Intern",
    company: "CodeCorp",
    location: "Boston, MA",
    type: "Internship",
    duration: "4 months",
    stipend: "$2200/month",
    domain: "Software Development",
    postedDate: "2025-04-22",
    description: "Develop and maintain backend services for our cloud-based applications."
  },
  {
    id: 5,
    title: "Marketing Coordinator",
    company: "Brand Builders",
    location: "Remote",
    type: "Full-time",
    salary: "$55,000/year",
    domain: "Marketing",
    postedDate: "2025-04-15",
    description: "Coordinate marketing campaigns and help grow our brand presence across multiple channels."
  },
  {
    id: 6,
    title: "Product Manager",
    company: "Innovate Inc.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$85,000/year",
    domain: "Product Management",
    postedDate: "2025-04-18",
    description: "Lead product development initiatives and work with engineering and design teams."
  },
  {
    id: 7,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Seattle, WA",
    type: "Contract",
    duration: "12 months",
    salary: "$65/hour",
    domain: "Design",
    postedDate: "2025-04-24",
    description: "Create visually appealing and user-friendly interfaces for web and mobile applications."
  },
  {
    id: 8,
    title: "Backend Developer Intern",
    company: "ServerStack",
    location: "Remote",
    type: "Internship",
    duration: "3 months",
    stipend: "$1800/month",
    domain: "Software Development",
    postedDate: "2025-04-26",
    description: "Build robust backend systems using Node.js, Express, and MongoDB."
  }
];

// Types
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  duration?: string;
  stipend?: string;
  salary?: string;
  domain: string;
  postedDate: string;
  description: string;
}

interface Filters {
  location: string;
  type: string;
  domain: string;
  duration: string;
  stipend: string;
}

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>(ALL_JOBS);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  // Filter states
  const [filters, setFilters] = useState<Filters>({
    location: '',
    type: '',
    domain: '',
    duration: '',
    stipend: ''
  });

  // Apply filters
  useEffect(() => {
    let filteredJobs = [...ALL_JOBS];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.includes(filters.location) ||
        (filters.location === 'Remote' && job.location.toLowerCase().includes('remote'))
      );
    }
    
    // Apply job type filter
    if (filters.type) {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }
    
    // Apply domain filter
    if (filters.domain) {
      filteredJobs = filteredJobs.filter(job => job.domain === filters.domain);
    }
    
    // Apply duration filter (for internships)
    if (filters.duration) {
      if (filters.duration === '0-3') {
        filteredJobs = filteredJobs.filter(job => 
          job.duration && parseInt(job.duration) <= 3
        );
      } else if (filters.duration === '3-6') {
        filteredJobs = filteredJobs.filter(job => 
          job.duration && parseInt(job.duration) > 3 && parseInt(job.duration) <= 6
        );
      } else if (filters.duration === '6+') {
        filteredJobs = filteredJobs.filter(job => 
          job.duration && parseInt(job.duration) > 6
        );
      }
    }
    
    // Apply stipend filter
    if (filters.stipend) {
      if (filters.stipend === '0-1500') {
        filteredJobs = filteredJobs.filter(job => 
          job.stipend && parseInt(job.stipend.replace(/[^0-9]/g, '')) <= 1500
        );
      } else if (filters.stipend === '1500-3000') {
        filteredJobs = filteredJobs.filter(job => 
          job.stipend && parseInt(job.stipend.replace(/[^0-9]/g, '')) > 1500 && 
          parseInt(job.stipend.replace(/[^0-9]/g, '')) <= 3000
        );
      } else if (filters.stipend === '3000+') {
        filteredJobs = filteredJobs.filter(job => 
          job.stipend && parseInt(job.stipend.replace(/[^0-9]/g, '')) > 3000
        );
      }
    }
    
    setJobs(filteredJobs);
  }, [searchTerm, filters]);

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      domain: '',
      duration: '',
      stipend: ''
    });
    setSearchTerm('');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    });
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Opportunity</h1>
          <p className="text-gray-600 mb-8">Browse through available jobs and internships</p>
          
          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    placeholder="Search jobs, companies, or keywords" 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="md:w-auto w-full"
              >
                <Filter className="mr-2 h-4 w-4" /> 
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="bg-white shadow-sm rounded-lg p-4 mb-4 animate-slideUp">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Location</label>
                    <Select 
                      value={filters.location}
                      onValueChange={(value) => handleFilterChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Boston">Boston</SelectItem>
                        <SelectItem value="Seattle">Seattle</SelectItem>
                        <SelectItem value="Austin">Austin</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Job Type</label>
                    <Select 
                      value={filters.type}
                      onValueChange={(value) => handleFilterChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Domain</label>
                    <Select 
                      value={filters.domain}
                      onValueChange={(value) => handleFilterChange('domain', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Domains</SelectItem>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Software Development">Software Development</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Product Management">Product Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Duration (months)</label>
                    <Select 
                      value={filters.duration}
                      onValueChange={(value) => handleFilterChange('duration', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Duration</SelectItem>
                        <SelectItem value="0-3">0-3 months</SelectItem>
                        <SelectItem value="3-6">3-6 months</SelectItem>
                        <SelectItem value="6+">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Stipend/Salary</label>
                    <Select 
                      value={filters.stipend}
                      onValueChange={(value) => handleFilterChange('stipend', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Amount</SelectItem>
                        <SelectItem value="0-1500">$0-$1,500/month</SelectItem>
                        <SelectItem value="1500-3000">$1,500-$3,000/month</SelectItem>
                        <SelectItem value="3000+">$3,000+/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Count */}
          <p className="mb-4 text-gray-600">
            Showing {jobs.length} {jobs.length === 1 ? 'result' : 'results'}
          </p>
          
          {/* Job Listings */}
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <Link key={job.id} to={`/jobs/${job.id}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-full card-hover">
                    <h3 className="text-xl font-semibold mb-2 text-job-blue">
                      {job.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{job.company}</p>
                    
                    <div className="mb-3 flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="mb-3 flex items-center text-gray-500">
                      <Briefcase size={16} className="mr-1" />
                      <span>{job.type}</span>
                      {job.duration && <span className="ml-2">• {job.duration}</span>}
                    </div>
                    
                    <div className="mb-3 flex items-center text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {job.domain}
                      </span>
                    </div>
                    
                    <div className="text-gray-700 font-medium">
                      {job.stipend || job.salary}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-medium mb-4">No jobs found</p>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <Button onClick={clearFilters} className="bg-job-blue hover:bg-job-blue-light">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobListings;

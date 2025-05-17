
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Bookmark,
  Share2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock job data
const JOBS = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Tech Innovations Inc.",
    companyLogo: "https://randomuser.me/api/portraits/men/1.jpg",
    location: "New York, NY",
    type: "Internship",
    duration: "3 months",
    stipend: "$2000/month",
    domain: "Web Development",
    postedDate: "2025-04-25",
    applicationDeadline: "2025-05-25",
    description: "Join our team to work on exciting web projects using React, TypeScript and modern frontend technologies.",
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with the design team to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Troubleshoot and debug issues",
      "Stay updated with emerging technologies"
    ],
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Knowledge of HTML, CSS, and JavaScript",
      "Familiarity with React or similar frontend frameworks",
      "Basic understanding of version control systems (Git)",
      "Strong problem-solving skills and attention to detail"
    ],
    benefits: [
      "Flexible working hours",
      "Remote work options",
      "Mentorship from senior developers",
      "Opportunity for full-time employment after internship",
      "Team building activities and events"
    ]
  },
  {
    id: "2",
    title: "UX Design Intern",
    company: "Creative Solutions",
    companyLogo: "https://randomuser.me/api/portraits/women/2.jpg",
    location: "San Francisco, CA",
    type: "Internship",
    duration: "6 months",
    stipend: "$2500/month",
    domain: "Design",
    postedDate: "2025-04-28",
    applicationDeadline: "2025-05-30",
    description: "Help design user-friendly interfaces for our products and collaborate with our product team.",
    responsibilities: [
      "Create wireframes, mockups, and prototypes",
      "Conduct user research and usability testing",
      "Collaborate with product managers and developers",
      "Create user personas and journey maps",
      "Participate in design reviews and iterations"
    ],
    requirements: [
      "Currently pursuing a degree in Design, HCI, or related field",
      "Portfolio showcasing UI/UX projects",
      "Proficiency in design tools like Figma, Sketch, or Adobe XD",
      "Understanding of user-centered design principles",
      "Good communication and teamwork skills"
    ],
    benefits: [
      "Collaborative and creative work environment",
      "Exposure to real-world design challenges",
      "Portfolio development opportunities",
      "Networking with industry professionals",
      "Competitive stipend"
    ]
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "Analytics Pro",
    companyLogo: "https://randomuser.me/api/portraits/men/3.jpg",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70,000/year",
    domain: "Data Science",
    postedDate: "2025-04-20",
    applicationDeadline: "2025-06-15",
    description: "Analyze large datasets and provide insights to help drive business decisions.",
    responsibilities: [
      "Collect, process, and analyze complex data sets",
      "Create visualizations and reports",
      "Develop and implement data analysis models",
      "Identify trends and patterns",
      "Present findings to stakeholders"
    ],
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, Computer Science or related field",
      "2+ years of experience in data analysis",
      "Proficiency in SQL and data visualization tools",
      "Experience with Python or R",
      "Strong analytical and problem-solving skills"
    ],
    benefits: [
      "Comprehensive health insurance",
      "401(k) matching",
      "Professional development budget",
      "Paid time off",
      "Remote work options"
    ]
  }
];

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find job by ID
  const job = JOBS.find(job => job.id === id);
  
  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')} className="bg-job-blue hover:bg-job-blue-light">
            Back to Job Listings
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleApply = () => {
    toast({
      title: "Application Started",
      description: "You've started the application process for this job.",
    });
    
    navigate('/student/applications');
  };
  
  const handleSave = () => {
    toast({
      title: "Job Saved",
      description: "This job has been saved to your favorites.",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Job link copied to clipboard.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {job.companyLogo && (
                  <img 
                    src={job.companyLogo} 
                    alt={job.company} 
                    className="w-16 h-16 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
                  <p className="text-lg text-gray-700 mb-1">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase size={16} className="mr-1" />
                      {job.type}
                    </div>
                    {job.duration && (
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {job.duration}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      Posted {formatDate(job.postedDate)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  className="bg-job-blue hover:bg-job-blue-light flex-1 sm:flex-none sm:min-w-[150px]"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-job-blue text-job-blue hover:bg-job-blue/10"
                  onClick={handleSave}
                >
                  <Bookmark size={16} className="mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={handleShare}
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Job Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Salary/Stipend</p>
                    <p className="font-medium">{job.stipend || job.salary}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Application Deadline</p>
                    <p className="font-medium">{formatDate(job.applicationDeadline)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 mb-4">{job.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Key Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Apply CTA */}
            <div className="bg-job-blue text-white rounded-lg shadow-sm p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Ready to Apply?</h2>
              <p className="mb-4">Submit your application now and take the first step toward your next opportunity!</p>
              <Button 
                size="lg" 
                className="bg-white text-job-blue hover:bg-gray-100"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetails;

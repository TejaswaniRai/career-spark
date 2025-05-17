import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Briefcase, MapPin, User } from 'lucide-react';

const Home = () => {
  // Featured job listings
  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Innovations Inc.",
      location: "New York, NY",
      type: "Internship",
      duration: "3 months",
      stipend: "$2000/month",
    },
    {
      id: 2,
      title: "UX Design Intern",
      company: "Creative Solutions",
      location: "San Francisco, CA",
      type: "Internship",
      duration: "6 months",
      stipend: "$2500/month",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$70,000/year",
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Computer Science Student",
      text: "CareerSpark helped me land my dream internship at a top tech company. The platform was easy to use and had a great selection of opportunities.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "HR Manager",
      text: "As a recruiter, I've found exceptional talent through CareerSpark. The platform streamlines our hiring process and connects us with qualified candidates.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-job-blue to-job-teal text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Launch Your Career With The Perfect Opportunity
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slideUp">
              Find internships and jobs tailored to your skills and aspirations.
              Get started on your professional journey today.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" className="bg-white text-job-blue hover:bg-gray-100 min-w-[160px]">
                  Find Jobs
                </Button>
              </Link>
              <Link to="/auth?role=recruiter">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 min-w-[160px]">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Job title, keywords, or company" 
                    className="form-input pl-10"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="City, state, or remote" 
                    className="form-input pl-10"
                  />
                </div>
              </div>
              <Button className="bg-job-blue hover:bg-job-blue-light min-w-[120px]">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Opportunity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CareerSpark helps students and professionals find the right job opportunities
              while enabling employers to discover top talent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-job-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-job-blue" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Opportunities</h3>
              <p className="text-gray-600">
                Browse thousands of internships and jobs across various industries and locations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-job-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-job-teal" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply With Ease</h3>
              <p className="text-gray-600">
                Create your profile once and apply to multiple positions with just a few clicks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-job-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-job-blue" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect With Employers</h3>
              <p className="text-gray-600">
                Get noticed by top companies and receive direct communication about opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
            <Link to="/jobs" className="text-job-blue font-medium hover:underline flex items-center">
              View all jobs <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 card-hover">
                  <h3 className="text-xl font-semibold mb-2 text-job-blue">
                    {job.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{job.company}</p>
                  <div className="mb-4 flex items-center text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                      {job.duration || "Full-time"}
                    </span>
                  </div>
                  <div className="text-gray-700 font-medium">
                    {job.stipend || job.salary}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What People Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-job-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students and professionals who have found their perfect opportunity through CareerSpark.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <Link to="/auth?tab=register">
              <Button size="lg" className="bg-white text-job-blue hover:bg-gray-100 min-w-[180px]">
                Create an Account
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 min-w-[180px]">
                Browse Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

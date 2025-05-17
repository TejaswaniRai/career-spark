
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock, DollarSign, Send } from 'lucide-react';

const RecruiterPostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    duration: '',
    salary: '',
    description: '',
    requirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Job Posted Successfully!",
        description: "Your job listing is now live and visible to candidates",
      });
      navigate('/dashboard/recruiter');
    }, 1500);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="animate-fadeIn">
        <h1 className={`text-3xl font-bold mb-2 ${formSubmitted ? 'tracking-out-contract' : 'tracking-in-expand'}`}>
          Post New Job Listing
        </h1>
        <p className="text-gray-600 mb-8 focus-in-expand">Create a compelling job post to attract the right candidates</p>
        
        <Card className="shadow-md animate-slideUp">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Fill in the details for your new job listing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer Intern"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Tech Innovations Inc."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, NY or Remote"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 3 months, 6 months, 1 year"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary/Stipend</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="e.g. $15-20/hr or $1000/month"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the job role, responsibilities, and day-to-day tasks..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements & Qualifications</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List the required skills, education, experience, and qualifications..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/dashboard/recruiter')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-job-blue hover:bg-job-blue-light button-pop"
                  disabled={formSubmitted}
                >
                  {formSubmitted ? (
                    <span className="flex items-center">
                      <span className="animate-pulse mr-2">Publishing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Post Job
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterPostJob;

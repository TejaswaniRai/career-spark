
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const StudentProfile = () => {
  const { toast } = useToast();
  
  // Personal Info state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY'
  });
  
  // Education state
  const [education, setEducation] = useState({
    university: 'New York University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2022-09',
    endDate: '2026-05',
    gpa: '3.8'
  });
  
  // Skills state
  const [skills, setSkills] = useState(['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS']);
  const [newSkill, setNewSkill] = useState('');
  
  // Resume state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills(prev => [...prev, newSkill]);
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <DashboardLayout role="student">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and resume</p>
          </div>
          <Button 
            onClick={handleSaveProfile}
            className="bg-job-blue hover:bg-job-blue-light"
          >
            Save Changes
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    placeholder="City, State" 
                    value={personalInfo.location}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Write a short bio..." 
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your educational background</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="university">University/College</Label>
                  <Input 
                    id="university" 
                    name="university" 
                    value={education.university}
                    onChange={handleEducationChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Select defaultValue={education.degree}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Associate">Associate's</SelectItem>
                      <SelectItem value="Bachelor">Bachelor's</SelectItem>
                      <SelectItem value="Master">Master's</SelectItem>
                      <SelectItem value="PhD">Ph.D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input 
                    id="field" 
                    name="field" 
                    value={education.field}
                    onChange={handleEducationChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    name="startDate" 
                    type="month" 
                    value={education.startDate}
                    onChange={handleEducationChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Expected)</Label>
                  <Input 
                    id="endDate" 
                    name="endDate" 
                    type="month" 
                    value={education.endDate}
                    onChange={handleEducationChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input 
                    id="gpa" 
                    name="gpa" 
                    value={education.gpa}
                    onChange={handleEducationChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add skills that are relevant to your career</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Add a skill..." 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-job-blue hover:bg-job-blue-light"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{skill}</span>
                      <button 
                        type="button" 
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Resume / CV</CardTitle>
              <CardDescription>Upload your resume (PDF format recommended)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {resumeFile ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{resumeFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setResumeFile(null)}
                      >
                        Replace
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-2">
                        Drag and drop your resume here, or click to browse
                      </p>
                      <Input
                        id="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('resume')?.click()}
                      >
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">
                    Accepted formats: PDF, Word (.docx, .doc)
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 5MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveProfile}
              className="bg-job-blue hover:bg-job-blue-light"
            >
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;

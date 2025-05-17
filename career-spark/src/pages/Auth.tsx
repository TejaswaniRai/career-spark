
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const roleParam = queryParams.get('role');
  
  const [activeTab, setActiveTab] = useState<string>(tabParam === 'register' ? 'register' : 'login');
  const [role, setRole] = useState<'student' | 'recruiter'>(roleParam === 'recruiter' ? 'recruiter' : 'student');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Update URL when tab or role changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab === 'register') {
      params.set('tab', 'register');
    }
    if (role === 'recruiter') {
      params.set('role', 'recruiter');
    }
    
    const newSearch = params.toString();
    const newPath = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    
    navigate(newPath, { replace: true });
  }, [activeTab, role, navigate, location.pathname]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login logic
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Redirect based on role
    if (role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/employer/dashboard');
    }
    
    toast({
      title: "Success",
      description: "You have been logged in successfully",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (regPassword !== regConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful registration
    toast({
      title: "Account created",
      description: "Your account has been created successfully",
    });
    
    // Switch to login tab
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <div className="mb-6">
                <div className="flex rounded-lg overflow-hidden">
                  <button
                    className={`flex-1 py-2 text-center ${
                      role === 'student'
                        ? 'bg-job-blue text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => setRole('student')}
                  >
                    Student
                  </button>
                  <button
                    className={`flex-1 py-2 text-center ${
                      role === 'recruiter'
                        ? 'bg-job-blue text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => setRole('recruiter')}
                  >
                    Recruiter
                  </button>
                </div>
              </div>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-job-blue hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-job-blue hover:bg-job-blue-light">
                      Login
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your name" 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input 
                        id="reg-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input 
                        id="reg-password" 
                        type="password" 
                        placeholder="Create a password" 
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm your password" 
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-job-blue hover:bg-job-blue-light">
                      Register
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="p-6 bg-gray-50 border-t">
            <p className="text-sm text-center text-gray-600">
              {activeTab === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button 
                    className="text-job-blue hover:underline" 
                    onClick={() => setActiveTab('register')}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    className="text-job-blue hover:underline" 
                    onClick={() => setActiveTab('login')}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

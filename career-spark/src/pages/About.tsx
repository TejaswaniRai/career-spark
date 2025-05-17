
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About CareerSpark</h1>
            <p className="text-lg text-gray-600">
              Connecting talented individuals with innovative companies to create meaningful career opportunities.
            </p>
          </div>
          
          {/* Our Mission */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-lg text-gray-700 mb-4">
                At CareerSpark, we believe that finding the right career opportunity should be accessible, 
                straightforward, and tailored to individual needs and aspirations.
              </p>
              <p className="text-gray-700">
                Our platform is designed to bridge the gap between talented students and professionals 
                and the companies seeking their unique skills and perspectives. We're dedicated to 
                creating a transparent, inclusive, and user-friendly experience that helps both job 
                seekers and recruiters find their perfect match.
              </p>
            </div>
          </div>
          
          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="bg-job-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-job-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
                <p className="text-gray-700">
                  Our intelligent algorithm connects candidates with opportunities that match their skills,
                  experience, and career goals.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="bg-job-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-job-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Tailored Experience</h3>
                <p className="text-gray-700">
                  Personalized dashboards for both job seekers and recruiters, making the hiring process
                  efficient and effective.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="bg-job-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-job-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Community & Support</h3>
                <p className="text-gray-700">
                  Access to resources, guidance, and a supportive community to help navigate your career journey.
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Team */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Team</h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-700 mb-6">
                CareerSpark is powered by a diverse team of professionals passionate about connecting talent
                with opportunity. Our team combines expertise in technology, recruitment, career development,
                and user experience to create a platform that truly serves the needs of our community.
              </p>
              
              <div className="flex justify-center">
                <Link to="/jobs">
                  <Button className="bg-job-blue hover:bg-job-blue-light">
                    Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Contact CTA */}
          <div className="bg-job-blue text-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              We're here to help! Reach out to our team for any questions about the platform
              or to learn more about how CareerSpark can support your career or hiring needs.
            </p>
            <Button className="bg-white text-job-blue hover:bg-gray-100">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

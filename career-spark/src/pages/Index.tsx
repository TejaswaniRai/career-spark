
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';

// This is a simple wrapper component to redirect from the index route to the home component
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This effect is just here to ensure proper route handling
    // No actual redirect needed since we're rendering Home directly
  }, [navigate]);

  return <Home />;
};

export default Index;

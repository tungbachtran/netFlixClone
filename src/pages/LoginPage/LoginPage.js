import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import './LoginPage.css';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.email) {
      setFormData(prev => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login({ email: formData.email, name: 'User' });
      navigate('/home');
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__background">
        <img src="/images/HeroImage.png" alt="Background" />
        <div className="login-page__gradient" />
      </div>
      
      <div className="login-page__header">
        <Link to="/" className="login-page__logo">
          <img src="/images/netFlixLogo.png" alt="Netflix" />
        </Link>
      </div>

      <div className="login-page__content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Sign in</h1>
          
          <div className="login-form__fields">
            <Input
              name="email"
              type="text"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleInputChange}
             
            />
            
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              
            />
          </div>

          <Button 
            type="submit" 
            size="large" 
            className="login-form__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Enter Home page'}
          </Button>

          <div className="login-form__options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
              Remember me
            </label>
            <a href="#" className="login-form__help">Need help?</a>
          </div>

          <div className="login-form__signup">
            <p>
              New to Netflix? 
              <Link to="/" className="login-form__signup-link"> Sign up now</Link>
            </p>
          </div>

          <div className="login-form__captcha">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
              <a href="#" className="login-form__learn-more"> Learn more.</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};


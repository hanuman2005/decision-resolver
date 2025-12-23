import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {
  LoginContainer,
  LoginWrapper,
  LoginHeader,
  LoginIcon,
  LoginTitle,
  LoginSubtitle,
  LoginDivider,
  LoginRegisterLink,
  DemoCredentials
} from './styledComponents.jsx';

/**
 * Login Page
 * User authentication form
 */

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      // Error handled by context (toast shown)
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        {/* Header */}
        <LoginHeader>
          <LoginIcon>
            <Lock />
          </LoginIcon>
          <LoginTitle>Welcome Back</LoginTitle>
          <LoginSubtitle>Sign in to continue making smart group decisions</LoginSubtitle>
        </LoginHeader>
        {/* Login Form */}
        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              icon={Mail}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={Lock}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              fullWidth
            >
              Sign In
              <ArrowRight />
            </Button>
          </form>
          {/* Divider */}
          <>
            <LoginDivider />
            <span style={{display: 'block', textAlign: 'center', color: '#888', margin: '1rem 0'}}>
              New to Decision Resolver?
            </span>
          </>
          {/* Register Link */}
          <LoginRegisterLink>
            <Link to="/register">Create an account</Link>
          </LoginRegisterLink>
        </Card>
        {/* Demo Credentials */}
        <DemoCredentials>
          <p>Demo: alice@example.com / Test123!@#</p>
        </DemoCredentials>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
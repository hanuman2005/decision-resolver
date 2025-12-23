import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import {
  RegisterContainer,
  RegisterWrapper,
  RegisterHeader,
  RegisterIcon,
  RegisterTitle,
  RegisterSubtitle,
  RegisterDivider,
  RegisterLoginLink
} from './styledComponents.jsx';

/**
 * Register Page
 * New user registration form
 */

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/login');
    } catch (error) {
      // Error handled by context (toast shown)
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterWrapper>
        {/* Header */}
        <RegisterHeader>
          <RegisterIcon>
            <User />
          </RegisterIcon>
          <RegisterTitle>Get Started</RegisterTitle>
          <RegisterSubtitle>Create your account and start making better decisions</RegisterSubtitle>
        </RegisterHeader>

        {/* Register Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="John Doe"
                Icon={User}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
                Icon={Mail}
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
                Icon={Lock}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
                Icon={Lock}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              fullWidth
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Divider */}
          <RegisterDivider />

          {/* Login Link */}
          <RegisterLoginLink>
            <span>Already have an account? </span>
            <Link
              to="/login"
              style={{ 
                color: '#009688', 
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              Sign in instead
            </Link>
          </RegisterLoginLink>
        </Card>
      </RegisterWrapper>
    </RegisterContainer>
  );
};

export default Register;
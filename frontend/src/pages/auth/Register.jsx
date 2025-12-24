import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delayChildren: 0.2,
      staggerChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    transition: { duration: 0.3 }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.15
    }
  },
  hover: {
    scale: 1.15,
    rotate: 5,
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 15px 35px rgba(79, 70, 229, 0.3)',
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.98 }
};

const arrowVariants = {
  hidden: { x: 0, opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.8 } },
  hover: {
    x: [0, 5, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      times: [0, 0.5, 1]
    }
  }
};

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
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <RegisterWrapper as={motion.div}>
          {/* Header */}
          <motion.div variants={itemVariants} custom={0}>
            <RegisterHeader>
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <RegisterIcon>
                  <User />
                </RegisterIcon>
              </motion.div>
              <RegisterTitle>Get Started</RegisterTitle>
              <RegisterSubtitle>Create your account and start making better decisions</RegisterSubtitle>
            </RegisterHeader>
          </motion.div>

          {/* Register Form */}
          <motion.div variants={itemVariants} custom={1}>
            <Card>
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={itemVariants} whileHover="hover">
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
                </motion.div>

                <motion.div variants={itemVariants} whileHover="hover">
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
                </motion.div>

                <motion.div variants={itemVariants} whileHover="hover">
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
                </motion.div>

                <motion.div variants={itemVariants} whileHover="hover">
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
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    fullWidth
                  >
                    Create Account
                    <motion.span variants={arrowVariants} whileHover="hover">
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </form>

              {/* Divider */}
              <RegisterDivider />

              {/* Login Link */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} initial="hidden" animate="visible">
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
              </motion.div>
            </Card>
          </motion.div>
        </RegisterWrapper>
      </motion.div>
    </RegisterContainer>
  );
};

export default Register;
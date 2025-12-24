import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// Animation Variants
const loginContainerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delayChildren: 0.2,
      staggerChildren: 0.15
    }
  }
};

const loginItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const floatingVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 }
  },
  float: {
    y: [-10, 0, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const iconPulseVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.2
    }
  },
  hover: {
    scale: 1.1,
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
    transition: { duration: 0.3 }
  }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: custom * 0.1
    }
  })
};

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
      <motion.div variants={loginContainerVariants} initial="hidden" animate="visible">
        <LoginWrapper as={motion.div}>
          {/* Header */}
          <motion.div variants={loginItemVariants} custom={0}>
            <LoginHeader>
              <motion.div
                variants={iconPulseVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <LoginIcon>
                  <Lock />
                </LoginIcon>
              </motion.div>
              <LoginTitle>Welcome Back</LoginTitle>
              <LoginSubtitle>Sign in to continue making smart group decisions</LoginSubtitle>
            </LoginHeader>
          </motion.div>

          {/* Login Form */}
          <motion.div variants={loginItemVariants} custom={1}>
            <Card>
              <form onSubmit={handleSubmit}>
                <motion.div variants={slideUpVariants} custom={0} initial="hidden" animate="visible">
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
                </motion.div>

                <motion.div variants={slideUpVariants} custom={1} initial="hidden" animate="visible">
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
                </motion.div>

                <motion.div
                  variants={slideUpVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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
                </motion.div>
              </form>

              {/* Divider */}
              <>
                <LoginDivider />
                <motion.span
                  variants={slideUpVariants}
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    color: '#888',
                    margin: '1rem 0'
                  }}
                >
                  New to Decision Resolver?
                </motion.span>
              </>

              {/* Register Link */}
              <motion.div variants={slideUpVariants} custom={4} initial="hidden" animate="visible" whileHover={{ scale: 1.05 }}>
                <LoginRegisterLink>
                  <Link to="/register">Create an account</Link>
                </LoginRegisterLink>
              </motion.div>
            </Card>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            variants={floatingVariants}
            initial="hidden"
            animate={["visible", "float"]}
            custom={5}
          >
            <DemoCredentials>
              <p>Demo: alice@example.com / Test123!@#</p>
            </DemoCredentials>
          </motion.div>
        </LoginWrapper>
      </motion.div>
    </LoginContainer>
  );
};

export default Login;
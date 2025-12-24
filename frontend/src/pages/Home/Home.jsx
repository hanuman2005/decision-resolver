import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';

// ===== ANIMATION VARIANTS =====

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      duration: 0.8
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14
    }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.2
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.4
    }
  }
};

const buttonGroupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: 0.6
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.95 }
};

const statCounterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: 0.8 + index * 0.15
    }
  })
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: index * 0.1
    }
  }),
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: '0 30px 60px rgba(79, 70, 229, 0.2)',
    transition: { duration: 0.3 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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
  }
};

const testimonialVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

const comparisonRowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: index * 0.1
    }
  })
};

const ctaVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

// Scroll-triggered variants
const scrollCardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const scrollSectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const scrollItemVariants = {
  hidden: { opacity: 0, x: -40 },
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

import {
	Users, ArrowRight, CheckCircle,
	Star, Coffee, Film, MapPin, Calendar, Globe,
	Heart, Sparkles,
	ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
	HomeContainer,
	HeroSection,
	HeroContent,
	HeroDescription,
	DashboardLink,
	StatsCounterSection,
	StatsCounterGrid,
	StatCounterItem,
	StatCounterValue,
	StatCounterLabel,
	BenefitsSection,
	BenefitsGrid,
	BenefitCard,
	FeaturesSection,
	FeaturesGrid,
	FeatureCard,
	FeatureImage,
	FeatureTitle,
	FeatureDesc,
	UseCasesSection,
	UseCasesGrid,
	UseCaseItem,
	HowItWorksSection,
	HowItWorksGrid,
	HowItWorksItem,
	StepNumberCircle,
	HowItWorksTitle,
	HowItWorksDesc,
	TestimonialsSection,
	TestimonialContainer,
	TestimonialCard,
	TestimonialHeader,
	TestimonialAvatar,
	TestimonialAuthor,
	TestimonialName,
	TestimonialRole,
	TestimonialRating,
	TestimonialText,
	TestimonialControls,
	TestimonialButton,
	TestimonialDots,
	TestimonialDot,
	ComparisonSection,
	ComparisonCardsContainer,
	ComparisonCard,
	ComparisonMobileView,
	ComparisonMobileCard,
	ComparisonFeatureTitle,
	ComparisonFeatureRow,
	ComparisonLabel,
	ComparisonValue,
	ComparisonOldWay,
	ComparisonDesktopView,
	ComparisonDesktopHeader,
	ComparisonDesktopBody,
	ComparisonDesktopRow,
	ComparisonDesktopValue,
	ComparisonOldWayValue,
	CTASectionStyled,
	CTASectionContainer,
	CTAHeading,
	CTAMainText,
	CTAButton
} from './styledComponents';

/**
 * Enhanced Home/Landing Page
 * Using only styled-components with dark blue theme
 */

const Home = () => {
	const { user } = useAuth();
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [statsCounter, setStatsCounter] = useState({ decisions: 0, users: 0, groups: 0 });
	const [scrollY, setScrollY] = useState(0);

	// Animated counter effect
	useEffect(() => {
		const interval = setInterval(() => {
			setStatsCounter(prev => ({
				decisions: Math.min(prev.decisions + 47, 15247),
				users: Math.min(prev.users + 13, 4892),
				groups: Math.min(prev.groups + 5, 1823)
			}));
		}, 50);

		return () => clearInterval(interval);
	}, []);

	// Header side effect - parallax on scroll
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const features = [
		{
			title: 'Lightning Fast Decisions',
			description: 'No more endless group chats. Get unanimous decisions in seconds with our smart algorithm.',
			image: '⚡',
		},
		{
			title: 'Fair to Everyone',
			description: 'Our fairness tracking ensures everyone gets their preferences over time. No one is left behind.',
			image: '🛡️',
		},
		{
			title: 'Smart Constraint Solving',
			description: 'Advanced algorithm considers budget, location, preferences, and dietary needs automatically.',
			image: '📈',
		},
		{
			title: 'Real-Time Group Chat',
			description: 'Discuss decisions with your group in real-time. No need to switch between apps.',
			image: '💬',
		},
		{
			title: 'AI-Powered Suggestions',
			description: 'Get smart recommendations based on your group\'s history and preferences.',
			image: '🤖',
		},
		{
			title: 'Analytics Dashboard',
			description: 'Track decision patterns, satisfaction scores, and group dynamics over time.',
			image: '📊',
		}
	];

	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'Event Organizer',
			avatar: 'https://i.pravatar.cc/150?img=1',
			rating: 5,
			text: 'This app saved our team SO much time! We used to spend hours debating where to eat. Now it takes 2 minutes. The fairness tracking is genius!'
		},
		{
			name: 'Michael Chen',
			role: 'Startup Founder',
			avatar: 'https://i.pravatar.cc/150?img=2',
			rating: 5,
			text: 'Perfect for our remote team. Everyone submits constraints, and we get a fair decision instantly. The transparency builds trust.'
		},
		{
			name: 'Emily Rodriguez',
			role: 'College Student',
			avatar: 'https://i.pravatar.cc/150?img=5',
			rating: 5,
			text: 'My friend group uses this for EVERYTHING - movies, restaurants, weekend plans. No more arguing! Best app ever.'
		}
	];

	const useCases = [
		{ icon: Coffee, text: 'Choosing restaurants for dinner' },
		{ icon: Film, text: 'Planning weekend activities' },
		{ icon: Calendar, text: 'Selecting meeting times' },
		{ icon: MapPin, text: 'Deciding on movie nights' },
		{ icon: Globe, text: 'Organizing group trips' },
		{ icon: Heart, text: 'Picking gift ideas' },
	];

	const comparisonData = [
		{ feature: 'Decision Speed', us: '2 minutes', them: '2+ hours' },
		{ feature: 'Fairness Guarantee', us: '100%', them: 'No tracking' },
		{ feature: 'Transparent Reasoning', us: 'Full explanation', them: 'Black box' },
		{ feature: 'Group Chat', us: 'Built-in', them: 'Use external app' },
		{ feature: 'AI Suggestions', us: 'Smart recommendations', them: 'Manual only' }
	];

	const nextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	return (
		<HomeContainer>
			{/* Hero Section */}
			<HeroSection>
				<HeroContent>
					<div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(79, 70, 229, 0.2)', borderRadius: '9999px', marginBottom: '1.5rem', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#e0e7ff', fontWeight: '600' }}>
						<Sparkles style={{ width: '1rem', height: '1rem' }} />
						Now with AI-Powered Suggestions!
					</div>

					<h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: '1.2', letterSpacing: '-1px', textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', textAlign: 'center' }}>
						Stop Debating,<br />
						<span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
							Start Deciding
						</span>
					</h1>

					<HeroDescription>
						Make fair, transparent group decisions in seconds. No more endless debates, no more unfair outcomes. Just smart, consensus-driven decisions powered by AI.
					</HeroDescription>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginTop: 'clamp(1.5rem, 3vw, 2rem)', flexWrap: 'wrap', width: '100%' }}>
						{!user ? (
							<>
								<Link to="/register" style={{ textDecoration: 'none' }}>
									<button style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
										padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
										background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
										color: '#ffffff',
										fontWeight: '700',
										fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
										border: 'none',
										borderRadius: '0.75rem',
										boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)',
										cursor: 'pointer',
										transition: 'all 0.3s ease'
									}}>
										Get Started Free
										<ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
									</button>
								</Link>
								<Link to="/login" style={{ textDecoration: 'none' }}>
									<button style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
										padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
										background: 'transparent',
										color: '#ffffff',
										fontWeight: '600',
										fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
										border: '2px solid rgba(92, 124, 137, 0.6)',
										borderRadius: '0.75rem',
										cursor: 'pointer',
										transition: 'all 0.3s ease'
									}}>
										Sign In
									</button>
								</Link>
							</>
						) : (
							<DashboardLink to="/dashboard">
								<button style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
									background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
									color: '#ffffff',
									fontWeight: '700',
									fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
									border: 'none',
									borderRadius: '0.75rem',
									boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)',
									cursor: 'pointer',
									transition: 'all 0.3s ease'
								}}>
									Go to Dashboard
									<ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
								</button>
							</DashboardLink>
						)}
					</div>
				</HeroContent>
			</HeroSection>

			{/* Live Stats Counter */}
			<StatsCounterSection>
				<StatsCounterGrid>
					<StatCounterItem>
						<StatCounterValue $gradient="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)">
							{statsCounter.decisions.toLocaleString()}+
						</StatCounterValue>
						<StatCounterLabel>Decisions Made</StatCounterLabel>
					</StatCounterItem>
					<StatCounterItem>
						<StatCounterValue $gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)">
							{statsCounter.users.toLocaleString()}+
						</StatCounterValue>
						<StatCounterLabel>Happy Users</StatCounterLabel>
					</StatCounterItem>
					<StatCounterItem>
						<StatCounterValue $gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)">
							{statsCounter.groups.toLocaleString()}+
						</StatCounterValue>
						<StatCounterLabel>Active Groups</StatCounterLabel>
					</StatCounterItem>
				</StatsCounterGrid>
			</StatsCounterSection>

			{/* Benefits Section */}
			<BenefitsSection>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
				<BenefitsGrid>
					{[
						{ number: '10x Faster', desc: 'Than endless debates' },
						{ number: '100% Fair', desc: 'Algorithm-driven decisions' },
						{ number: 'Crystal Clear', desc: 'Transparent reasoning' }
					].map((benefit, idx) => (
						<motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}>
							<BenefitCard>
								<div>{benefit.number}</div>
								<div>{benefit.desc}</div>
							</BenefitCard>
						</motion.div>
					))}
				</BenefitsGrid>
			</motion.div>
			</BenefitsSection>

			{/* Features Grid */}
			<FeaturesSection>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 80, damping: 15 }}
				viewport={{ once: true, margin: '0px 0px -200px 0px' }}
				style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
			>
				<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
					Everything You Need to Decide Smarter
				</h2>
				<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
					Powerful features designed to make group decisions effortless
				</p>
			</motion.div>

			<FeaturesGrid as={motion.div} initial="hidden" whileInView="visible" variants={scrollSectionVariants} viewport={{ once: true, margin: '0px 0px -200px 0px' }}>
				{features.map((feature, idx) => (
					<motion.div key={idx} variants={scrollCardVariants} custom={idx}>
						<FeatureCard>
							<FeatureImage>{feature.image}</FeatureImage>
							<FeatureTitle>{feature.title}</FeatureTitle>
							<FeatureDesc>{feature.description}</FeatureDesc>
						</FeatureCard>
					</motion.div>
				))}
			</FeaturesGrid>
		</FeaturesSection>

			{/* Use Cases */}
			<UseCasesSection>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 80, damping: 15 }}
				viewport={{ once: true, margin: '0px 0px -200px 0px' }}
				style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}
			>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff' }}>
						Perfect for Any Group Decision
					</h2>
				</div>

				<motion.div
					style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(1.5rem, 2vw, 2rem)' }}
					initial="hidden"
					whileInView="visible"
					variants={scrollSectionVariants}
					viewport={{ once: true, margin: '0px 0px -150px 0px' }}
				>
					{useCases.map((useCase, idx) => (
						<motion.div key={idx} variants={scrollItemVariants}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
									background: 'rgba(31, 73, 89, 0.4)',
									backdropFilter: 'blur(20px)',
									borderRadius: '1rem',
									padding: 'clamp(1.5rem, 2vw, 2rem)',
									border: '1px solid rgba(92, 124, 137, 0.5)',
									transition: 'all 0.3s ease',
									cursor: 'pointer'
								}}
								onMouseEnter={e => {
									e.currentTarget.style.background = 'rgba(31, 73, 89, 0.6)';
									e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 73, 89, 0.3)';
									e.currentTarget.style.transform = 'translateY(-4px)';
								}}
								onMouseLeave={e => {
									e.currentTarget.style.background = 'rgba(31, 73, 89, 0.4)';
									e.currentTarget.style.boxShadow = 'none';
									e.currentTarget.style.transform = 'translateY(0)';
								}}
							>
								<useCase.icon style={{ width: '1.5rem', height: '1.5rem', color: '#4f46e5', flexShrink: 0 }} />
								<span style={{ color: '#cbd5e1', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', fontWeight: '500' }}>{useCase.text}</span>
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</UseCasesSection>
			<HowItWorksSection>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 80, damping: 15 }}
				viewport={{ once: true, margin: '0px 0px -200px 0px' }}
				style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
						How It Works
					</h2>
					<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
						Three simple steps to perfect decisions
					</p>
				</div>

				<motion.div
					as={HowItWorksGrid}
					variants={scrollSectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '0px 0px -200px 0px' }}
					style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
				>
					{[
						{ num: '1', title: 'Create a Group', desc: 'Invite your friends, family, or colleagues', gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
						{ num: '2', title: 'Set Constraints', desc: 'Everyone adds their budget, preferences, and requirements', gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
						{ num: '3', title: 'Get Your Answer', desc: 'AI instantly finds the best option with transparent reasoning', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }
					].map((step, idx) => (
						<motion.div
							key={idx}
							variants={scrollCardVariants}
							as={HowItWorksItem}
						>
							<StepNumberCircle $gradient={step.gradient}>{step.num}</StepNumberCircle>
							<HowItWorksTitle>{step.title}</HowItWorksTitle>
							<HowItWorksDesc>{step.desc}</HowItWorksDesc>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</HowItWorksSection>

		{/* Testimonials */}
			<TestimonialsSection>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 80, damping: 15 }}
				viewport={{ once: true, margin: '0px 0px -200px 0px' }}
			>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
						Loved by Thousands of Groups
					</h2>
					<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
						See what our users are saying
					</p>
				</div>

				<motion.div
					as={TestimonialContainer}
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.1 }}
					viewport={{ once: true, margin: '0px 0px -200px 0px' }}
				>
					<TestimonialCard>
						<TestimonialHeader>
							<TestimonialAvatar
								src={testimonials[currentTestimonial].avatar}
								alt={testimonials[currentTestimonial].name}
							/>
							<TestimonialAuthor>
								<TestimonialName>{testimonials[currentTestimonial].name}</TestimonialName>
								<TestimonialRole>{testimonials[currentTestimonial].role}</TestimonialRole>
								<TestimonialRating>
									{[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
										<Star key={i} style={{ width: 'clamp(1rem, 2vw, 1.2rem)', height: 'clamp(1rem, 2vw, 1.2rem)', fill: '#fbbf24', color: '#fbbf24' }} />
									))}
								</TestimonialRating>
							</TestimonialAuthor>
						</TestimonialHeader>

						<TestimonialText>
							"{testimonials[currentTestimonial].text}"
						</TestimonialText>

						<TestimonialControls>
							<TestimonialButton onClick={prevTestimonial}>
								<ChevronLeft style={{ width: 'clamp(1.25rem, 2vw, 1.5rem)', height: 'clamp(1.25rem, 2vw, 1.5rem)' }} />
							</TestimonialButton>

							<TestimonialDots>
								{testimonials.map((_, idx) => (
									<TestimonialDot
										key={idx}
										$active={idx === currentTestimonial}
										onClick={() => setCurrentTestimonial(idx)}
									/>
								))}
							</TestimonialDots>

							<TestimonialButton onClick={nextTestimonial}>
								<ChevronRight style={{ width: 'clamp(1.25rem, 2vw, 1.5rem)', height: 'clamp(1.25rem, 2vw, 1.5rem)' }} />
							</TestimonialButton>
						</TestimonialControls>
					</TestimonialCard>
				</motion.div>
			</motion.div>
		</TestimonialsSection>

			{/* Comparison Section */}
			<ComparisonSection>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ type: 'spring', stiffness: 80, damping: 15 }}
					viewport={{ once: true, margin: '0px 0px -200px 0px' }}
				>
					<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
						<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
							Why Choose Decision Resolver?
						</h2>
						<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
							See how we compare to traditional group decision methods
						</p>
					</div>

					{/* Comparison Cards Container */}
				<ComparisonCardsContainer>
					{comparisonData.map((row, idx) => (
						<motion.div
							key={idx}
							variants={scrollItemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '0px 0px -200px 0px' }}
						>
							<ComparisonCard>
								<div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(100, 116, 139, 0.3)' }}>
									<p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', fontWeight: '600', color: '#242424', margin: '0' }}>
										{row.feature}
									</p>
								</div>
								
								<div style={{ marginBottom: '1.5rem' }}>
									<p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Decision Resolver</p>
									<p style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: '600', color: '#10b981', margin: '0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
										<CheckCircle style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
										{row.us}
									</p>
								</div>

								<div>
									<p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Old Way</p>
									<p style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: '500', color: '#cbd5e1', margin: '0' }}>
										{row.them}
									</p>
								</div>
							</ComparisonCard>
						</motion.div>
					))}
				</ComparisonCardsContainer>
			</motion.div>
		</ComparisonSection>

		</HomeContainer>
	);
};

export default Home;

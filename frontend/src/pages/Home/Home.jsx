import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
						Everything You Need to Decide Smarter
					</h2>
					<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
						Powerful features designed to make group decisions effortless
					</p>
				</div>

				<FeaturesGrid>
					{features.map((feature, idx) => (
						<FeatureCard key={idx}>
							<FeatureImage>{feature.image}</FeatureImage>
							<FeatureTitle>{feature.title}</FeatureTitle>
							<FeatureDesc>{feature.description}</FeatureDesc>
						</FeatureCard>
					))}
				</FeaturesGrid>
			</FeaturesSection>

			{/* Use Cases */}
			<UseCasesSection>
			<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff' }}>
						Perfect for Any Group Decision
					</h2>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(1.5rem, 2vw, 2rem)' }}>
					{useCases.map((useCase, idx) => (
						<div
							key={idx}
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
									))}
								</div>
							</div>
						</UseCasesSection>
			<HowItWorksSection>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
						How It Works
					</h2>
					<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
						Three simple steps to perfect decisions
					</p>
				</div>

				<HowItWorksGrid>
					{[
						{ num: '1', title: 'Create a Group', desc: 'Invite your friends, family, or colleagues', gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
						{ num: '2', title: 'Set Constraints', desc: 'Everyone adds their budget, preferences, and requirements', gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
						{ num: '3', title: 'Get Your Answer', desc: 'AI instantly finds the best option with transparent reasoning', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }
					].map((step, idx) => (
						<HowItWorksItem key={idx}>
							<StepNumberCircle $gradient={step.gradient}>{step.num}</StepNumberCircle>
							<HowItWorksTitle>{step.title}</HowItWorksTitle>
							<HowItWorksDesc>{step.desc}</HowItWorksDesc>
						</HowItWorksItem>
					))}
				</HowItWorksGrid>
			</HowItWorksSection>

			{/* Testimonials */}
			<TestimonialsSection>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
						Loved by Thousands of Groups
					</h2>
					<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
						See what our users are saying
					</p>
				</div>

				<TestimonialContainer>
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
				</TestimonialContainer>
			</TestimonialsSection>

			{/* Comparison Section */}
			<ComparisonSection>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
					<h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
						Why Choose Decision Resolver?
					</h2>
					<p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: '#cbd5e1' }}>
						See how we compare to traditional group decision methods
					</p>
				</div>

				{/* Mobile View */}
				<ComparisonMobileView>
					{comparisonData.map((row, idx) => (
						<ComparisonMobileCard key={idx}>
							<ComparisonFeatureTitle>{row.feature}</ComparisonFeatureTitle>
							<ComparisonFeatureRow>
								<ComparisonLabel>Our App:</ComparisonLabel>
								<ComparisonValue>
									<CheckCircle style={{ width: '1rem', height: '1rem' }} />
									{row.us}
								</ComparisonValue>
							</ComparisonFeatureRow>
							<ComparisonFeatureRow>
								<ComparisonLabel>Old Way:</ComparisonLabel>
								<ComparisonOldWay>{row.them}</ComparisonOldWay>
							</ComparisonFeatureRow>
						</ComparisonMobileCard>
					))}
				</ComparisonMobileView>

				{/* Desktop View */}
				<ComparisonDesktopView>
					<ComparisonDesktopHeader>
						<div>Feature</div>
						<div>Decision Resolver</div>
						<div>Old Way</div>
					</ComparisonDesktopHeader>
					<ComparisonDesktopBody>
						{comparisonData.map((row, idx) => (
							<ComparisonDesktopRow key={idx}>
								<div>{row.feature}</div>
								<ComparisonDesktopValue>
									<span>
										<CheckCircle style={{ width: '1rem', height: '1rem' }} />
										{row.us}
									</span>
								</ComparisonDesktopValue>
								<ComparisonOldWayValue>{row.them}</ComparisonOldWayValue>
							</ComparisonDesktopRow>
						))}
					</ComparisonDesktopBody>
				</ComparisonDesktopView>
			</ComparisonSection>

			{/* CTA Section */}
			{!user && (
				<CTASectionStyled>
					<CTASectionContainer>
						<Users style={{ width: 'clamp(3rem, 8vw, 4rem)', height: 'clamp(3rem, 8vw, 4rem)', margin: '0 auto clamp(1rem, 2vw, 1.5rem)', opacity: 0.9 }} />
						<CTAHeading>Ready to Make Better Decisions?</CTAHeading>
						<CTAMainText>
							Join thousands of groups making smarter, fairer decisions every day. Get started in less than 2 minutes — completely free!
						</CTAMainText>
						<CTAButton to="/register">
							Get Started Now - It's Free
							<ArrowRight style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
						</CTAButton>
					</CTASectionContainer>
				</CTASectionStyled>
			)}
		</HomeContainer>
	);
};

export default Home;

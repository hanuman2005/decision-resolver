import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomeContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: clamp(1.5rem, 5vw, 3rem);
`;

export const Title = styled.h1`
	font-size: clamp(2rem, 8vw, 3.5rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
	text-align: center;
	line-height: 1.2;
	letter-spacing: -1px;
	text-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
`;

export const TitleSpan = styled.span`
	background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-shadow: none;
`;

export const HeroSection = styled.section`
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: calc(-50vw + 50%);
	margin-right: calc(-50vw + 50%);
`;

export const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: clamp(1.5rem, 3vw, 2.5rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
	width: 100%;
	padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem);
	background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxipWuVy8PI4fIYrWQcE8Dfc-gUePG6Bj1g&s');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	border-radius: 0;
	border: none;
	backdrop-filter: blur(5px);
	
	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(1, 20, 37, 0.5), rgba(31, 73, 89, 0.5));
		border-radius: 0;
		pointer-events: none;
	}
	
	> * {
		position: relative;
		z-index: 1;
	}
`;

export const HeroDescription = styled.p`
	font-size: clamp(0.95rem, 2vw, 1.1rem);
	color: #ffffff;
	line-height: 1.7;
	max-width: 600px;
	text-align: center;
	font-weight: 500;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const DashboardLink = styled(Link)`
	text-decoration: none;
`;


export const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(1rem, 3vw, 1.5rem);
	margin-bottom: clamp(2rem, 4vw, 3rem);
	width: 100%;
	
	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}
	
	@media (min-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const StatCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(1.5rem, 3vw, 2rem);
	font-size: clamp(1rem, 2vw, 1.25rem);
	font-weight: 600;
	color: #ffffff;
	text-align: center;
	transition: all 0.3s ease;
	
	&:hover {
		background: rgba(31, 73, 89, 0.6);
		box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.3);
	}
`;

export const FeaturesSection = styled.section`
	width: 100%;
	max-width: 1200px;
	margin-bottom: clamp(2.5rem, 6vw, 4rem);
	padding: 0 clamp(1rem, 3vw, 2rem);
`;

export const FeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(1.5rem, 3vw, 2rem);
	
	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}
	
	@media (min-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const FeatureCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
	border: 2px solid rgba(92, 124, 137, 0.5);
	padding: clamp(2rem, 4vw, 2.5rem);
	text-align: center;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
	
	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, 
			${props => props.$gradient === 'from-yellow-400 to-orange-500' ? '#fbbf24 0%, #f97316 100%' :
			  props.$gradient === 'from-green-400 to-emerald-500' ? '#4ade80 0%, #10b981 100%' :
			  '#60a5fa 0%, #06b6d4 100%'}
		);
	}
	
	&:hover {
		background: rgba(31, 73, 89, 0.6);
		box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
		transform: translateY(-8px);
		border-color: rgba(255, 255, 255, 0.3);
	}
`;

export const FeatureImageBox = styled.div`
	width: 100%;
	height: 140px;
	background: linear-gradient(135deg, rgba(92, 124, 137, 0.2), rgba(31, 73, 89, 0.2));
	border-radius: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1.5rem;
	border: 1px solid rgba(92, 124, 137, 0.3);
	overflow: hidden;
`;

export const FeatureImage = styled.div`
	font-size: clamp(3rem, 10vw, 4rem);
	animation: float 3s ease-in-out infinite;
	
	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}
`;

export const FeatureIcon = styled.div`
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
	
	& svg {
		width: clamp(2.5rem, 5vw, 3rem);
		height: clamp(2.5rem, 5vw, 3rem);
		color: #1f4959;
	}
`;

export const FeatureTitle = styled.h3`
	font-size: clamp(1.1rem, 2vw, 1.35rem);
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 0.75rem;
`;

export const FeatureDesc = styled.p`
	color: #b0d4dd;
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	line-height: 1.5;
`;

export const UseCasesSection = styled.section`
	width: 100%;
	max-width: 1000px;
	margin-bottom: clamp(2.5rem, 6vw, 4rem);
	padding: 0 clamp(1rem, 3vw, 2rem);
`;

export const UseCasesGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: clamp(1rem, 2vw, 1.5rem);
`;

export const UseCaseItem = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-size: clamp(1rem, 1.5vw, 1.1rem);
	color: #cbd5e1;
	
	& svg {
		color: #4f46e5;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
	}
`;

export const UseCaseText = styled.span`
	color: #cbd5e1;
	font-size: clamp(1rem, 1.5vw, 1.1rem);
	font-weight: 500;
`;

export const StepsCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border: 2px solid rgba(92, 124, 137, 0.5);
	border-radius: 1rem;
	padding: clamp(2rem, 4vw, 3rem);
	margin-top: clamp(2rem, 4vw, 3rem);
	display: flex;
	flex-direction: column;
	gap: clamp(1.5rem, 3vw, 2rem);
	box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
	transition: all 0.3s ease;
	
	&:hover {
		background: rgba(31, 73, 89, 0.6);
		box-shadow: 0 12px 40px rgba(31, 73, 89, 0.3);
		border-color: rgba(92, 124, 137, 0.7);
	}
`;

export const StepBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-bottom: 0.5rem;
`;

export const StepIcon = styled.div`
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	border-radius: 50%;
	width: clamp(2.5rem, 5vw, 3.5rem);
	height: clamp(2.5rem, 5vw, 3.5rem);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: clamp(1.1rem, 2vw, 1.35rem);
	margin-bottom: 1rem;
	box-shadow: 0 4px 12px rgba(31, 73, 89, 0.3);
`;

export const StepTitle = styled.h4`
	font-size: clamp(1.1rem, 2vw, 1.25rem);
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 0.5rem;
`;

export const StepDesc = styled.p`
	color: #cbd5e1;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	line-height: 1.5;
`;

export const CTASection = styled.section`
	width: 100%;
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	padding: clamp(2.5rem, 6vw, 4rem);
	text-align: center;
	margin-bottom: clamp(2rem, 5vw, 3rem);
	border-radius: 1.5rem;
	max-width: 1000px;
	
	& svg {
		width: clamp(2rem, 5vw, 3rem);
		height: clamp(2rem, 5vw, 3rem);
		margin: 0 auto clamp(1rem, 2vw, 1.5rem);
	}
`;

export const CTAHeading = styled.h2`
	font-size: clamp(1.5rem, 5vw, 2.5rem);
	font-weight: 700;
	margin-bottom: clamp(1.5rem, 3vw, 2rem);
	color: #fff;
	letter-spacing: -0.5px;
`;

export const FooterSection = styled.footer`
	width: 100%;
	background: linear-gradient(135deg, #011425 0%, #1f4959 100%);
	color: #cbd5e1;
	padding: clamp(2rem, 4vw, 3rem);
	text-align: center;
	border-top: 1px solid #1e293b;
`;

export const BrandText = styled.span`
	font-size: clamp(1rem, 2vw, 1.25rem);
	font-weight: 700;
	color: #fff;
`;

export const FooterBrand = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	margin-bottom: 1rem;
	
	& svg {
		width: 1.5rem;
		height: 1.5rem;
		color: #4f46e5;
	}
`;

export const FooterText = styled.p`
	color: #94a3b8;
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	margin: 0.5rem 0;
`;

// Stats Counter Section
export const StatsCounterSection = styled.section`
	width: 100%;
	background: rgba(31, 73, 89, 0.3);
	backdrop-filter: blur(10px);
	border-top: 1px solid rgba(92, 124, 137, 0.5);
	border-bottom: 1px solid rgba(92, 124, 137, 0.5);
	padding: clamp(2rem, 4vw, 3rem) 0;
`;

export const StatsCounterGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(2rem, 4vw, 3rem);
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 clamp(1rem, 3vw, 2rem);
	text-align: center;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const StatCounterItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`;

export const StatCounterValue = styled.div`
	font-size: clamp(2.5rem, 6vw, 3.5rem);
	font-weight: 700;
	background: ${props => props.$gradient || 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'};
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
`;

export const StatCounterLabel = styled.div`
	color: #cbd5e1;
	font-weight: 600;
	font-size: clamp(0.95rem, 1.5vw, 1.1rem);
`;

// Benefits Section
export const BenefitsSection = styled.section`
	width: 100%;
	background: linear-gradient(90deg, #1f4959 0%, #5c7c89 100%);
	padding: clamp(1.5rem, 3vw, 2rem) 0;
`;

export const BenefitsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(1rem, 2vw, 1.5rem);
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 clamp(1rem, 3vw, 2rem);

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const BenefitCard = styled.div`
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	border-radius: 1rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	text-align: center;
	color: #ffffff;
	border: 1px solid rgba(92, 124, 137, 0.5);
	transition: all 0.3s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(31, 73, 89, 0.3);
	}

	& > div:first-child {
		font-size: clamp(1.8rem, 4vw, 2.2rem);
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	& > div:last-child {
		opacity: 0.9;
		font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	}
`;

// How It Works Section
export const HowItWorksSection = styled.section`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto clamp(2rem, 4vw, 3rem);
	padding: 0 clamp(1rem, 3vw, 2rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

export const HowItWorksGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(2rem, 4vw, 3rem);
	margin-top: clamp(2rem, 4vw, 3rem);
	width: 100%;
	justify-items: center;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const HowItWorksItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	position: relative;
`;

export const StepNumberCircle = styled.div`
	width: clamp(3rem, 6vw, 4rem);
	height: clamp(3rem, 6vw, 4rem);
	border-radius: 50%;
	background: linear-gradient(135deg, ${props => props.$gradient || '#1f4959 0%, #5c7c89 100%'});
	color: #ffffff;
	font-size: clamp(1.5rem, 3vw, 2rem);
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto clamp(1rem, 2vw, 1.5rem);
	box-shadow: 0 4px 16px rgba(31, 73, 89, 0.3);
`;

export const HowItWorksTitle = styled.h3`
	font-size: clamp(1.2rem, 2vw, 1.4rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.75rem;
`;

export const HowItWorksDesc = styled.p`
	color: #cbd5e1;
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	line-height: 1.5;
`;

// Testimonials Section
export const TestimonialsSection = styled.section`
	width: 100%;
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	padding: clamp(2rem, 4vw, 3rem) 0;
	color: #ffffff;
`;

export const TestimonialContainer = styled.div`
	max-width: 700px;
	margin: 0 auto;
	padding: 0 clamp(1rem, 3vw, 2rem);
`;

export const TestimonialCard = styled.div`
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	border-radius: 1.5rem;
	padding: clamp(2rem, 4vw, 3rem);
	border: 1px solid rgba(92, 124, 137, 0.5);
	position: relative;
`;

export const TestimonialHeader = styled.div`
	display: flex;
	align-items: center;
	gap: clamp(1rem, 2vw, 1.5rem);
	margin-bottom: clamp(1.5rem, 3vw, 2rem);
`;

export const TestimonialAvatar = styled.img`
	width: clamp(3rem, 8vw, 4rem);
	height: clamp(3rem, 8vw, 4rem);
	border-radius: 50%;
	border: 3px solid #ffffff;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const TestimonialAuthor = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const TestimonialName = styled.div`
	font-weight: 700;
	font-size: clamp(1rem, 2vw, 1.2rem);
`;

export const TestimonialRole = styled.div`
	color: #cbd5e1;
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
`;

export const TestimonialRating = styled.div`
	display: flex;
	gap: 0.25rem;
	margin-top: 0.5rem;

	& svg {
		width: clamp(1rem, 2vw, 1.2rem);
		height: clamp(1rem, 2vw, 1.2rem);
	}
`;

export const TestimonialText = styled.p`
	font-size: clamp(1rem, 1.5vw, 1.1rem);
	line-height: 1.6;
	margin-bottom: clamp(1.5rem, 3vw, 2rem);
	color: #ffffff;
`;

export const TestimonialControls = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: clamp(1rem, 2vw, 1.5rem);
`;

export const TestimonialButton = styled.button`
	padding: clamp(0.5rem, 1vw, 0.75rem);
	background: rgba(255, 255, 255, 0.2);
	border: none;
	border-radius: 50%;
	color: #ffffff;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	& svg {
		width: clamp(1.25rem, 2vw, 1.5rem);
		height: clamp(1.25rem, 2vw, 1.5rem);
	}
`;

export const TestimonialDots = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: center;
`;

export const TestimonialDot = styled.button`
	width: ${props => props.$active ? 'clamp(1rem, 2vw, 1.25rem)' : '0.5rem'};
	height: 0.5rem;
	border-radius: 9999px;
	border: none;
	background: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'};
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
	}
`;

// Comparison Section
export const ComparisonSection = styled.section`
	width: 100%;
	max-width: 100%;
	margin: 0 auto clamp(2rem, 4vw, 3rem);
	padding: 0 clamp(1rem, 3vw, 2rem);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ComparisonCardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: clamp(1rem, 2vw, 1.5rem);
	width: 100%;
	max-width: 100%;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 767px) {
		grid-template-columns: 1fr;
	}
`;

export const ComparisonCard = styled.div`
	background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
	border: 1px solid rgba(100, 116, 139, 0.3);
	border-radius: 12px;
	padding: clamp(1.5rem, 3vw, 2rem);
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;

	&:hover {
		border-color: rgba(16, 185, 129, 0.5);
		background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%);
		box-shadow: 0 8px 32px rgba(16, 185, 129, 0.1);
	}
`;

export const ComparisonMobileView = styled.div`
	display: flex;
	flex-direction: column;
	gap: clamp(1rem, 2vw, 1.5rem);

	@media (min-width: 768px) {
		display: none;
	}
`;

export const ComparisonMobileCard = styled.div`
	background: rgba(31, 73, 89, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 1.5rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	border: 1px solid rgba(92, 124, 137, 0.5);
`;

export const ComparisonFeatureTitle = styled.div`
	font-weight: 700;
	color: #ffffff;
	font-size: clamp(1rem, 2vw, 1.2rem);
	margin-bottom: clamp(1rem, 2vw, 1.25rem);
`;

export const ComparisonFeatureRow = styled.div`
	display: flex;
	align-items: flex-start;
	gap: clamp(0.75rem, 1.5vw, 1rem);
	margin-bottom: 0.75rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const ComparisonLabel = styled.span`
	color: #cbd5e1;
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
	font-weight: 600;
	min-width: 70px;
	flex-shrink: 0;
`;

export const ComparisonValue = styled.span`
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
	font-weight: 600;
	color: #10b981;
	background: rgba(16, 185, 129, 0.2);
	padding: clamp(0.25rem, 0.5vw, 0.4rem) clamp(0.75rem, 1vw, 0.9rem);
	border-radius: 9999px;
	border: 1px solid rgba(16, 185, 129, 0.5);
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;

	& svg {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
`;

export const ComparisonOldWay = styled.span`
	color: #94a3b8;
	font-weight: 500;
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
`;

export const ComparisonDesktopView = styled.div`
	width: 100%;
	display: block;
	background: rgba(31, 73, 89, 0.3);
	backdrop-filter: blur(20px);
	border-radius: 1.5rem;
	overflow: hidden;
	border: 2px solid rgba(92, 124, 137, 0.5);

	@media (max-width: 767px) {
		background: transparent;
		border: none;
		backdrop-filter: none;
	}
`;

export const ComparisonDesktopHeader = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(100px, 1fr));
	gap: 1.5rem;
	padding: clamp(1.5rem, 2vw, 2rem);
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	font-weight: 700;
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	text-align: center;
	width: 100%;

	@media (max-width: 767px) {
		display: none;
	}

	& > div:first-child {
		text-align: left;
	}

	& > div:nth-child(2),
	& > div:nth-child(3) {
		text-align: center;
	}
`;

export const ComparisonDesktopBody = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ComparisonDesktopRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1.5rem;
	padding: clamp(1.5rem, 2vw, 2rem);
	align-items: center;
	border-top: 1px solid rgba(92, 124, 137, 0.3);
	width: 100%;

	@media (max-width: 767px) {
		grid-template-columns: 1fr;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid rgba(92, 124, 137, 0.5);
		border-radius: 1rem;
		margin-bottom: 1rem;
		background: rgba(31, 73, 89, 0.4);
		border-top: none;
	}

	& > div:first-child {
		text-align: left;
		font-weight: 600;
		color: #ffffff;
		font-size: clamp(0.9rem, 1.5vw, 1rem);
		min-width: 0;

		@media (max-width: 767px) {
			font-weight: 700;
			font-size: 1.1rem;
			margin-bottom: 0.5rem;
			border-bottom: 1px solid rgba(92, 124, 137, 0.3);
			padding-bottom: 0.5rem;
		}
	}

	& > div:nth-child(2) {
		text-align: center;
		min-width: 0;

		@media (max-width: 767px) {
			text-align: left;
		}
	}

	& > div:nth-child(3) {
		text-align: center;
		min-width: 0;

		@media (max-width: 767px) {
			text-align: left;
		}
	}
`;

export const ComparisonDesktopValue = styled.div`
	padding: 0;
	min-width: 0;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 767px) {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: flex-start;

		&::before {
			content: 'Our App: ';
			color: #cbd5e1;
			font-size: 0.85rem;
			flex-shrink: 0;
		}
	}

	& span {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: clamp(0.85rem, 1.5vw, 0.95rem);
		font-weight: 600;
		color: #10b981;
		background: rgba(16, 185, 129, 0.2);
		padding: clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.8rem, 1.2vw, 1rem);
		border-radius: 9999px;
		border: 1px solid rgba(16, 185, 129, 0.5);
		gap: 0.4rem;
		width: fit-content;
		margin: 0 auto;

		@media (max-width: 767px) {
			margin: 0;
			background: transparent;
			border: none;
			padding: 0;
			font-size: 0.95rem;
		}

		& svg {
			width: 1rem;
			height: 1rem;
			flex-shrink: 0;

			@media (max-width: 767px) {
				display: none;
			}
		}
	}
`;

export const ComparisonOldWayValue = styled.div`
	color: #94a3b8;
	font-weight: 500;
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	text-align: center;
	min-width: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 767px) {
		text-align: left;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: flex-start;

		&::before {
			content: 'Old Way: ';
			color: #cbd5e1;
			font-size: 0.85rem;
			flex-shrink: 0;
		}
	}
`;

// CTA Section
export const CTASectionStyled = styled.section`
	width: 100%;
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	padding: clamp(2rem, 4vw, 3rem) 0;
	margin: clamp(2rem, 4vw, 3rem) 0 0 0;
`;

export const CTASectionContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 0 clamp(1rem, 3vw, 2rem);
	text-align: center;

	& svg {
		width: clamp(3rem, 8vw, 4rem);
		height: clamp(3rem, 8vw, 4rem);
		margin: 0 auto clamp(1rem, 2vw, 1.5rem);
		opacity: 0.9;
	}
`;

export const CTAMainText = styled.p`
	font-size: clamp(1rem, 1.5vw, 1.1rem);
	color: #cbd5e1;
	margin: clamp(1.5rem, 2vw, 2rem) auto;
	max-width: 600px;
	line-height: 1.6;
`;

export const CTAButton = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: clamp(0.75rem, 1.5vw, 1rem);
	padding: clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 2.5rem);
	background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
	color: #ffffff;
	font-weight: 700;
	font-size: clamp(0.95rem, 1.5vw, 1.05rem);
	border-radius: 0.75rem;
	text-decoration: none;
	box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 12px 32px rgba(79, 70, 229, 0.4);
		transform: translateY(-2px);
	}

	& svg {
		width: clamp(1rem, 2vw, 1.25rem);
		height: clamp(1rem, 2vw, 1.25rem);
	}
`;

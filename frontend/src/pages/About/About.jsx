import { Users, Zap, Shield, TrendingUp, Heart, Target } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import {
  AboutContainer,
  AboutSection,
  AboutHeader,
  AboutTitle,
  AboutSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIconBox,
  FeatureTitle,
  FeatureText,
  HowItWorksCard,
  HowItWorksTitle,
  HowItWorksGrid,
  HowItWorksStep,
  StepCircle,
  StepTitle,
  StepDesc,
  CTASection,
  CTATitle,
  CTASubtitle,
  CTAButtonRow,
  AboutFooter,
  AboutFooterText
} from './styledComponents';

/**
 * About Page
 * Information about the application and team
 */

const About = () => {
  // Removed inline styles, using styled-components instead

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Make group decisions in seconds instead of endless debates. Our algorithm processes constraints instantly.',
      color: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Fair to Everyone',
      description: 'Historical fairness tracking ensures no one is consistently ignored. Everyone gets their turn.',
      color: '#10b981',
    },
    {
      icon: TrendingUp,
      title: 'Smart Algorithm',
      description: 'Multi-criteria constraint satisfaction considers budget, location, preferences, and dietary needs.',
      color: '#0ea5e9',
    },
    {
      icon: Target,
      title: 'Transparent',
      description: 'See exactly why each decision was made with detailed reasoning and scoring breakdowns.',
      color: '#8b5cf6',
    },
    {
      icon: Users,
      title: 'Group Focused',
      description: 'Designed for teams, friends, and families. Perfect for any group that needs to make decisions together.',
      color: '#ec4899',
    },
    {
      icon: Heart,
      title: 'Easy to Use',
      description: 'Beautiful, intuitive interface. No training required. Just create a group and start deciding.',
      color: '#ef4444',
    },
  ];

  return (
    <AboutContainer>
      <AboutSection>
        <AboutHeader>
          <AboutTitle>About Decision Resolver</AboutTitle>
          <AboutSubtitle>
            We're on a mission to eliminate group indecision and make collaborative
            decision-making effortless, fair, and instant.
          </AboutSubtitle>
        </AboutHeader>

        {/* Features */}
        <FeatureGrid>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} as={FeatureCard}>
                <FeatureIconBox style={{ backgroundColor: `${feature.color}20` }}>
                  <Icon style={{ width: '2rem', height: '2rem', color: feature.color }} />
                </FeatureIconBox>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureText>{feature.description}</FeatureText>
              </Card>
            );
          })}
        </FeatureGrid>

        {/* How It Works */}
        <Card as={HowItWorksCard}>
          <HowItWorksTitle>How It Works</HowItWorksTitle>
          <HowItWorksGrid>
            {[
              {
                step: '1',
                title: 'Create or Join Group',
                desc: 'Start a group or join one with an invite code',
              },
              {
                step: '2',
                title: 'Submit Constraints',
                desc: 'Everyone adds their budget, preferences, and requirements',
              },
              {
                step: '3',
                title: 'Get Decision',
                desc: 'Algorithm finds the best option instantly with reasoning',
              },
            ].map((item) => (
              <HowItWorksStep key={item.step}>
                <StepCircle>{item.step}</StepCircle>
                <StepTitle>{item.title}</StepTitle>
                <StepDesc>{item.desc}</StepDesc>
              </HowItWorksStep>
            ))}
          </HowItWorksGrid>
        </Card>

        {/* CTA */}
        <CTASection>
          <CTATitle>Ready to Make Better Decisions?</CTATitle>
          <CTASubtitle>Join thousands of groups making smarter decisions every day</CTASubtitle>
          <CTAButtonRow>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="lg" style={{ color: 'white', borderColor: 'white' }}>
                Learn More
              </Button>
            </Link>
          </CTAButtonRow>
        </CTASection>

        {/* Footer */}
        <AboutFooter>
          <p>Built with ❤️ for National Level Hackathon 2024</p>
          <AboutFooterText>Powered by MERN Stack & Advanced Algorithms</AboutFooterText>
        </AboutFooter>
      </AboutSection>
    </AboutContainer>
  );
};

export default About;
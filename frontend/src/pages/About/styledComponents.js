import styled from "styled-components";

export const AboutContainer = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`;

export const AboutSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

export const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const AboutTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
`;

export const AboutSubtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 48rem;
  margin: 0 auto;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const FeatureIconBox = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #111827;
`;

export const FeatureText = styled.p`
  color: #6b7280;
  line-height: 1.7;
`;

export const HowItWorksCard = styled.div`
  padding: 3rem;
  margin-bottom: 4rem;
`;

export const HowItWorksTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

export const HowItWorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const HowItWorksStep = styled.div`
  text-align: center;
`;

export const StepCircle = styled.div`
  width: 3rem;
  height: 3rem;
  background: #0ea5e9;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
`;

export const StepTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const StepDesc = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

export const CTASection = styled.div`
  background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
  border-radius: 1rem;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const CTASubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

export const CTAButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const AboutFooter = styled.div`
  text-align: center;
  margin-top: 4rem;
  color: #9ca3af;
`;

export const AboutFooterText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

import { Users, Heart, Mail, Github, Linkedin, Instagram, MapPin, Phone, Send, ExternalLink } from 'lucide-react';
import styled from 'styled-components';
import { useState } from 'react';

/**
 * Footer Component
 * Professional site footer with links, social media, contact, and newsletter
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        {/* Main Footer - Single Row */}
        <FooterRowContainer>
          <BrandColumn>
            <FooterBrand>
              <BrandIcon>
                <Users />
              </BrandIcon>
              <BrandText>Decision Resolver</BrandText>
            </FooterBrand>
            
            <BrandDesc>
              Making group decisions effortless, fair, and transparent for everyone.
            </BrandDesc>
          </BrandColumn>
          
          <ContactSection>
            <ContactItem href="mailto:contact@decisionresolver.com">
              <Mail size={16} />
              contact@decisionresolver.com
            </ContactItem>
            <ContactItem href="tel:+1234567890">
              <Phone size={16} />
              +1 (234) 567-890
            </ContactItem>
            <ContactItem>
              <MapPin size={16} />
              India, Asia
            </ContactItem>
          </ContactSection>

          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
              <Github size={20} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <Linkedin size={20} />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
              <Instagram size={20} />
            </SocialLink>
            <SocialLink href="mailto:contact@decisionresolver.com" title="Email" aria-label="Email">
              <Mail size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterRowContainer>

        {/* Footer Bottom */}
        <FooterCopyright>
          <span>© {currentYear} Decision Resolver.</span>
          <span>Built with <Heart size={14} className="inline" /> for Hackathon</span>
        </FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background: #242424;
  color: #cbd5e1;
  border-top: 1px solid #1e293b;
  margin-top: auto;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: clamp(2.5rem, 5vw, 4rem) 0;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
`;

const NewsletterSection = styled.div`
  background: rgba(79, 70, 229, 0.08);
  border: 1px solid rgba(79, 70, 229, 0.3);
  border-radius: 1rem;
  padding: clamp(2rem, 4vw, 3rem);
  margin-bottom: clamp(3rem, 5vw, 4rem);
  backdrop-filter: blur(10px);
  margin-left: -clamp(1rem, 4vw, 2rem);
  margin-right: -clamp(1rem, 4vw, 2rem);
  padding-left: clamp(2rem, 6vw, 3rem);
  padding-right: clamp(2rem, 6vw, 3rem);
`;

const NewsletterContent = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const NewsletterTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const NewsletterDesc = styled.p`
  color: #94a3b8;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.3);
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #64748b;
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: #4f46e5;
  }
`;

const NewsletterButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4338ca;
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.p`
  color: #10b981;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  margin-bottom: clamp(3rem, 5vw, 4rem);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  }
  
  @media (min-width: 1280px) {
    gap: clamp(3rem, 8vw, 5rem);
  }
`;

const FooterRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 0 1 auto;
  min-width: 280px;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    border-bottom: 1px solid rgba(79, 70, 229, 0.2);
    padding-bottom: 1.5rem;
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const BrandIcon = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandText = styled.span`
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 700;
  color: #fff;
`;

const BrandDesc = styled.p`
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  flex: 0 1 auto;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  border: none;
  margin: 0;
  flex: 0 1 auto;
  min-width: 180px;
`;

const ContactTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #4f46e5;
  }
  
  svg {
    color: #4f46e5;
    flex-shrink: 0;
    width: 0.9rem;
    height: 0.9rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0;
  border: none;
  flex-wrap: wrap;
  flex: 0 1 auto;
`;

const SocialLink = styled.a`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(79, 70, 229, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, #4f46e5, #7c3aed);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    background: #4f46e5;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
    border-color: #7c3aed;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const FooterColumnTitle = styled.h3`
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, #4f46e5, transparent);
    border-radius: 1px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #4f46e5;
    padding-left: 0.25rem;
  }
`;

export const FooterText = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
`;

const FooterBottom = styled.div`
  padding-top: clamp(2rem, 3vw, 2.5rem);
  border-top: 1px solid #1e293b;
`;

const FooterCopyright = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(79, 70, 229, 0.2);
  width: 100%;
  flex-wrap: wrap;
  
  svg {
    color: #ef4444;
    width: 0.9rem;
    height: 0.9rem;
  }
`;

const FooterBadges = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid #1e293b;
`;

const Badge = styled.span`
  font-size: 0.85rem;
  color: #94a3b8;
  background: rgba(79, 70, 229, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(79, 70, 229, 0.2);
`;

export default Footer;
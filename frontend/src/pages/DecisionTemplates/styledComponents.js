import styled from "styled-components";

export const TemplatesContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
  padding: clamp(1rem, 4vw, 2rem) 0;
`;

export const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
`;

export const Header = styled.div`
  margin-bottom: clamp(2rem, 5vw, 3rem);
  width: 100%;

  h1 {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: #5c7c89;
    font-size: clamp(0.95rem, 3vw, 1.1rem);
    margin: 0;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  font-size: clamp(0.95rem, 3vw, 1.1rem);
  color: #5c7c89;
  margin: 0;
  font-weight: 400;
`;

export const SearchContainer = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(31, 73, 89, 0.3);
  color: #ffffff;
  background-position: 0.75rem center;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.8);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    background-color: rgba(31, 73, 89, 0.5);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const CategoryButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;

    &:hover {
      background: #94a3b8;
    }
  }
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background-color: ${(props) =>
    props.$active ? "rgba(99, 102, 241, 0.8)" : "rgba(31, 73, 89, 0.4)"};
  color: ${(props) => (props.$active ? "white" : "#cbd5e1")};
  border-color: ${(props) =>
    props.$active ? "rgba(99, 102, 241, 0.8)" : "rgba(92, 124, 137, 0.5)"};

  &:hover {
    ${(props) =>
      props.$active
        ? "background-color: rgba(79, 70, 229, 1); border-color: rgba(79, 70, 229, 1);"
        : "background-color: rgba(31, 73, 89, 0.6); border-color: rgba(92, 124, 137, 0.8);"}
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const SectionHeader = styled.div`
  display: block;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;

  h2 {
    font-size: clamp(1.3rem, 4vw, 1.75rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const TemplateCard = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  &:hover {
    background: rgba(31, 73, 89, 0.6);
    box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
    transform: translateY(-6px);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const CardGradientBar = styled.div`
  height: 4px;
  background: linear-gradient(to right, var(--gradient));
`;

export const CardContent = styled.div`
  padding: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const IconBadge = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--gradient));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  flex-shrink: 0;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const PopularBadge = styled.span`
  background: linear-gradient(135deg, #fef08a 0%, #fcd34d 100%);
  color: #854d0e;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    fill: #fcd34d;
  }
`;

export const CardDescription = styled.p`
  color: #cbd5e1;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
  flex: 1;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const Tag = styled.span`
  font-size: 0.8rem;
  background: rgba(92, 124, 137, 0.3);
  color: #cbd5e1;
  padding: 0.35rem 0.65rem;
  border-radius: 0.35rem;
  font-weight: 500;
  border: 1px solid rgba(92, 124, 137, 0.5);
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(92, 124, 137, 0.3);
  margin-top: auto;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #94a3b8;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const UseButton = styled.button`
  padding: 0.65rem 1.25rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  font-weight: 600;
  border-radius: 0.65rem;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  border: 2px dashed rgba(92, 124, 137, 0.5);
  padding: 4rem 2rem;
  text-align: center;
  margin: 2rem 0;

  svg {
    width: 4rem;
    height: 4rem;
    color: rgba(92, 124, 137, 0.6);
    margin: 0 auto 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #cbd5e1;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #94a3b8;
    margin: 0;
    font-size: 0.95rem;
  }
`;

export const CTASection = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 1rem;
  padding: 3rem 2rem;
  color: white;
  text-align: center;
  margin: 3rem 0 0 0;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);

  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    h3 {
      font-size: 1.35rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 2rem;
    font-weight: 600;
    border-radius: 0.75rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;

    &:first-child {
      background: white;
      color: #6366f1;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }

    &:last-child {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

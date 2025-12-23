import styled from "styled-components";
export const InviteActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  flex-wrap: nowrap;
  width: auto;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
  
  button, a {
    min-width: 0;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
      flex: 1;
      min-width: auto;
    }
    
    @media (max-width: 640px) {
      width: 100%;
      flex: 1;
    }
  }
`;

export const EmptyCard = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  border: 2px solid rgba(92, 124, 137, 0.5);
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.2);
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 640px) {
    padding: 3rem 2rem;
  }
  
  a {
    width: 100%;
    display: block;
    
    button {
      width: 100%;
    }
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #ffffff;
`;

export const EmptyDescription = styled.p`
  margin-bottom: 24px;
  color: #5c7c89;
`;

export const DecisionHeaderRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 8px;
  align-items: center;
`;

export const DecisionTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  color: #ffffff;
`;

export const DecisionStatus = styled.span`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ status }) =>
    status === "completed"
      ? "#d1fae5"
      : status === "processing"
      ? "#fef3c7"
      : "#e0f2fe"};
  color: ${({ status }) =>
    status === "completed"
      ? "#065f46"
      : status === "processing"
      ? "#92400e"
      : "#0369a1"};
`;

export const DecisionCategory = styled.p`
  font-size: 0.95rem;
  margin-bottom: 12px;
  color: #5c7c89;
`;

export const DecisionInfoRow = styled.div`
  display: flex;
  font-size: 0.85rem;
  color: #5c7c89;
  gap: 1rem;
`;

export const DecisionStatusIconCompleted = styled(({ className }) => (
  <span className={className}>
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#059669"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  </span>
))``;
export const DecisionStatusIconProcessing = styled(({ className }) => (
  <span className={className}>
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="#d97706"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  </span>
))``;

export const MembersTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: #ffffff;
`;

export const MemberActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const InfoText = styled.span`
  font-size: 1rem;
  color: #5c7c89;
`;

export const DecisionTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const DecisionStatusColumn = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const TabContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
`;

export const MemberTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const YouSpan = styled.span`
  color: #5c7c89;
  font-size: 0.95rem;
  margin-left: 8px;
`;

export const ModalStrong = styled.strong`
  font-weight: bold;
`;
export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
  
  @media (max-width: 1024px) {
    gap: 0.75rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

export const FlexStart = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 0 1 50%;
  min-width: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    flex: 1;
    flex-shrink: 1;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    flex: 1;
    flex-shrink: 1;
  }
`;

export const AvatarBox = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
  word-break: break-word;
  line-height: 1.2;
  max-width: 100%;
  
  @media (max-width: 768px) {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
  }
  
  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

export const Description = styled.p`
  color: #5c7c89;
  margin-bottom: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #5c7c89;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const InviteCodeBox = styled.code`
  font-size: 1.25rem;
  font-family: monospace;
  font-weight: bold;
  background: rgba(31, 73, 89, 0.3);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

export const Section = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(92, 124, 137, 0.3);
`;

export const TabContent = styled.div``;

export const MemberCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(92, 124, 137, 0.15);
  border-radius: 0.75rem;
  gap: 0.5rem;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
  
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const MemberAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
`;

export const MemberName = styled.p`
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MemberEmail = styled.p`
  font-size: 0.95rem;
  color: #5c7c89;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MemberRole = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #e6fffa;
  color: #319795;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const MemberJoined = styled.span`
  font-size: 0.8rem;
  color: #a0aec0;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalText = styled.p`
  color: #718096;
`;

export const ModalSubText = styled.p`
  font-size: 0.95rem;
  color: #a0aec0;
`;

export const ModalButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const GroupDetailsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 8px;
  background: rgba(92, 124, 137, 0.2);
  color: #5c7c89;
  font-weight: 500;
  border: 2px solid #5c7c89;
  cursor: pointer;
  transition: all 0.2s;
  &:hover,
  &[aria-selected="true"] {
    background: rgba(92, 124, 137, 0.4);
    color: #ffffff;
    border-color: #ffffff;
  }
`;

export const InfoBox = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
  border: 2px solid rgba(92, 124, 137, 0.5);
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #5c7c89;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0;
  transition: color 0.2s;
  &:hover {
    color: #00796b;
  }
`;

export const CardBox = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
  border: 2px solid rgba(92, 124, 137, 0.5);
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
  justify-content: flex-start;
  flex: 0 1 50%;
  width: auto;
  box-sizing: border-box;
  margin-top: 0;
  
  a {
    text-decoration: none;
    display: inline-flex;
  }
  
  @media (max-width: 1024px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0;
    flex-shrink: 1;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    a {
      width: 100%;
    }
  }
  
  button, a {
    min-width: 0;
    
    @media (max-width: 768px) {
      flex: 1;
    }
    
    @media (max-width: 640px) {
      width: 100%;
      flex: 1;
    }
  }
`;

export const InviteLabel = styled.label`
  font-weight: 600;
  color: #ffffff;
  font-size: 1rem;
  display: block;
`;

export const InviteSubLabel = styled.p`
  color: #5c7c89;
  font-size: 0.95rem;
  margin: 0.25rem 0 0 0;
`;

export const HeaderTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
`;

export const InviteTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;
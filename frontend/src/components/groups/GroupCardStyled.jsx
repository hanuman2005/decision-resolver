import styled from "styled-components";

export const GroupCardFlex = styled.div`
  flex: 1;
`;

export const GroupCardIconLarge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  svg {
    width: 24px;
    height: 24px;
    color: #fff;
  }
`;

export const GroupCardIconSmall = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const GroupCardInviteLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

export const GroupCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GroupCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const GroupCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.25rem;
`;

export const GroupCardDesc = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const GroupCardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009688, #00796b);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
`;

export const GroupCardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.95rem;
`;

export const GroupCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
`;

export const GroupCardInvite = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InviteCode = styled.code`
  font-size: 0.95rem;
  font-family: monospace;
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 6px;
`;

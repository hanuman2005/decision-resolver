import styled from "styled-components";

export const GroupListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const EmptyIcon = styled.div`
  margin: 0 auto 1rem;
  svg {
    width: 64px;
    height: 64px;
    color: #bdbdbd;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5rem;
`;

export const EmptyText = styled.p`
  color: #666;
`;

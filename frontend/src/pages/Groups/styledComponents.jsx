import styled from "styled-components";

export const GroupsContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
	padding: clamp(1.5rem, 5vw, 2.5rem) 0;
`;

export const MainContent = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	padding: clamp(1rem, 4vw, 2rem);
`;

export const Header = styled.header`
	margin-bottom: clamp(2rem, 5vw, 3rem);
`;

export const Title = styled.h1`
	font-size: clamp(1.75rem, 6vw, 2.5rem);
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 0.75rem;
	letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
	color: #5c7c89;
	font-size: clamp(0.95rem, 2vw, 1.1rem);
	line-height: 1.5;
`;

export const ActionsBar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: clamp(2rem, 5vw, 3rem);
	box-sizing: border-box;
	width: 100%;
	
	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
	}
`;

export const SearchInput = styled.input`
	flex: 1;
	min-width: 0;
`;

export const ActionsRow = styled.div`
	display: flex;
	gap: 0.75rem;
	flex-wrap: wrap;
	width: 100%;
	box-sizing: border-box;
	
	@media (min-width: 768px) {
		width: auto;
		flex-wrap: nowrap;
	}
`;

export const GroupsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: clamp(1.25rem, 3vw, 2rem);
	
	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}
	
	@media (min-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const GroupCard = styled.div`
	cursor: pointer;
	transition: all 0.2s ease;
`;

export const GroupCardHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const GroupCardInfo = styled.div`
	flex: 1;
	min-width: 0;
`;

export const GroupTitle = styled.h3`
	font-size: clamp(1.1rem, 2vw, 1.35rem);
	font-weight: 600;
	color: #0f172a;
	margin-bottom: 0.5rem;
	word-break: break-word;
`;

export const GroupDesc = styled.p`
	color: #64748b;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	line-height: 1.4;
	margin-bottom: 0;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const GroupCardAvatar = styled.div`
	width: 2.75rem;
	height: 2.75rem;
	background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
	border-radius: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	
	& svg {
		color: #fff;
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export const GroupCardMeta = styled.div`
	display: flex;
	gap: 1.5rem;
	padding: 1rem 0;
	border-top: 1px solid #e2e8f0;
	border-bottom: 1px solid #e2e8f0;
	font-size: 0.95rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
	
	@media (max-width: 640px) {
		gap: 1rem;
	}
`;

export const GroupMeta = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #64748b;
	font-size: clamp(0.85rem, 1.5vw, 0.95rem);
	
	& svg {
		width: 1.1rem;
		height: 1.1rem;
		color: #4f46e5;
	}
`;

export const GroupCardFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	flex-wrap: wrap;
`;

export const GroupCardInviteLabel = styled.span`
	color: #94a3b8;
	font-size: 0.85rem;
	font-weight: 500;
`;

export const GroupCode = styled.span`
	background: linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 100%);
	color: #0277bd;
	font-weight: 600;
	padding: 0.35rem 0.75rem;
	border-radius: 0.5rem;
	font-size: 0.85rem;
	font-family: 'Monaco', 'Courier New', monospace;
	letter-spacing: 0.05em;
`;

export const EmptyCard = styled.div`
	text-align: center;
	padding: clamp(2.5rem, 5vw, 4rem);
	background: #fff;
	border-radius: 1rem;
	box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
	border: 1px solid #e2e8f0;
	margin-bottom: clamp(1.5rem, 3vw, 2rem);
	
	& svg {
		width: 3rem;
		height: 3rem;
		color: #4f46e5;
		margin: 0 auto 1.5rem;
		opacity: 0.8;
	}
`;

export const EmptyText = styled.p`
	color: #64748b;
	font-size: clamp(0.95rem, 2vw, 1.1rem);
	margin-bottom: 1.5rem;
	line-height: 1.5;
`;

export const EmptyTextCount = styled.p`
	color: #64748b;
	font-size: clamp(0.9rem, 1.5vw, 1rem);
	margin-bottom: 1.5rem;
	font-weight: 500;
`;

export const EmptyActions = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
`;

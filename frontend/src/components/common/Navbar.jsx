import React from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { Home as HomeIcon, Users as GroupsIcon, User as ProfileIcon, LogOut as LogoutIcon, Menu as MenuIcon, X as XIcon, BarChart3, UserPlus } from 'lucide-react';
import { NotificationBell } from './NotificationBell';

const NavbarContainer = styled.nav`
	width: 100%;
	background: linear-gradient(90deg, #011425 0%, #1f4959 100%);
	padding: 0.75rem 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: sticky;
	top: 0;
	z-index: 50;
	box-shadow: 0 8px 16px rgba(1, 20, 37, 0.4);
	flex-wrap: nowrap;
	min-height: 64px;
	box-sizing: border-box;
	
	@media (min-width: 768px) {
		padding: 0.875rem 1.5rem;
	}
	
	@media (min-width: 1024px) {
		padding: 1rem 2rem;
	}
`;

const LogoContainer = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: inherit;
	gap: 0.5rem;
	flex-shrink: 0;
	
	&:hover {
		opacity: 0.9;
	}
`;

const LogoIcon = styled.div`
	width: 32px;
	height: 32px;
	background: linear-gradient(135deg, #5c7c89 0%, #ffffff 100%);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	color: #fff;
	font-size: 1.1rem;
	flex-shrink: 0;
`;

const LogoText = styled.span`
	font-size: 1.15rem;
	font-weight: 700;
	background: linear-gradient(135deg, #5c7c89 0%, #ffffff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	display: none;
	
	@media (min-width: 640px) {
		display: block;
	}
`;

const DesktopMenu = styled.div`
	display: none;
	align-items: center;
	gap: 0rem;
	margin-left: auto;
	flex-shrink: 0;
	min-width: fit-content;
	
	@media (min-width: 1024px) {
		display: flex;
	}
`;

const StyledLink = styled(Link)`
	color: #5c7c89;
	padding: 0.4rem 0.6rem;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.85rem;
	display: flex;
	align-items: center;
	gap: 0.3rem;
	border-radius: 8px;
	transition: all 0.2s ease;
	white-space: nowrap;
	flex-shrink: 0;
	
	svg {
		width: 16px;
		height: 16px;
	}
	
	&:hover {
		background: rgba(92, 124, 137, 0.1);
		color: #ffffff;
		transform: translateY(-1px);
	}
`;

const StyledRegisterLink = styled(Link)`
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	padding: 0.4rem 1rem;
	border-radius: 8px;
	margin-left: 0.3rem;
	font-weight: 600;
	text-decoration: none;
	font-size: 0.85rem;
	transition: all 0.2s ease;
	white-space: nowrap;
	box-shadow: 0 2px 8px rgba(31, 73, 89, 0.3);
	flex-shrink: 0;
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(31, 73, 89, 0.4);
	}
`;

const StyledLogoutButton = styled.button`
	background: transparent;
	border: none;
	color: #5c7c89;
	padding: 0.4rem 0.6rem;
	font-weight: 500;
	font-size: 0.85rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.3rem;
	border-radius: 8px;
	transition: all 0.2s ease;
	white-space: nowrap;
	flex-shrink: 0;
	
	svg {
		width: 16px;
		height: 16px;
	}
	
	&:hover {
		background: rgba(244, 63, 94, 0.1);
		color: #ff6b7a;
		transform: translateY(-1px);
	}
`;

const UserAvatarWrapper = styled.div`
	position: relative;
	margin-left: 0.75rem;
	flex-shrink: 0;
	display: flex;
	align-items: center;
`;

const UserAvatar = styled.img`
	width: 38px;
	height: 38px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid #5c7c89;
	cursor: pointer;
	transition: all 0.2s ease;
	flex-shrink: 0;
	
	&:hover {
		border-color: #ffffff;
		transform: scale(1.05);
		box-shadow: 0 0 0 3px rgba(92, 124, 137, 0.2);
	}
`;

const UserAvatarFallback = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 0.9rem;
	border: 2px solid #5c7c89;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 0 0 3px rgba(92, 124, 137, 0.2);
	}
`;

const MobileNotificationBell = styled.div`
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-right: 0.25rem;
	
	@media (min-width: 1024px) {
		display: none;
	}
`;

const MobileMenuButton = styled.button`
	background: none;
	border: none;
	color: #5c7c89;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 0.5rem;
	border-radius: 8px;
	transition: all 0.2s ease;
	flex-shrink: 0;
	
	@media (min-width: 1024px) {
		display: none;
	}
	
	svg {
		width: 24px;
		height: 24px;
	}
	
	&:hover {
		background: rgba(92, 124, 137, 0.1);
	}
	
	&:active {
		transform: scale(0.95);
	}
`;

const MobileMenuContainer = styled.div`
	position: fixed;
	top: 63px;
	left: 0;
	right: 0;
	background: linear-gradient(135deg, #011425 0%, #1f4959 100%);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
	border-top: 2px solid #5c7c89;
	z-index: 100;
	animation: slideDown 0.2s ease;
	
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

const MobileMenuLinks = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	gap: 0.5rem;
	max-height: calc(100vh - 100px);
	overflow-y: auto;
`;

const MobileStyledLink = styled(Link)`
	color: #5c7c89;
	padding: 0.875rem 1rem;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.95rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	border-radius: 8px;
	transition: all 0.2s ease;
	
	svg {
		width: 20px;
		height: 20px;
	}
	
	&:hover {
		background: rgba(92, 124, 137, 0.1);
		color: #ffffff;
	}
	
	&:active {
		transform: scale(0.98);
	}
`;

const MobileStyledRegisterLink = styled(Link)`
	background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
	color: #ffffff;
	padding: 0.875rem 1rem;
	border-radius: 8px;
	font-weight: 600;
	font-size: 0.95rem;
	text-decoration: none;
	transition: all 0.2s ease;
	text-align: center;
	box-shadow: 0 2px 8px rgba(31, 73, 89, 0.3);
	
	&:hover {
		box-shadow: 0 4px 12px rgba(31, 73, 89, 0.4);
	}
	
	&:active {
		transform: scale(0.98);
	}
`;

const MobileStyledLogoutButton = styled.button`
	background: transparent;
	border: 1px solid #ff6b7a;
	color: #ff6b7a;
	padding: 0.875rem 1rem;
	font-weight: 500;
	font-size: 0.95rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	border-radius: 8px;
	width: 100%;
	transition: all 0.2s ease;
	
	svg {
		width: 20px;
		height: 20px;
	}
	
	&:hover {
		background: rgba(255, 107, 122, 0.1);
	}
	
	&:active {
		transform: scale(0.98);
	}
`;

const MobileUserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 1rem;
	background: #f8fafc;
	border-radius: 8px;
	margin-bottom: 0.5rem;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		background: #f1f5f9;
	}
`;

const MobileUserAvatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid #e2e8f0;
	flex-shrink: 0;
`;

const MobileUserAvatarFallback = styled.div`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 1.2rem;
	border: 2px solid #e2e8f0;
	flex-shrink: 0;
`;

const MobileUserDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.125rem;
	flex: 1;
	min-width: 0;
`;

const MobileUserName = styled.div`
	font-weight: 600;
	color: #0f172a;
	font-size: 0.95rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const MobileUserEmail = styled.div`
	font-size: 0.8rem;
	color: #64748b;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Navbar = () => {
	const { user, logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		setMobileMenuOpen(false);
		navigate('/login');
	};

	const getUserInitials = (name) => {
		if (!name) return 'U';
		const parts = name.trim().split(' ');
		if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
		return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
	};

	return (
		<NavbarContainer>
			<LogoContainer to="/">
				<LogoIcon>DR</LogoIcon>
				<LogoText>Decision Resolver</LogoText>
			</LogoContainer>
			
			<DesktopMenu>
				{isAuthenticated ? (
					<>
						<StyledLink to="/dashboard">
							<HomeIcon /> Dashboard
						</StyledLink>
						<StyledLink to="/groups">
							<GroupsIcon /> Groups
						</StyledLink>
						<StyledLink to="/decisions/templates">
							📋 Templates
						</StyledLink>
						<StyledLink to="/invites">
							<UserPlus /> Invites
						</StyledLink>
						<StyledLink to="/analytics">
							<BarChart3 /> Analytics
						</StyledLink>

						<NotificationBell />

						<StyledLogoutButton onClick={handleLogout}>
							<LogoutIcon /> Logout
						</StyledLogoutButton>
						<UserAvatarWrapper>
							{user?.avatar ? (
								<UserAvatar 
									src={user.avatar} 
									alt={user?.name || 'User'}
									onClick={() => navigate('/profile')}
									title="Go to Profile"
								/>
							) : (
								<UserAvatarFallback
									onClick={() => navigate('/profile')}
									title="Go to Profile"
								>
									{getUserInitials(user?.name)}
								</UserAvatarFallback>
							)}
						</UserAvatarWrapper>
					</>
				) : (
					<>
						<StyledLink to="/login">Login</StyledLink>
						<StyledRegisterLink to="/register">Get Started</StyledRegisterLink>
					</>
				)}
			</DesktopMenu>
			
			{isAuthenticated && (
				<MobileNotificationBell>
					<NotificationBell />
				</MobileNotificationBell>
			)}
			
			<MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
				{mobileMenuOpen ? <XIcon /> : <MenuIcon />}
			</MobileMenuButton>
			
			{mobileMenuOpen && (
				<MobileMenuContainer>
					<MobileMenuLinks>
						{isAuthenticated ? (
							<>
								<MobileUserInfo onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}>
									{user?.avatar ? (
										<MobileUserAvatar 
											src={user.avatar} 
											alt={user?.name || 'User'}
										/>
									) : (
										<MobileUserAvatarFallback>
											{getUserInitials(user?.name)}
										</MobileUserAvatarFallback>
									)}
									<MobileUserDetails>
										<MobileUserName>{user?.name || 'User'}</MobileUserName>
										<MobileUserEmail>{user?.email || 'View Profile'}</MobileUserEmail>
									</MobileUserDetails>
									<ProfileIcon style={{ width: '18px', height: '18px', color: '#64748b' }} />
								</MobileUserInfo>
								
								<MobileStyledLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
									<HomeIcon /> Dashboard
								</MobileStyledLink>
								<MobileStyledLink to="/groups" onClick={() => setMobileMenuOpen(false)}>
									<GroupsIcon /> Groups
								</MobileStyledLink>
								<MobileStyledLink to="/decisions/templates" onClick={() => setMobileMenuOpen(false)}>
									📋 Templates
								</MobileStyledLink>
								<MobileStyledLink to="/invites" onClick={() => setMobileMenuOpen(false)}>
									<UserPlus /> Invites
								</MobileStyledLink>
								<MobileStyledLink to="/analytics" onClick={() => setMobileMenuOpen(false)}>
									<BarChart3 /> Analytics
								</MobileStyledLink>

								<MobileStyledLogoutButton onClick={handleLogout}>
									<LogoutIcon /> Logout
								</MobileStyledLogoutButton>
							</>
						) : (
							<>
								<MobileStyledLink to="/login" onClick={() => setMobileMenuOpen(false)}>
									Login
								</MobileStyledLink>
								<MobileStyledRegisterLink to="/register" onClick={() => setMobileMenuOpen(false)}>
									Get Started
								</MobileStyledRegisterLink>
							</>
						)}
					</MobileMenuLinks>
				</MobileMenuContainer>
			)}
		</NavbarContainer>
	);
};

export default Navbar;
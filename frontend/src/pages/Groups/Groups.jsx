import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';

// ===== ANIMATION VARIANTS =====

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const searchBarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.2
    }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

const actionButtonVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      delay: 0.2 + index * 0.1
    }
  }),
  hover: {
    scale: 1.08,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

const groupCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: index * 0.08
    }
  }),
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: '0 25px 50px rgba(79, 70, 229, 0.2)',
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.98 }
};

const emptyStateVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12
    }
  }
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

import {
  GroupsContainer,
  MainContent,
  Header,
  Title,
  Subtitle,
  ActionsBar,
  GroupsGrid,
  GroupTitle,
  GroupDesc,
  GroupMeta,
  GroupCode,
  EmptyText,
  SearchInput,
  ActionsRow,
  EmptyCard,
  EmptyActions,
  EmptyTextCount,
  GroupCard,
  GroupCardHeader,
  GroupCardInfo,
  GroupCardAvatar,
  GroupCardMeta,
  GroupCardFooter,
  GroupCardInviteLabel
} from './styledComponents.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Plus, Search, Calendar } from 'lucide-react';
import groupService from '../../services/groupService';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';

/**
 * Groups Page
 * Displays all groups the user is a member of
 */

const Groups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const response = await groupService.getMyGroups();
      setGroups(response.data.groups || []);
    } catch (error) {
      toast.error('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  // Filter groups by search term
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading text="Loading groups..." />;
  }

  return (
    <GroupsContainer>
      <MainContent>
        {/* Header */}
        <motion.div variants={headerVariants} initial="hidden" animate="visible">
          <Header>
            <Title>My Groups</Title>
            <Subtitle>Manage your groups and start making decisions together</Subtitle>
          </Header>
        </motion.div>

        {/* Actions Bar */}
        <motion.div variants={searchBarVariants} initial="hidden" animate="visible" whileHover="hover">
          <ActionsBar>
            <Input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              as={SearchInput}
            />
            <ActionsRow>
              <motion.div
                custom={0}
                variants={actionButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/groups/join">
                  <Button variant="outline">
                    <Users />
                    Join Group
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                custom={1}
                variants={actionButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/groups/create">
                  <Button variant="primary">
                    <Plus />
                    Create Group
                  </Button>
                </Link>
              </motion.div>
            </ActionsRow>
          </ActionsBar>
        </motion.div>

        {/* Content */}
        {filteredGroups.length === 0 ? (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
          >
            <EmptyCard>
              <Users />
              <GroupTitle>{searchTerm ? 'No groups found' : 'No groups yet'}</GroupTitle>
              <EmptyText>{searchTerm ? 'Try adjusting your search terms' : 'Create your first group or join an existing one to get started'}</EmptyText>
              {!searchTerm && (
                <EmptyActions>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/groups/create">
                      <Button variant="primary">
                        <Plus />
                        Create Group
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/groups/join">
                      <Button variant="outline">
                        <Users />
                        Join Group
                      </Button>
                    </Link>
                  </motion.div>
                </EmptyActions>
              )}
            </EmptyCard>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
              <EmptyTextCount>Showing {filteredGroups.length} of {groups.length} groups</EmptyTextCount>
            </motion.div>

            <GroupsGrid as={motion.div} variants={gridContainerVariants} initial="hidden" animate="visible">
              {filteredGroups.map((group, index) => (
                <motion.div
                  key={group._id}
                  custom={index}
                  variants={groupCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Card
                    hover
                    onClick={() => navigate(`/groups/${group._id}`)}
                    as={GroupCard}
                  >
                    <GroupCardHeader>
                      <GroupCardInfo>
                        <GroupTitle>{group.name}</GroupTitle>
                        <GroupDesc>{group.description || 'No description provided'}</GroupDesc>
                      </GroupCardInfo>
                      <GroupCardAvatar>
                        <Users />
                      </GroupCardAvatar>
                    </GroupCardHeader>
                    <GroupCardMeta>
                      <GroupMeta>
                        <Users />
                        <span>{group.memberCount} members</span>
                      </GroupMeta>
                      <GroupMeta>
                        <Calendar />
                        <span>{new Date(group.createdAt).toLocaleDateString()}</span>
                      </GroupMeta>
                    </GroupCardMeta>
                    <GroupCardFooter>
                      <GroupCardInviteLabel>Invite Code:</GroupCardInviteLabel>
                      <GroupCode>{group.inviteCode}</GroupCode>
                    </GroupCardFooter>
                  </Card>
                </motion.div>
              ))}
            </GroupsGrid>
          </>
        )}
      </MainContent>
    </GroupsContainer>
  );
};

export default Groups;
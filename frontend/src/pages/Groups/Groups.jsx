import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
        <Header>
          <Title>My Groups</Title>
          <Subtitle>Manage your groups and start making decisions together</Subtitle>
        </Header>
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
            <Link to="/groups/join">
              <Button variant="outline">
                <Users />
                Join Group
              </Button>
            </Link>
            <Link to="/groups/create">
              <Button variant="primary">
                <Plus />
                Create Group
              </Button>
            </Link>
          </ActionsRow>
        </ActionsBar>
        {filteredGroups.length === 0 ? (
          <EmptyCard>
            <Users />
            <GroupTitle>{searchTerm ? 'No groups found' : 'No groups yet'}</GroupTitle>
            <EmptyText>{searchTerm ? 'Try adjusting your search terms' : 'Create your first group or join an existing one to get started'}</EmptyText>
            {!searchTerm && (
              <EmptyActions>
                <Link to="/groups/create">
                  <Button variant="primary">
                    <Plus />
                    Create Group
                  </Button>
                </Link>
                <Link to="/groups/join">
                  <Button variant="outline">
                    <Users />
                    Join Group
                  </Button>
                </Link>
              </EmptyActions>
            )}
          </EmptyCard>
        ) : (
          <>
            <EmptyTextCount>Showing {filteredGroups.length} of {groups.length} groups</EmptyTextCount>
            <GroupsGrid as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {filteredGroups.map((group, index) => (
                <motion.div key={group._id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
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
import { Users } from 'lucide-react';
import GroupCard from './GroupCard';
import {
  GroupListContainer,
  EmptyStateContainer,
  EmptyIcon,
  EmptyTitle,
  EmptyText
} from './styledComponents';

/**
 * Group List Component
 * Displays a grid of group cards
 */

const GroupList = ({ groups, onGroupClick }) => {
  if (!groups || groups.length === 0) {
    return (
      <EmptyStateContainer>
        <EmptyIcon>
          <Users />
        </EmptyIcon>
        <EmptyTitle>No groups found</EmptyTitle>
        <EmptyText>Create or join a group to get started</EmptyText>
      </EmptyStateContainer>
    );
  }

  return (
    <GroupListContainer>
      {groups.map((group) => (
        <GroupCard key={group._id} group={group} onClick={() => onGroupClick(group._id)} />
      ))}
    </GroupListContainer>
  );
};

export default GroupList;
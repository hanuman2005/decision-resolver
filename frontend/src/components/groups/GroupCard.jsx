import { Users, Calendar } from 'lucide-react';
import Card from '../common/Card';
import {
  GroupCardContainer,
  GroupCardHeader,
  GroupCardTitle,
  GroupCardDesc,
  GroupCardIcon,
  GroupCardFooter,
  GroupCardMeta,
  GroupCardInvite,
  InviteCode,
  GroupCardFlex,
  GroupCardIconLarge,
  GroupCardIconSmall,
  GroupCardInviteLabel
} from './GroupCardStyled';

/**
 * Group Card Component
 * Individual group display card
 */

const GroupCard = ({ group, onClick }) => {
  return (
    <Card hover={true} onClick={onClick}>
      <GroupCardContainer>
        <GroupCardHeader>
          <GroupCardFlex>
            <GroupCardTitle>{group.name}</GroupCardTitle>
            <GroupCardDesc>{group.description || 'No description'}</GroupCardDesc>
          </GroupCardFlex>
          <GroupCardIconLarge>
            <Users />
          </GroupCardIconLarge>
        </GroupCardHeader>
        <GroupCardFooter>
          <GroupCardMeta>
            <GroupCardIconSmall>
              <Users />
            </GroupCardIconSmall>
            <span>{group.memberCount} members</span>
          </GroupCardMeta>
          <GroupCardMeta>
            <GroupCardIconSmall>
              <Calendar />
            </GroupCardIconSmall>
            <span>{new Date(group.createdAt).toLocaleDateString()}</span>
          </GroupCardMeta>
        </GroupCardFooter>
        <GroupCardInvite>
          <GroupCardInviteLabel>Invite Code:</GroupCardInviteLabel>
          <InviteCode>{group.inviteCode}</InviteCode>
        </GroupCardInvite>
      </GroupCardContainer>
    </Card>
  );
};

export default GroupCard;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Edit2, Save, X } from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import groupService from '../../services/groupService';
import decisionService from '../../services/decisionService';
import api from '../../services/api';
import toast from 'react-hot-toast';
import {
  ProfileContainer,
  Header,
  Title,
  Subtitle,
  InfoBox,
  ProfileCard,
  ProfileRow,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileSection,
  ProfileLabel,
  ProfileValue,
  ProfileStatsGrid,
  ProfileStatCard,
  ProfileStatTitle,
  ProfileStatValue,
  ProfileEditActions,
  ProfileEditNote
} from './styledComponents.jsx';

/**
 * Profile Page
 * User profile settings and preferences
 */

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalGroups: 0,
    decisionsMade: 0,
    fairnessScore: 0
  });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      // Fetch groups
      const groupResponse = await groupService.getMyGroups();
      const groups = groupResponse.data.groups || [];
      
      // Fetch decisions
      let totalDecisions = 0;
      for (const group of groups) {
        try {
          const decisionsResponse = await decisionService.getDecisionsByGroup(group._id);
          const decisions = decisionsResponse.data.decisions || [];
          totalDecisions += decisions.length;
        } catch (error) {
          console.error('Error fetching decisions:', error);
        }
      }

      // Fetch fairness score
      let fairnessScore = 0;
      try {
        const statsResponse = await api.get('/dashboard/stats');
        console.log('Dashboard stats response:', statsResponse.data);
        
        const avgSatisfaction = statsResponse.data?.data?.avgSatisfaction;
        if (avgSatisfaction !== undefined && avgSatisfaction !== null) {
          // Convert from 0-100 scale to 0-10 scale
          fairnessScore = (avgSatisfaction / 100) * 10;
          console.log('Fairness score calculated:', fairnessScore);
        } else {
          // Default to 7.5 if no satisfaction data but user has groups
          fairnessScore = groups.length > 0 ? 7.5 : 0;
        }
      } catch (error) {
        console.error('Error fetching fairness score:', error);
        fairnessScore = groups.length > 0 ? 7.5 : 0;
      }

      setStats({
        totalGroups: groups.length,
        decisionsMade: totalDecisions,
        fairnessScore: fairnessScore
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
      // Set default values
      setStats({
        totalGroups: 0,
        decisionsMade: 0,
        fairnessScore: 7.5
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ name: formData.name });
      setEditing(false);
    } catch (error) {
      // Error handled by context
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setEditing(false);
  };

  return (
    <ProfileContainer>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Header>
          <Title>Profile Settings</Title>
          <Subtitle>Manage your account information</Subtitle>
        </Header>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <InfoBox>
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <Card as={ProfileCard}>
          <ProfileRow>
            <ProfileAvatar src={user?.avatar} alt={user?.name} />
            <div>
              <ProfileName>{user?.name}</ProfileName>
              <ProfileEmail>{user?.email}</ProfileEmail>
            </div>
            {!editing && (
              <Button variant="outline" onClick={() => setEditing(true)}>
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            )}
          </ProfileRow>

          {editing ? (
            <ProfileSection>
              <Input
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                icon={Mail}
              />
              <ProfileEditNote>Email cannot be changed at this time</ProfileEditNote>
              <ProfileEditActions>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSave}
                  loading={loading}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </ProfileEditActions>
            </ProfileSection>
          ) : (
            <ProfileSection>
              <div>
                <ProfileLabel>Name</ProfileLabel>
                <ProfileValue>{user?.name}</ProfileValue>
              </div>
              <div>
                <ProfileLabel>Email</ProfileLabel>
                <ProfileValue>{user?.email}</ProfileValue>
              </div>
              <div>
                <ProfileLabel>Member Since</ProfileLabel>
                <ProfileValue>{new Date(user?.createdAt).toLocaleDateString()}</ProfileValue>
              </div>
            </ProfileSection>
          )}
            </Card>
          </motion.div>

          {/* Account Stats */}
          <ProfileStatsGrid>
            {[
              { title: 'Total Groups', value: stats.totalGroups },
              { title: 'Decisions Made', value: stats.decisionsMade },
              { title: 'Fairness Score', value: `${stats.fairnessScore.toFixed(1)}/10` }
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}>
                <Card as={ProfileStatCard}>
                  <ProfileStatTitle>{stat.title}</ProfileStatTitle>
                  <ProfileStatValue>{stat.value}</ProfileStatValue>
                </Card>
              </motion.div>
            ))}
          </ProfileStatsGrid>
        </InfoBox>
      </motion.div>
    </ProfileContainer>
  );
};

export default Profile;
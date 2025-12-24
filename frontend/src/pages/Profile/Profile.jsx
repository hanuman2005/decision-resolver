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

// ===== ANIMATION VARIANTS =====

const profileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

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

const profileCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)',
    transition: { duration: 0.3 }
  }
};

const statsCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: index * 0.12
    }
  }),
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: '0 25px 50px rgba(79, 70, 229, 0.2)',
    transition: { duration: 0.3 }
  }
};

const inputFieldVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: index * 0.08
    }
  }),
  hover: {
    scale: 1.01,
    transition: { duration: 0.2 }
  }
};

const buttonGroupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14
    }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

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
          const decisionsResponse = await decisionService.getGroupDecisions(group._id);
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
      <motion.div variants={profileContainerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={headerVariants} initial="hidden" animate="visible">
          <Header>
            <Title>Profile Settings</Title>
            <Subtitle>Manage your account information</Subtitle>
          </Header>
        </motion.div>

        {/* Info Box */}
        <motion.div variants={headerVariants} initial="hidden" animate="visible" custom={1}>
          <InfoBox>
            {/* Profile Card */}
            <motion.div
              variants={profileCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Card as={ProfileCard}>
                <ProfileRow>
                  <ProfileAvatar src={user?.avatar} alt={user?.name} />
                  <div>
                    <ProfileName>{user?.name}</ProfileName>
                    <ProfileEmail>{user?.email}</ProfileEmail>
                  </div>
                  {!editing && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" onClick={() => setEditing(true)}>
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </motion.div>
                  )}
                </ProfileRow>

                {editing ? (
                  <motion.div
                    variants={buttonGroupVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ProfileSection>
                      <motion.div variants={inputFieldVariants} custom={0} initial="hidden" animate="visible" whileHover="hover">
                        <Input
                          label="Name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          icon={User}
                          required
                        />
                      </motion.div>

                      <motion.div variants={inputFieldVariants} custom={1} initial="hidden" animate="visible" whileHover="hover">
                        <Input
                          label="Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          icon={Mail}
                        />
                      </motion.div>

                      <motion.div variants={inputFieldVariants} custom={2} initial="hidden" animate="visible">
                        <ProfileEditNote>Email cannot be changed at this time</ProfileEditNote>
                      </motion.div>

                      <motion.div variants={buttonGroupVariants} initial="hidden" animate="visible">
                        <ProfileEditActions>
                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button
                              variant="outline"
                              fullWidth
                              onClick={handleCancel}
                              disabled={loading}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                          </motion.div>

                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button
                              variant="primary"
                              fullWidth
                              onClick={handleSave}
                              loading={loading}
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </Button>
                          </motion.div>
                        </ProfileEditActions>
                      </motion.div>
                    </ProfileSection>
                  </motion.div>
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
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={statsCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Card as={ProfileStatCard}>
                    <ProfileStatTitle>{stat.title}</ProfileStatTitle>
                    <ProfileStatValue>{stat.value}</ProfileStatValue>
                  </Card>
                </motion.div>
              ))}
            </ProfileStatsGrid>
          </InfoBox>
        </motion.div>
      </motion.div>
    </ProfileContainer>
  );
};

export default Profile;
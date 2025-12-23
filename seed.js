/**
 * MongoDB Seeding Script
 * Run this file to populate the database with sample data
 * Usage: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Import Models
const User = require('./backend/models/User');
const Group = require('./backend/models/Group');
const DecisionSession = require('./backend/models/DecisionSession');
const UserHistory = require('./backend/models/UserHistory');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
}

// Clear existing data (optional)
async function clearDB() {
  try {
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Group.deleteMany({});
    await DecisionSession.deleteMany({});
    await UserHistory.deleteMany({});
    console.log('✅ Database cleared');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  }
}

// Create sample users
async function createUsers() {
  try {
    console.log('👥 Creating users...');
    
    const users = [
      // Real user
      {
        name: 'Madineni Hanumantha Rao',
        email: 'madenenihanumanturao@gmail.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=Madineni+Hanumantha+Rao&background=random',
        preferences: {
          cuisines: ['Indian', 'Italian', 'Asian'],
          avgBudget: 50,
          location: 'Downtown'
        }
      },
      // Real user
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
        preferences: {
          cuisines: ['Italian', 'Asian', 'Mediterranean'],
          avgBudget: 60,
          location: 'Midtown'
        }
      },
      // Sample test users
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        preferences: {
          cuisines: ['Italian', 'Asian', 'Mediterranean'],
          avgBudget: 50,
          location: 'Downtown'
        }
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
        preferences: {
          cuisines: ['Indian', 'Mexican', 'Thai'],
          avgBudget: 60,
          location: 'Midtown'
        }
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random',
        preferences: {
          cuisines: ['American', 'Japanese', 'French'],
          avgBudget: 75,
          location: 'Uptown'
        }
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=random',
        preferences: {
          cuisines: ['Vegan', 'Mediterranean', 'Asian'],
          avgBudget: 45,
          location: 'Downtown'
        }
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=random',
        preferences: {
          cuisines: ['BBQ', 'Mexican', 'Italian'],
          avgBudget: 55,
          location: 'Suburbs'
        }
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} users created`);
    return createdUsers;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    return [];
  }
}

// Create sample groups
async function createGroups(users) {
  try {
    console.log('👫 Creating sample groups...');
    
    if (users.length < 2) {
      console.log('⚠️  Not enough users to create groups');
      return [];
    }

    const groups = [
      {
        name: 'Friends Squad',
        description: 'Weekend hangout group',
        creator: users[0]._id,
        members: [
          { userId: users[0]._id, role: 'admin' },
          { userId: users[1]._id, role: 'member' },
          { userId: users[2]._id, role: 'member' }
        ],
        preferences: {
          cuisines: ['Italian', 'Asian'],
          avgBudget: 50,
          location: 'Downtown'
        }
      },
      {
        name: 'Work Team',
        description: 'Company team for lunch decisions',
        creator: users[1]._id,
        members: [
          { userId: users[1]._id, role: 'admin' },
          { userId: users[3]._id, role: 'member' },
          { userId: users[4]._id, role: 'member' }
        ],
        preferences: {
          cuisines: ['Fast Food', 'Healthy'],
          avgBudget: 35,
          location: 'Office Area'
        }
      },
      {
        name: 'Movie Night Crew',
        description: 'Group for movie and activity planning',
        creator: users[2]._id,
        members: [
          { userId: users[0]._id, role: 'member' },
          { userId: users[2]._id, role: 'admin' },
          { userId: users[3]._id, role: 'member' },
          { userId: users[4]._id, role: 'member' }
        ]
      }
    ];

    const createdGroups = await Group.insertMany(groups);
    console.log(`✅ ${createdGroups.length} groups created`);
    return createdGroups;
  } catch (error) {
    console.error('❌ Error creating groups:', error);
    return [];
  }
}

// Create sample decisions
async function createDecisions(groups, users) {
  try {
    console.log('🎯 Creating sample decisions...');
    
    if (groups.length < 1 || users.length < 2) {
      console.log('⚠️  Not enough groups/users to create decisions');
      return [];
    }

    const decisions = [
      {
        groupId: groups[0]._id,
        title: 'Where should we eat this Friday?',
        category: 'food',
        status: 'completed',
        options: [
          {
            name: 'Italian Pasta House',
            description: 'Classic Italian cuisine',
            tags: ['Italian', 'Pasta', '$$'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Italian+Restaurant'
          },
          {
            name: 'Sushi Paradise',
            description: 'Fresh Japanese sushi',
            tags: ['Japanese', 'Sushi', '$$$'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Sushi+Bar'
          },
          {
            name: 'Burger Barn',
            description: 'American burgers',
            tags: ['American', 'Burgers', '$'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Burger+Place'
          }
        ],
        constraints: [
          {
            userId: users[0]._id,
            budget: { min: 30, max: 60 },
            preferences: ['Italian', 'Pasta'],
            distance: 2
          },
          {
            userId: users[1]._id,
            budget: { min: 40, max: 80 },
            preferences: ['Asian', 'Sushi'],
            distance: 3
          }
        ],
        createdAt: new Date(Date.now() - 7*24*60*60*1000),
        deadline: new Date(Date.now() - 6*24*60*60*1000)
      },
      {
        groupId: groups[1]._id,
        title: 'Which movie should we watch?',
        category: 'movie',
        status: 'completed',
        options: [
          {
            name: 'The Action Hero',
            description: 'Epic action blockbuster',
            tags: ['Action', 'Adventure'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Action+Movie'
          },
          {
            name: 'Love Story',
            description: 'Romantic drama',
            tags: ['Romance', 'Drama'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Romance+Movie'
          },
          {
            name: 'Mystery Thriller',
            description: 'Suspenseful mystery',
            tags: ['Thriller', 'Mystery'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Thriller+Movie'
          }
        ],
        constraints: [
          {
            userId: users[1]._id,
            budget: { min: 15, max: 30 },
            preferences: ['Action', 'Adventure'],
            distance: 0
          },
          {
            userId: users[3]._id,
            budget: { min: 10, max: 25 },
            preferences: ['Romance', 'Drama'],
            distance: 0
          }
        ],
        createdAt: new Date(Date.now() - 5*24*60*60*1000),
        deadline: new Date(Date.now() - 4*24*60*60*1000)
      },
      {
        groupId: groups[0]._id,
        title: 'Next weekend activity?',
        category: 'activity',
        status: 'collecting',
        options: [
          {
            name: 'Hiking',
            description: 'Mountain hiking adventure',
            tags: ['Outdoor', 'Sports'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Hiking'
          },
          {
            name: 'Bowling',
            description: 'Fun bowling night',
            tags: ['Indoor', 'Entertainment'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Bowling'
          },
          {
            name: 'Museum Visit',
            description: 'Art museum exploration',
            tags: ['Cultural', 'Educational'],
            imageUrl: 'https://via.placeholder.com/300x200?text=Museum'
          }
        ],
        createdAt: new Date(Date.now() - 1*24*60*60*1000),
        deadline: new Date(Date.now() + 3*24*60*60*1000)
      }
    ];

    const createdDecisions = await DecisionSession.insertMany(decisions);
    console.log(`✅ ${createdDecisions.length} decisions created`);
    return createdDecisions;
  } catch (error) {
    console.error('❌ Error creating decisions:', error);
    return [];
  }
}

// Create user history records
async function createUserHistory(groups, users) {
  try {
    console.log('📊 Creating user history records...');
    
    if (groups.length < 1 || users.length < 2) {
      console.log('⚠️  Not enough data to create history');
      return [];
    }

    const history = [
      {
        userId: users[0]._id,
        groupId: groups[0]._id,
        decisionHistory: [
          {
            wasPreferencesMet: true,
            satisfactionScore: 0.85,
            date: new Date(Date.now() - 7*24*60*60*1000)
          },
          {
            wasPreferencesMet: true,
            satisfactionScore: 0.92,
            date: new Date(Date.now() - 5*24*60*60*1000)
          }
        ],
        fairnessMetrics: {
          averageFairnessScore: 0.88,
          preferenceMetCount: 2,
          totalDecisionCount: 2
        }
      },
      {
        userId: users[1]._id,
        groupId: groups[0]._id,
        decisionHistory: [
          {
            wasPreferencesMet: false,
            satisfactionScore: 0.65,
            date: new Date(Date.now() - 7*24*60*60*1000)
          },
          {
            wasPreferencesMet: true,
            satisfactionScore: 0.78,
            date: new Date(Date.now() - 5*24*60*60*1000)
          }
        ],
        fairnessMetrics: {
          averageFairnessScore: 0.71,
          preferenceMetCount: 1,
          totalDecisionCount: 2
        }
      }
    ];

    const createdHistory = await UserHistory.insertMany(history);
    console.log(`✅ ${createdHistory.length} history records created`);
    return createdHistory;
  } catch (error) {
    console.error('❌ Error creating history:', error);
    return [];
  }
}

// Main seeding function
async function seedDatabase() {
  try {
    console.log('\n🌱 Starting database seeding...\n');
    
    await connectDB();
    await clearDB();
    
    const users = await createUsers();
    const groups = await createGroups(users);
    const decisions = await createDecisions(groups, users);
    const history = await createUserHistory(groups, users);
    
    console.log('\n✅ Database seeding completed!\n');
    console.log('📋 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Groups: ${groups.length}`);
    console.log(`   - Decisions: ${decisions.length}`);
    console.log(`   - History Records: ${history.length}`);
    
    console.log('\n👤 Real & Test Users (You can use these to login):');
    console.log('   Real Users:');
    console.log('   1. madenenihanumanturao@gmail.com / Password123!');
    console.log('   2. alice@example.com / Password123!');
    console.log('\n   Test Users:');
    console.log('   3. john@example.com / Password123!');
    console.log('   4. jane@example.com / Password123!');
    console.log('   5. mike@example.com / Password123!');
    console.log('   6. sarah@example.com / Password123!');
    console.log('   7. david@example.com / Password123!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();

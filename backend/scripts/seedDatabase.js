require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import models
const User = require("../models/User");
const Group = require("../models/Group");
const DecisionSession = require("../models/DecisionSession");
const ChatMessage = require("../models/ChatMessage");

async function seedDatabase() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("\n📝 Clearing existing collections...");
    await User.deleteMany({});
    await Group.deleteMany({});
    await DecisionSession.deleteMany({});
    await ChatMessage.deleteMany({});

    // Create admin user (the logged-in user)
    console.log("\n👤 Creating users...");
    const adminUser = new User({
      name: "Madineni Hanumantha Rao",
      email: "madenenihanumanturao@gmail.com",
      password: await bcrypt.hash("Closeone@2005", 10),
      createdAt: new Date(),
    });
    await adminUser.save();
    console.log("✅ Admin user created");

    // Create additional users
    const testUsers = [];
    const userEmails = [
      { name: "Rajesh Kumar", email: "rajesh@example.com" },
      { name: "Priya Sharma", email: "priya@example.com" },
      { name: "Amit Patel", email: "amit@example.com" },
      { name: "Sarah Johnson", email: "sarah@example.com" },
      { name: "John Smith", email: "john@example.com" },
    ];

    for (const userInfo of userEmails) {
      const user = new User({
        name: userInfo.name,
        email: userInfo.email,
        password: await bcrypt.hash("TestPassword@123", 10),
        createdAt: new Date(),
      });
      await user.save();
      testUsers.push(user);
    }
    console.log(`✅ Created ${testUsers.length} additional users`);

    // Create Groups
    console.log("\n👥 Creating groups...");

    const groups = [];

    // Group 1: Tech Startup Team
    const group1 = new Group({
      name: "Tech Innovation Team",
      description: "A team of tech enthusiasts planning the next big startup",
      creator: adminUser._id,
      members: [
        { userId: adminUser._id, role: "admin" },
        { userId: testUsers[0]._id, role: "member" },
        { userId: testUsers[1]._id, role: "member" },
      ],
      createdAt: new Date(),
    });
    await group1.save();
    groups.push(group1);

    // Group 2: Vacation Planning
    const group2 = new Group({
      name: "Summer Vacation Crew",
      description: "Planning an epic summer trip for the friends",
      creator: testUsers[0]._id,
      members: [
        { userId: testUsers[0]._id, role: "admin" },
        { userId: adminUser._id, role: "member" },
        { userId: testUsers[2]._id, role: "member" },
        { userId: testUsers[3]._id, role: "member" },
      ],
      createdAt: new Date(),
    });
    await group2.save();
    groups.push(group2);

    // Group 3: Office Team
    const group3 = new Group({
      name: "Marketing Department",
      description: "Marketing team collaborating on Q1 2025 strategy",
      creator: testUsers[1]._id,
      members: [
        { userId: testUsers[1]._id, role: "admin" },
        { userId: testUsers[4]._id, role: "member" },
        { userId: adminUser._id, role: "member" },
      ],
      createdAt: new Date(),
    });
    await group3.save();
    groups.push(group3);

    // Group 4: Project Team
    const group4 = new Group({
      name: "Web Development Project",
      description: "Team building the next generation web platform",
      creator: adminUser._id,
      members: [
        { userId: adminUser._id, role: "admin" },
        { userId: testUsers[0]._id, role: "member" },
        { userId: testUsers[2]._id, role: "member" },
        { userId: testUsers[4]._id, role: "member" },
      ],
      createdAt: new Date(),
    });
    await group4.save();
    groups.push(group4);

    console.log(`✅ Created ${groups.length} groups`);

    // Create Decisions
    console.log("\n⚖️  Creating decision sessions...");

    const decisions = [];

    // Decision 1: Tech Stack Selection
    const decision1 = new DecisionSession({
      groupId: group1._id,
      title: "Which Tech Stack Should We Use?",
      category: "other",
      options: [
        { name: "React + Node.js + MongoDB" },
        { name: "Vue.js + Python + PostgreSQL" },
        { name: "Next.js + Supabase" },
      ],
      status: "completed",
      finalDecision: {
        selectedOption: { name: "React + Node.js + MongoDB" },
        algorithmScore: 0.92,
        satisfactionRate: 0.85,
        reasoning: ["Largest community support", "Best scalability"],
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      createdBy: adminUser._id,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    });
    await decision1.save();
    decisions.push(decision1);

    // Decision 2: Vacation Destination
    const decision2 = new DecisionSession({
      groupId: group2._id,
      title: "Summer Vacation Destination",
      category: "travel",
      options: [
        { name: "Bali, Indonesia", tags: ["beach", "affordable"] },
        { name: "Switzerland", tags: ["mountains", "adventure"] },
        { name: "Greece", tags: ["culture", "food", "islands"] },
      ],
      status: "collecting",
      createdBy: testUsers[0]._id,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    });
    await decision2.save();
    decisions.push(decision2);

    // Decision 3: Marketing Strategy
    const decision3 = new DecisionSession({
      groupId: group3._id,
      title: "Q1 2025 Marketing Focus",
      category: "other",
      options: [
        { name: "Social Media (TikTok, Instagram)" },
        { name: "Content Marketing (Blog, Podcast)" },
        { name: "Paid Ads (Google, LinkedIn)" },
      ],
      status: "collecting",
      createdBy: testUsers[1]._id,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    });
    await decision3.save();
    decisions.push(decision3);

    // Decision 4: Project Feature Priority
    const decision4 = new DecisionSession({
      groupId: group4._id,
      title: "MVP Feature Priority",
      category: "other",
      options: [
        { name: "User Authentication & Profiles" },
        { name: "Advanced Analytics Dashboard" },
        { name: "Mobile App Responsive Design" },
      ],
      status: "completed",
      finalDecision: {
        selectedOption: { name: "User Authentication & Profiles" },
        algorithmScore: 0.88,
        satisfactionRate: 0.8,
        reasoning: ["Essential for security", "Highest priority"],
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      createdBy: adminUser._id,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    });
    await decision4.save();
    decisions.push(decision4);

    // Decision 5: Project Timeline
    const decision5 = new DecisionSession({
      groupId: group1._id,
      title: "Product Launch Timeline",
      category: "other",
      options: [
        { name: "Q1 2025 (3 months)" },
        { name: "Q2 2025 (6 months)" },
        { name: "Q3 2025 (9 months)" },
      ],
      status: "collecting",
      createdBy: adminUser._id,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    });
    await decision5.save();
    decisions.push(decision5);

    console.log(`✅ Created ${decisions.length} decisions`);

    // Create Chat Messages
    console.log("\n💬 Creating chat messages...");

    const chatMessages = [
      new ChatMessage({
        groupId: group1._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message:
          "Great! Let's discuss the tech stack. I prefer React for the frontend.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group1._id,
        userId: testUsers[0]._id,
        userName: testUsers[0].name,
        message:
          "I agree! React has the best community support. What about the backend?",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group1._id,
        userId: testUsers[1]._id,
        userName: testUsers[1].name,
        message:
          "Node.js with Express would be perfect. Quick setup and easy to scale.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: testUsers[0]._id,
        userName: testUsers[0].name,
        message:
          "Guys, I've been thinking about our summer trip. Should we consider Southeast Asia?",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message: "Bali would be amazing! Perfect beaches and good for budget.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: testUsers[3]._id,
        userName: testUsers[3].name,
        message: "What about Greece? I heard the food is incredible there!",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group3._id,
        userId: testUsers[1]._id,
        userName: testUsers[1].name,
        message:
          "Team, let's focus on social media marketing for Q1. TikTok is trending hard.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      }),
      new ChatMessage({
        groupId: group3._id,
        userId: testUsers[4]._id,
        userName: testUsers[4].name,
        message:
          "I think content marketing is more sustainable long-term though.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      }),
    ];

    await ChatMessage.insertMany(chatMessages);
    console.log(`✅ Created ${chatMessages.length} chat messages`);

    // Print Summary
    console.log("\n" + "=".repeat(50));
    console.log("🎉 DATABASE SEEDED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log(`\n📊 Summary:`);
    console.log(`   👤 Users created: 6 (1 admin + 5 test users)`);
    console.log(`   👥 Groups created: ${groups.length}`);
    console.log(`   ⚖️  Decisions created: ${decisions.length}`);
    console.log(`   💬 Chat messages: ${chatMessages.length}`);
    console.log(`\n📋 Test Credentials:`);
    console.log(`   Email: madenenihanumanturao@gmail.com`);
    console.log(`   Password: Closeone@2005`);
    console.log(`\n🌐 Other test users (password: TestPassword@123):`);
    userEmails.forEach((user) => {
      console.log(`   • ${user.email} (${user.name})`);
    });
    console.log("\n✨ Your app is now ready with sample data!");
    console.log("=".repeat(50) + "\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();

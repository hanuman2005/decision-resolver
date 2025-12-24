require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import models
const User = require("../models/User");
const Group = require("../models/Group");
const DecisionSession = require("../models/DecisionSession");
const ChatMessage = require("../models/ChatMessage");
const UserHistory = require("../models/UserHistory");
const Notification = require("../models/Notification");

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
    await UserHistory.deleteMany({});
    await Notification.deleteMany({});

    // ========================
    // CREATE USERS
    // ========================
    console.log("\n👤 Creating users...");
    const adminUser = new User({
      name: "Madineni Hanumantha Rao",
      email: "madenenihanumanturao@gmail.com",
      password: await bcrypt.hash("Closeone@2005", 10),
    });
    await adminUser.save();

    const testUsers = [];
    const userEmails = [
      { name: "Rajesh Kumar", email: "rajesh@example.com" },
      { name: "Priya Sharma", email: "priya@example.com" },
      { name: "Amit Patel", email: "amit@example.com" },
      { name: "Sarah Johnson", email: "sarah@example.com" },
      { name: "John Smith", email: "john@example.com" },
      { name: "Emily Chen", email: "emily@example.com" },
      { name: "Michael Brown", email: "michael@example.com" },
      { name: "Jessica Davis", email: "jessica@example.com" },
    ];

    for (const userInfo of userEmails) {
      const user = new User({
        name: userInfo.name,
        email: userInfo.email,
        password: await bcrypt.hash("TestPassword@123", 10),
      });
      await user.save();
      testUsers.push(user);
    }
    console.log(
      `✅ Created 1 admin + ${testUsers.length} test users = ${
        testUsers.length + 1
      } total`
    );

    // ========================
    // CREATE GROUPS
    // ========================
    console.log("\n👥 Creating groups...");
    const groups = [];

    const group1 = new Group({
      name: "TechVision Startup",
      description: "Building the future of AI-powered decision making",
      creator: adminUser._id,
      members: [
        { userId: adminUser._id, role: "admin" },
        { userId: testUsers[0]._id, role: "member" },
        { userId: testUsers[1]._id, role: "member" },
        { userId: testUsers[2]._id, role: "member" },
      ],
      preferences: {
        cuisines: ["Italian", "Asian", "Mediterranean"],
        avgBudget: 75,
        location: "San Francisco",
        movieGenres: ["Sci-Fi", "Action", "Thriller"],
        activityTypes: ["Outdoor", "Sports", "Tech Events"],
      },
    });
    await group1.save();
    groups.push(group1);

    const group2 = new Group({
      name: "Summer Vacation Squad",
      description: "Planning an epic summer trip across Europe",
      creator: testUsers[0]._id,
      members: [
        { userId: testUsers[0]._id, role: "admin" },
        { userId: adminUser._id, role: "member" },
        { userId: testUsers[3]._id, role: "member" },
        { userId: testUsers[4]._id, role: "member" },
      ],
      preferences: {
        cuisines: ["French", "Italian", "Spanish", "Greek"],
        avgBudget: 100,
        location: "Europe",
        movieGenres: ["Adventure", "Comedy", "Drama"],
        activityTypes: ["Travel", "Beach", "Culture"],
      },
    });
    await group2.save();
    groups.push(group2);

    const group3 = new Group({
      name: "Marketing Department",
      description: "Q1 2025 Strategic Marketing Planning",
      creator: testUsers[1]._id,
      members: [
        { userId: testUsers[1]._id, role: "admin" },
        { userId: testUsers[5]._id, role: "member" },
        { userId: testUsers[6]._id, role: "member" },
        { userId: adminUser._id, role: "member" },
      ],
      preferences: {
        cuisines: ["Japanese", "Korean", "Thai"],
        avgBudget: 60,
        location: "New York",
        movieGenres: ["Comedy", "Drama", "Documentary"],
        activityTypes: ["Entertainment", "Networking", "Workshops"],
      },
    });
    await group3.save();
    groups.push(group3);

    const group4 = new Group({
      name: "Web Development Team",
      description: "Building scalable web applications",
      creator: adminUser._id,
      members: [
        { userId: adminUser._id, role: "admin" },
        { userId: testUsers[2]._id, role: "member" },
        { userId: testUsers[4]._id, role: "member" },
        { userId: testUsers[7]._id, role: "member" },
      ],
      preferences: {
        cuisines: ["Indian", "Mexican", "Vietnamese"],
        avgBudget: 45,
        location: "Austin, TX",
        movieGenres: ["Action", "Sci-Fi", "Animation"],
        activityTypes: ["Gaming", "Hackathons", "Hiking"],
      },
    });
    await group4.save();
    groups.push(group4);

    const group5 = new Group({
      name: "Design & UX Team",
      description: "Creating beautiful and intuitive user experiences",
      creator: testUsers[3]._id,
      members: [
        { userId: testUsers[3]._id, role: "admin" },
        { userId: testUsers[5]._id, role: "member" },
        { userId: testUsers[6]._id, role: "member" },
        { userId: testUsers[7]._id, role: "member" },
      ],
      preferences: {
        cuisines: ["Vegan", "Organic", "Farm-to-table"],
        avgBudget: 55,
        location: "Portland, OR",
        movieGenres: ["Drama", "Animation", "Indie"],
        activityTypes: ["Art", "Music", "Design Workshops"],
      },
    });
    await group5.save();
    groups.push(group5);

    console.log(`✅ Created ${groups.length} groups with diverse team members`);

    // ========================
    // CREATE DECISIONS
    // ========================
    console.log(
      "\n⚖️  Creating decisions with constraints and analytics data..."
    );
    const decisions = [];

    // COMPLETED DECISION 1: Tech Stack
    const decision1 = new DecisionSession({
      groupId: group1._id,
      title: "Which Tech Stack Should We Use?",
      category: "other",
      options: [
        { name: "React + Node.js + MongoDB" },
        { name: "Vue.js + Python + PostgreSQL" },
        { name: "Next.js + Supabase" },
      ],
      constraints: [
        {
          userId: adminUser._id,
          budget: { min: 10000, max: 100000, weight: 0.8 },
          preferences: ["scalability", "community", "performance"],
          mustHaves: ["good-documentation"],
          submittedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[0]._id,
          budget: { min: 5000, max: 80000, weight: 0.7 },
          preferences: ["ease-of-use", "fast-development", "community"],
          submittedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[1]._id,
          budget: { min: 8000, max: 120000, weight: 0.9 },
          preferences: ["modern-stack", "scalability", "type-safety"],
          mustHaves: ["typescript-support"],
          submittedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[2]._id,
          budget: { min: 6000, max: 90000, weight: 0.75 },
          preferences: ["performance", "community-support", "learning-curve"],
          submittedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        },
      ],
      status: "completed",
      finalDecision: {
        selectedOption: { name: "React + Node.js + MongoDB" },
        algorithmScore: 0.92,
        satisfactionRate: 0.87,
        reasoning: [
          "Largest community support",
          "Best scalability for future growth",
          "Most flexible for different use cases",
          "Strong ecosystem of tools and libraries",
        ],
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    });
    await decision1.save();
    decisions.push(decision1);

    // COMPLETED DECISION 2: Vacation Destination
    const decision2 = new DecisionSession({
      groupId: group2._id,
      title: "Summer Vacation Destination 2025",
      category: "travel",
      options: [
        { name: "Bali, Indonesia", price: 1200 },
        { name: "Switzerland", price: 2500 },
        { name: "Greece", price: 1500 },
      ],
      constraints: [
        {
          userId: testUsers[0]._id,
          budget: { min: 1000, max: 2000, weight: 0.9 },
          preferences: ["beach", "affordable", "food-culture"],
          submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
        {
          userId: adminUser._id,
          budget: { min: 800, max: 1500, weight: 0.85 },
          preferences: ["adventure", "beach", "affordable"],
          mustHaves: ["good-weather"],
          submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[3]._id,
          budget: { min: 1200, max: 2200, weight: 0.8 },
          preferences: ["culture", "history", "food"],
          submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[4]._id,
          budget: { min: 900, max: 1800, weight: 0.7 },
          preferences: ["relaxation", "beach", "nightlife"],
          submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
      ],
      status: "completed",
      finalDecision: {
        selectedOption: { name: "Greece" },
        algorithmScore: 0.89,
        satisfactionRate: 0.84,
        reasoning: [
          "Perfect balance of price and experience",
          "Rich cultural heritage and history",
          "Beautiful beaches and islands",
          "Excellent Mediterranean food culture",
        ],
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    });
    await decision2.save();
    decisions.push(decision2);

    // COLLECTING DECISION 3: Marketing Strategy
    const decision3 = new DecisionSession({
      groupId: group3._id,
      title: "Q1 2025 Marketing Channel Focus",
      category: "other",
      options: [
        { name: "Social Media Marketing (TikTok, Instagram, Twitter)" },
        { name: "Content Marketing (Blog, Podcast, YouTube)" },
        { name: "Paid Advertising (Google Ads, LinkedIn Ads)" },
      ],
      constraints: [
        {
          userId: testUsers[1]._id,
          budget: { min: 5000, max: 50000, weight: 0.8 },
          preferences: ["high-roi", "measurable", "quick-results"],
          mustHaves: ["analytics-tracking"],
          submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[5]._id,
          budget: { min: 3000, max: 40000, weight: 0.75 },
          preferences: ["brand-building", "engagement", "reach"],
          submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[6]._id,
          budget: { min: 4000, max: 45000, weight: 0.85 },
          preferences: [
            "thought-leadership",
            "credibility",
            "long-term-growth",
          ],
          submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      ],
      status: "collecting",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    });
    await decision3.save();
    decisions.push(decision3);

    // COMPLETED DECISION 4: MVP Features
    const decision4 = new DecisionSession({
      groupId: group4._id,
      title: "MVP Feature Priority - What to Build First?",
      category: "other",
      options: [
        { name: "User Authentication & Profiles" },
        { name: "Advanced Analytics Dashboard" },
        { name: "Mobile App Responsive Design" },
      ],
      constraints: [
        {
          userId: adminUser._id,
          budget: { min: 10000, max: 60000, weight: 0.85 },
          preferences: ["security", "user-experience", "scalability"],
          mustHaves: ["authentication", "data-privacy"],
          submittedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[2]._id,
          budget: { min: 8000, max: 55000, weight: 0.8 },
          preferences: ["mobile-friendly", "responsive", "accessibility"],
          mustHaves: ["responsive-design"],
          submittedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[4]._id,
          budget: { min: 12000, max: 65000, weight: 0.9 },
          preferences: ["security", "real-time-features", "analytics"],
          submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[7]._id,
          budget: { min: 9000, max: 58000, weight: 0.75 },
          preferences: ["user-auth", "profiles", "notifications"],
          mustHaves: ["user-management"],
          submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        },
      ],
      status: "completed",
      finalDecision: {
        selectedOption: { name: "User Authentication & Profiles" },
        algorithmScore: 0.91,
        satisfactionRate: 0.86,
        reasoning: [
          "Essential foundation for all other features",
          "Strong security requirements met",
          "Critical for user experience",
          "Highest priority for product launch",
          "Enables personalization features",
        ],
        timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      },
      createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000),
    });
    await decision4.save();
    decisions.push(decision4);

    // PROCESSING DECISION 5: Product Timeline
    const decision5 = new DecisionSession({
      groupId: group1._id,
      title: "Product Launch Timeline - When Should We Go Live?",
      category: "other",
      options: [
        { name: "Q1 2025 (March - Quick Launch)" },
        { name: "Q2 2025 (June - Balanced Approach)" },
        { name: "Q3 2025 (September - Fully Featured)" },
      ],
      constraints: [
        {
          userId: adminUser._id,
          budget: { min: 50000, max: 200000, weight: 0.85 },
          preferences: ["market-readiness", "feature-completeness", "testing"],
          submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[0]._id,
          budget: { min: 40000, max: 180000, weight: 0.8 },
          preferences: [
            "fast-market-entry",
            "competitive-advantage",
            "feedback",
          ],
          submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[1]._id,
          budget: { min: 60000, max: 220000, weight: 0.9 },
          preferences: ["stability", "comprehensive-features", "polish"],
          submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[2]._id,
          budget: { min: 45000, max: 190000, weight: 0.75 },
          preferences: ["adequate-testing", "good-features", "market-fit"],
          submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        },
      ],
      status: "processing",
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    });
    await decision5.save();
    decisions.push(decision5);

    // COLLECTING DECISION 6: Design System
    const decision6 = new DecisionSession({
      groupId: group5._id,
      title: "UI Design System & Component Library",
      category: "other",
      options: [
        { name: "Build Custom Design System" },
        { name: "Use Material Design (MUI)" },
        { name: "Adopt Tailwind CSS Framework" },
      ],
      constraints: [
        {
          userId: testUsers[3]._id,
          budget: { min: 5000, max: 30000, weight: 0.8 },
          preferences: ["customization", "brand-identity", "flexibility"],
          mustHaves: ["accessibility"],
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          userId: testUsers[5]._id,
          budget: { min: 3000, max: 25000, weight: 0.7 },
          preferences: ["ease-of-use", "components", "documentation"],
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      ],
      status: "collecting",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    });
    await decision6.save();
    decisions.push(decision6);

    // ACTIVE DECISION WITH CONFLICTS: Restaurant Choice
    const decision7 = new DecisionSession({
      groupId: group2._id,
      title: "Team Lunch - Where Should We Eat?",
      category: "food",
      options: [
        { name: "Indian Restaurant - Spicy & Flavorful" },
        { name: "Italian Restaurant - Classic & Rich" },
        { name: "Vegan Café - Healthy & Plant-Based" },
        { name: "Sushi Bar - Premium & Fresh" },
      ],
      constraints: [
        // Member 1: Prefers Spicy, Budget $15
        {
          userId: testUsers[0]._id,
          username: testUsers[0].name,
          budget: { min: 10, max: 20, weight: 0.8 },
          preferences: ["spicy", "indian-cuisine"],
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          type: "cuisine-preference",
          value: "Indian - Spicy",
        },
        // Member 2: Prefers Vegan (CONFLICT)
        {
          userId: testUsers[1]._id,
          username: testUsers[1].name,
          budget: { min: 12, max: 25, weight: 0.8 },
          preferences: ["vegan", "healthy"],
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          type: "cuisine-preference",
          value: "Vegan",
        },
        // Member 3: Prefers Italian (CONFLICT)
        {
          userId: testUsers[3]._id,
          username: testUsers[3].name,
          budget: { min: 15, max: 35, weight: 0.7 },
          preferences: ["italian-cuisine", "pasta", "wine"],
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          type: "cuisine-preference",
          value: "Italian",
        },
        // Member 4: Budget constraint low
        {
          userId: testUsers[4]._id,
          username: testUsers[4].name,
          budget: { min: 8, max: 15, weight: 0.9 },
          preferences: ["affordable", "filling"],
          submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          type: "budget-limit",
          value: "$15 per person",
        },
        // Member 5: Budget conflict (higher)
        {
          userId: testUsers[5]._id,
          username: testUsers[5].name,
          budget: { min: 20, max: 45, weight: 0.7 },
          preferences: ["premium", "sushi", "fresh"],
          submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          type: "budget-limit",
          value: "$30+ per person",
        },
      ],
      status: "collecting",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    });
    await decision7.save();
    decisions.push(decision7);

    console.log(
      `✅ Created ${decisions.length} decisions (mix of completed, processing, and collecting)`
    );

    // Update totalDecisions for each group
    const groupDecisionCounts = {};
    decisions.forEach((decision) => {
      const groupId = decision.groupId.toString();
      groupDecisionCounts[groupId] = (groupDecisionCounts[groupId] || 0) + 1;
    });

    for (const [groupId, count] of Object.entries(groupDecisionCounts)) {
      await Group.findByIdAndUpdate(groupId, { totalDecisions: count });
    }
    console.log(`✅ Updated totalDecisions for groups`);

    // ========================
    // CREATE CHAT MESSAGES
    // ========================
    console.log("\n💬 Creating chat messages for group discussions...");
    const chatMessages = [
      // Group 1 - Tech Stack Discussion
      new ChatMessage({
        groupId: group1._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message:
          "Hey team! Let's discuss the tech stack for our new product. I'm thinking React + Node.js.",
      }),
      new ChatMessage({
        groupId: group1._id,
        userId: testUsers[0]._id,
        userName: testUsers[0].name,
        message:
          "React is solid! Great community support and lots of libraries available.",
      }),
      new ChatMessage({
        groupId: group1._id,
        userId: testUsers[1]._id,
        userName: testUsers[1].name,
        message:
          "Node.js + Express for the backend makes sense. Easy to set up and scale.",
      }),
      new ChatMessage({
        groupId: group1._id,
        userId: testUsers[2]._id,
        userName: testUsers[2].name,
        message:
          "MongoDB for the database? That would make a complete MERN stack.",
      }),
      new ChatMessage({
        groupId: group1._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message:
          "Perfect! Let's use the decision resolver to formally decide on this.",
      }),

      // Group 2 - Vacation Planning
      new ChatMessage({
        groupId: group2._id,
        userId: testUsers[0]._id,
        userName: testUsers[0].name,
        message:
          "Summer is approaching! Where should we go for our group vacation?",
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message:
          "Bali would be amazing - beautiful beaches and fits our budget!",
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: testUsers[3]._id,
        userName: testUsers[3].name,
        message:
          "I'm thinking Greece - the islands are stunning and the food is incredible!",
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: testUsers[4]._id,
        userName: testUsers[4].name,
        message:
          "Switzerland for adventure? Mountains, hiking, and amazing scenery!",
      }),
      new ChatMessage({
        groupId: group2._id,
        userId: testUsers[0]._id,
        userName: testUsers[0].name,
        message:
          "Let's use decision resolver to make this fair and make sure everyone is happy!",
      }),

      // Group 3 - Marketing Strategy
      new ChatMessage({
        groupId: group3._id,
        userId: testUsers[1]._id,
        userName: testUsers[1].name,
        message:
          "Q1 is crucial for our marketing. We need to focus our budget smartly.",
      }),
      new ChatMessage({
        groupId: group3._id,
        userId: testUsers[5]._id,
        userName: testUsers[5].name,
        message:
          "Social media is where the action is. TikTok and Instagram are huge right now!",
      }),
      new ChatMessage({
        groupId: group3._id,
        userId: testUsers[6]._id,
        userName: testUsers[6].name,
        message:
          "Content marketing builds long-term authority. Blog + Podcast combo could work well.",
      }),
      new ChatMessage({
        groupId: group3._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message:
          "All valid points! Let's submit our constraints and let the algorithm help us decide.",
      }),

      // Group 4 - Development
      new ChatMessage({
        groupId: group4._id,
        userId: adminUser._id,
        userName: adminUser.name,
        message:
          "MVP planning time! What features should we prioritize for launch?",
      }),
      new ChatMessage({
        groupId: group4._id,
        userId: testUsers[2]._id,
        userName: testUsers[2].name,
        message:
          "User auth is essential - can't launch without it. Mobile responsive too!",
      }),
      new ChatMessage({
        groupId: group4._id,
        userId: testUsers[4]._id,
        userName: testUsers[4].name,
        message:
          "Analytics would help us understand user behavior right from day one.",
      }),
      new ChatMessage({
        groupId: group4._id,
        userId: testUsers[7]._id,
        userName: testUsers[7].name,
        message:
          "User profiles are key for personalization. Let's get everyone's input!",
      }),

      // Group 5 - Design
      new ChatMessage({
        groupId: group5._id,
        userId: testUsers[3]._id,
        userName: testUsers[3].name,
        message:
          "Design system discussion time! Custom vs framework approaches?",
      }),
      new ChatMessage({
        groupId: group5._id,
        userId: testUsers[5]._id,
        userName: testUsers[5].name,
        message:
          "MUI is battle-tested and has tons of components ready to use.",
      }),
      new ChatMessage({
        groupId: group5._id,
        userId: testUsers[6]._id,
        userName: testUsers[6].name,
        message:
          "Tailwind gives us more control and flexibility for custom designs.",
      }),
      new ChatMessage({
        groupId: group5._id,
        userId: testUsers[7]._id,
        userName: testUsers[7].name,
        message:
          "Let's gather everyone's constraints and make the best decision together!",
      }),
    ];

    await ChatMessage.insertMany(chatMessages);
    console.log(`✅ Created ${chatMessages.length} chat messages`);

    // ========================
    // CREATE USER HISTORY (Analytics)
    // ========================
    console.log("\n📊 Creating user history for analytics dashboard...");
    const userHistories = [
      // Group 1 Analytics
      new UserHistory({
        userId: adminUser._id,
        groupId: group1._id,
        totalDecisions: 3,
        completedDecisions: 2,
        avgSatisfactionScore: 0.87,
        fairnessScore: 0.85,
      }),
      new UserHistory({
        userId: testUsers[0]._id,
        groupId: group1._id,
        totalDecisions: 3,
        completedDecisions: 2,
        avgSatisfactionScore: 0.82,
        fairnessScore: 0.88,
      }),
      new UserHistory({
        userId: testUsers[1]._id,
        groupId: group1._id,
        totalDecisions: 3,
        completedDecisions: 2,
        avgSatisfactionScore: 0.85,
        fairnessScore: 0.86,
      }),
      new UserHistory({
        userId: testUsers[2]._id,
        groupId: group1._id,
        totalDecisions: 3,
        completedDecisions: 2,
        avgSatisfactionScore: 0.84,
        fairnessScore: 0.87,
      }),

      // Group 2 Analytics
      new UserHistory({
        userId: testUsers[0]._id,
        groupId: group2._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.84,
        fairnessScore: 0.86,
      }),
      new UserHistory({
        userId: adminUser._id,
        groupId: group2._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.86,
        fairnessScore: 0.9,
      }),
      new UserHistory({
        userId: testUsers[3]._id,
        groupId: group2._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.81,
        fairnessScore: 0.84,
      }),
      new UserHistory({
        userId: testUsers[4]._id,
        groupId: group2._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.79,
        fairnessScore: 0.82,
      }),

      // Group 4 Analytics
      new UserHistory({
        userId: adminUser._id,
        groupId: group4._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.91,
        fairnessScore: 0.92,
      }),
      new UserHistory({
        userId: testUsers[2]._id,
        groupId: group4._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.88,
        fairnessScore: 0.89,
      }),
      new UserHistory({
        userId: testUsers[4]._id,
        groupId: group4._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.89,
        fairnessScore: 0.91,
      }),
      new UserHistory({
        userId: testUsers[7]._id,
        groupId: group4._id,
        totalDecisions: 2,
        completedDecisions: 1,
        avgSatisfactionScore: 0.86,
        fairnessScore: 0.88,
      }),
    ];

    await UserHistory.insertMany(userHistories);
    console.log(
      `✅ Created ${userHistories.length} user history records for analytics`
    );

    // ========================
    // CREATE NOTIFICATIONS
    // ========================
    console.log("\n🔔 Creating notifications...");
    const notifications = [
      // Group invitations
      new Notification({
        recipient: testUsers[3]._id,
        type: "group_invite",
        title: "You're invited to TechVision Startup",
        message:
          "Madineni Hanumantha Rao invited you to join TechVision Startup group",
        data: {
          groupId: group1._id,
          groupName: "TechVision Startup",
          userId: adminUser._id,
          userName: adminUser.name,
        },
        read: false,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: testUsers[5]._id,
        type: "group_invite",
        title: "You're invited to Web Development Team",
        message:
          "Madineni Hanumantha Rao invited you to join Web Development Team",
        data: {
          groupId: group4._id,
          groupName: "Web Development Team",
          userId: adminUser._id,
          userName: adminUser.name,
        },
        read: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      }),

      // Decision created notifications
      new Notification({
        recipient: testUsers[0]._id,
        type: "decision_created",
        title: "New decision: Q1 2025 Marketing Channel Focus",
        message:
          "Priya Sharma created a new decision in Marketing Department group",
        data: {
          groupId: group3._id,
          decisionId: decisions[2]._id,
          groupName: "Marketing Department",
          decisionTitle: "Q1 2025 Marketing Channel Focus",
          userId: testUsers[1]._id,
          userName: testUsers[1].name,
        },
        read: false,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: testUsers[7]._id,
        type: "decision_created",
        title: "New decision: UI Design System & Component Library",
        message: "Sarah Johnson created a new decision in Design & UX Team",
        data: {
          groupId: group5._id,
          decisionId: decisions[5]._id,
          groupName: "Design & UX Team",
          decisionTitle: "UI Design System & Component Library",
          userId: testUsers[3]._id,
          userName: testUsers[3].name,
        },
        read: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      }),

      // Constraint submitted notifications
      new Notification({
        recipient: testUsers[0]._id,
        type: "constraint_submitted",
        title: "Constraint submitted in Tech Stack decision",
        message:
          "Priya Sharma submitted their constraints for the Tech Stack decision",
        data: {
          groupId: group1._id,
          decisionId: decisions[0]._id,
          decisionTitle: "Which Tech Stack Should We Use?",
          userId: testUsers[1]._id,
          userName: testUsers[1].name,
        },
        read: true,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: adminUser._id,
        type: "constraint_submitted",
        title: "Constraint submitted in MVP Features decision",
        message:
          "Rajesh Kumar submitted their constraints for the MVP Features decision",
        data: {
          groupId: group4._id,
          decisionId: decisions[3]._id,
          decisionTitle: "MVP Feature Priority - What to Build First?",
          userId: testUsers[0]._id,
          userName: testUsers[0].name,
        },
        read: true,
        createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: testUsers[2]._id,
        type: "constraint_submitted",
        title: "Constraint submitted in Summer Vacation decision",
        message:
          "Rajesh Kumar submitted their constraints for the Summer Vacation decision",
        data: {
          groupId: group2._id,
          decisionId: decisions[1]._id,
          decisionTitle: "Summer Vacation Destination 2025",
          userId: testUsers[0]._id,
          userName: testUsers[0].name,
        },
        read: true,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      }),

      // Decision ready notifications
      new Notification({
        recipient: testUsers[1]._id,
        type: "decision_ready",
        title: "Tech Stack decision is ready for review",
        message:
          "All constraints have been submitted for the Tech Stack decision. Results are ready!",
        data: {
          groupId: group1._id,
          decisionId: decisions[0]._id,
          decisionTitle: "Which Tech Stack Should We Use?",
        },
        read: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: testUsers[2]._id,
        type: "decision_ready",
        title: "Summer Vacation decision results are in",
        message:
          "The team has reached a decision on the summer vacation destination!",
        data: {
          groupId: group2._id,
          decisionId: decisions[1]._id,
          decisionTitle: "Summer Vacation Destination 2025",
        },
        read: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: adminUser._id,
        type: "decision_ready",
        title: "MVP Features decision results are ready",
        message: "The team has finalized the MVP feature priorities!",
        data: {
          groupId: group4._id,
          decisionId: decisions[3]._id,
          decisionTitle: "MVP Feature Priority - What to Build First?",
        },
        read: true,
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      }),

      // Member joined notifications
      new Notification({
        recipient: testUsers[0]._id,
        type: "member_joined",
        title: "Amit Patel joined TechVision Startup",
        message: "Amit Patel is now a member of TechVision Startup group",
        data: {
          groupId: group1._id,
          groupName: "TechVision Startup",
          userId: testUsers[2]._id,
          userName: testUsers[2].name,
        },
        read: true,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      }),
      new Notification({
        recipient: testUsers[3]._id,
        type: "member_joined",
        title: "Michael Brown joined Design & UX Team",
        message: "Michael Brown is now a member of Design & UX Team",
        data: {
          groupId: group5._id,
          groupName: "Design & UX Team",
          userId: testUsers[6]._id,
          userName: testUsers[6].name,
        },
        read: false,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      }),
    ];

    await Notification.insertMany(notifications);
    console.log(`✅ Created ${notifications.length} notifications`);

    // ========================
    // FINAL SUMMARY
    // ========================
    console.log("\n" + "=".repeat(60));
    console.log("✨ DATABASE SEEDING COMPLETE ✨");
    console.log("=".repeat(60));
    console.log(`\n📊 DATABASE SUMMARY:`);
    console.log(
      `   👤 Users: 1 admin + ${testUsers.length} team members = ${
        testUsers.length + 1
      } total`
    );
    console.log(`   👥 Groups: ${groups.length} diverse teams`);
    console.log(
      `   ⚖️  Decisions: ${decisions.length} (2 completed, 1 processing, 3 collecting)`
    );
    console.log(`   💬 Chat Messages: ${chatMessages.length}`);
    console.log(`   📊 User History Records: ${userHistories.length}`);
    console.log(`   🔔 Notifications: ${notifications.length}`);
    console.log(`\n🔐 LOGIN CREDENTIALS:`);
    console.log(`   Admin Email: madenenihanumanturao@gmail.com`);
    console.log(`   Admin Password: Closeone@2005`);
    console.log(`\n👨‍💼 OTHER TEST USERS (Password: TestPassword@123):`);
    userEmails.forEach((user, i) => {
      console.log(`   ${i + 1}. ${user.email} (${user.name})`);
    });
    console.log(`\n🎯 FEATURES ENABLED:`);
    console.log(`   ✅ Dashboard with real statistics`);
    console.log(`   ✅ Multiple groups with active discussions`);
    console.log(`   ✅ Completed decisions with algorithm scores`);
    console.log(`   ✅ In-progress decisions (collecting constraints)`);
    console.log(`   ✅ Chat messages and group collaboration`);
    console.log(`   ✅ User fairness scores and analytics`);
    console.log(`   ✅ Decision satisfaction metrics`);
    console.log(`   ✅ Algorithm scoring and alternative options`);
    console.log(`   ✅ Conflict resolution data`);
    console.log(`   ✅ AI suggestions from completed decisions`);
    console.log(`   ✅ In-app notifications and alerts`);
    console.log(`   ✅ Group invitations and member management`);
    console.log(`\n🚀 The website is now fully functional with dynamic data!`);
    console.log("=".repeat(60) + "\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();

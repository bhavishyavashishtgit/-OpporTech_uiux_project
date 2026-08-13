export interface Opportunity {
  id: string;
  title: string;
  type: "hackathon" | "contest" | "internship" | "scholarship" | "workshop";
  description: string;
  organizer: string;
  deadline: string;
  eligibility: string[];
  skills: string[];
  prize?: string;
  level: "beginner" | "intermediate" | "advanced";
  registrationLink: string;
  image?: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  branch: string;
  year: number;
  skills: string[];
  interests: string[];
  lookingFor: string;
  avatar?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  roadmap: {
    phase: string;
    duration: string;
    topics: string[];
  }[];
  skills: string[];
  opportunities: string[];
}

export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Smart India Hackathon 2026",
    type: "hackathon",
    description: "India's biggest hackathon with problem statements from government ministries and departments. Build innovative solutions for real-world problems.",
    organizer: "Government of India",
    deadline: "2026-05-15",
    eligibility: ["B.Tech", "BCA", "B.Sc CS/IT", "MCA", "Diploma"],
    skills: ["Web Development", "Mobile Apps", "AI/ML", "IoT"],
    prize: "₹1,00,000 per team",
    level: "intermediate",
    registrationLink: "https://sih.gov.in",
    tags: ["36-hour", "Team Event", "Government"],
  },
  {
    id: "2",
    title: "HackMIT 2026",
    type: "hackathon",
    description: "MIT's premier hackathon bringing together students from around the world. Focus on cutting-edge technology and innovation.",
    organizer: "Massachusetts Institute of Technology",
    deadline: "2026-04-20",
    eligibility: ["B.Tech", "BCA", "B.Sc CS/IT", "MCA"],
    skills: ["Full Stack", "AI/ML", "Blockchain", "AR/VR"],
    prize: "$10,000",
    level: "advanced",
    registrationLink: "https://hackmit.org",
    tags: ["International", "Travel Support", "Virtual"],
  },
  {
    id: "3",
    title: "CodeChef April Long Challenge",
    type: "contest",
    description: "Monthly coding contest with algorithmic problems. Great for improving problem-solving skills and competitive programming.",
    organizer: "CodeChef",
    deadline: "2026-04-12",
    eligibility: ["All Students"],
    skills: ["Data Structures", "Algorithms", "Problem Solving"],
    prize: "₹25,000 for top performers",
    level: "beginner",
    registrationLink: "https://codechef.com",
    tags: ["10-day", "Individual", "Online"],
  },
  {
    id: "4",
    title: "Google Summer of Code 2026",
    type: "internship",
    description: "Work on open source projects with mentorship from experienced developers. Get paid to contribute to real-world software.",
    organizer: "Google",
    deadline: "2026-04-18",
    eligibility: ["B.Tech", "BCA", "B.Sc CS/IT", "MCA"],
    skills: ["Open Source", "Git", "Programming"],
    prize: "$3,000 - $6,000 stipend",
    level: "intermediate",
    registrationLink: "https://summerofcode.withgoogle.com",
    tags: ["3 months", "Remote", "Mentorship"],
  },
  {
    id: "5",
    title: "Microsoft Learn Student Ambassador",
    type: "scholarship",
    description: "Join a global community of student leaders. Access to Microsoft certifications, events, and networking opportunities.",
    organizer: "Microsoft",
    deadline: "2026-04-30",
    eligibility: ["All Students", "Age 16+"],
    skills: ["Leadership", "Technology", "Communication"],
    level: "beginner",
    registrationLink: "https://studentambassadors.microsoft.com",
    tags: ["Community", "Certifications", "Free"],
  },
  {
    id: "6",
    title: "AWS Machine Learning Workshop",
    type: "workshop",
    description: "Hands-on workshop on building ML models using AWS services. Learn SageMaker, deployment, and best practices.",
    organizer: "Amazon Web Services",
    deadline: "2026-04-16",
    eligibility: ["B.Tech", "MCA", "B.Sc CS/IT"],
    skills: ["Python", "Machine Learning", "Cloud Computing"],
    level: "intermediate",
    registrationLink: "https://aws.amazon.com/training",
    tags: ["2-day", "Certification", "Virtual"],
  },
  {
    id: "7",
    title: "LeetCode Weekly Contest 390",
    type: "contest",
    description: "Weekly algorithmic programming contest. Compete globally and improve your ranking on the leaderboard.",
    organizer: "LeetCode",
    deadline: "2026-04-13",
    eligibility: ["All Students"],
    skills: ["Algorithms", "Data Structures", "Competitive Programming"],
    prize: "LeetCode Coins & Swag",
    level: "intermediate",
    registrationLink: "https://leetcode.com",
    tags: ["90 minutes", "Individual", "Online"],
  },
  {
    id: "8",
    title: "Flipkart GRiD 5.0",
    type: "hackathon",
    description: "Flipkart's flagship engineering challenge for tech enthusiasts. Solve e-commerce challenges and win exciting prizes.",
    organizer: "Flipkart",
    deadline: "2026-05-01",
    eligibility: ["B.Tech", "BCA", "MCA"],
    skills: ["Software Development", "System Design", "Innovation"],
    prize: "₹5,00,000 + Internship Opportunity",
    level: "intermediate",
    registrationLink: "https://unstop.com/flipkart-grid",
    tags: ["Multi-round", "PPO Opportunity", "National"],
  },
  {
    id: "9",
    title: "GitHub Campus Expert Program",
    type: "scholarship",
    description: "Become a leader in your tech community. Get training, swag, and resources to organize events at your campus.",
    organizer: "GitHub",
    deadline: "2026-04-25",
    eligibility: ["All Students"],
    skills: ["Git", "Community Building", "Leadership"],
    level: "beginner",
    registrationLink: "https://education.github.com/experts",
    tags: ["Year-long", "Community", "Exclusive Access"],
  },
  {
    id: "10",
    title: "Devfolio Summer of Code",
    type: "internship",
    description: "Contribute to exciting blockchain and web3 projects. Learn from industry experts and build your portfolio.",
    organizer: "Devfolio",
    deadline: "2026-04-22",
    eligibility: ["B.Tech", "BCA", "B.Sc CS/IT"],
    skills: ["Blockchain", "Web3", "Smart Contracts"],
    prize: "₹50,000 stipend",
    level: "intermediate",
    registrationLink: "https://devfolio.co",
    tags: ["2 months", "Remote", "Blockchain"],
  },
  {
    id: "11",
    title: "Kaggle Competition: AI for Healthcare",
    type: "contest",
    description: "Build ML models to predict disease outcomes. Real-world healthcare data and impactful problem statements.",
    organizer: "Kaggle",
    deadline: "2026-05-10",
    eligibility: ["All Students"],
    skills: ["Machine Learning", "Python", "Data Analysis"],
    prize: "$50,000",
    level: "advanced",
    registrationLink: "https://kaggle.com",
    tags: ["60-day", "Team Allowed", "AI/ML"],
  },
  {
    id: "12",
    title: "Internshala Career Bootcamp",
    type: "workshop",
    description: "Learn resume building, interview skills, and job search strategies. Perfect for placement preparation.",
    organizer: "Internshala",
    deadline: "2026-04-14",
    eligibility: ["All Students", "Final Year Priority"],
    skills: ["Resume Writing", "Interview Skills", "Career Planning"],
    level: "beginner",
    registrationLink: "https://internshala.com",
    tags: ["3-day", "Free", "Placement Prep"],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    branch: "Computer Science",
    year: 2,
    skills: ["React", "Node.js", "MongoDB"],
    interests: ["Web Development", "AI/ML"],
    lookingFor: "Looking for frontend/backend developers for SIH hackathon",
  },
  {
    id: "2",
    name: "Priya Patel",
    branch: "Information Technology",
    year: 3,
    skills: ["Python", "TensorFlow", "Data Analysis"],
    interests: ["Machine Learning", "Data Science"],
    lookingFor: "Need team members for Kaggle ML competition",
  },
  {
    id: "3",
    name: "Arjun Kumar",
    branch: "Computer Science",
    year: 2,
    skills: ["Flutter", "Firebase", "UI/UX"],
    interests: ["Mobile Development", "Startups"],
    lookingFor: "Looking for co-founders for mobile app startup",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    branch: "Computer Applications",
    year: 1,
    skills: ["Java", "Spring Boot", "MySQL"],
    interests: ["Backend Development", "Cloud Computing"],
    lookingFor: "Want to join a hackathon team, beginner friendly",
  },
  {
    id: "5",
    name: "Vikram Singh",
    branch: "Electronics & Computer",
    year: 3,
    skills: ["IoT", "Arduino", "Python"],
    interests: ["Hardware", "Embedded Systems"],
    lookingFor: "Need software developers for IoT hackathon project",
  },
  {
    id: "6",
    name: "Anjali Verma",
    branch: "Information Technology",
    year: 2,
    skills: ["React Native", "JavaScript", "APIs"],
    interests: ["Mobile Apps", "EdTech"],
    lookingFor: "Looking for team for HackMIT - app development",
  },
];

export const careerPaths: CareerPath[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Build modern, responsive websites and web applications. Master both frontend and backend technologies.",
    roadmap: [
      {
        phase: "Foundation (0-3 months)",
        duration: "3 months",
        topics: ["HTML5 & CSS3", "JavaScript Basics", "Responsive Design", "Git & GitHub"],
      },
      {
        phase: "Frontend Development (3-6 months)",
        duration: "3 months",
        topics: ["React.js", "TypeScript", "Tailwind CSS", "State Management (Redux/Zustand)", "API Integration"],
      },
      {
        phase: "Backend Development (6-9 months)",
        duration: "3 months",
        topics: ["Node.js & Express", "MongoDB/PostgreSQL", "RESTful APIs", "Authentication & Authorization", "Deployment"],
      },
      {
        phase: "Advanced (9-12 months)",
        duration: "3 months",
        topics: ["Next.js/Remix", "GraphQL", "Microservices", "Docker & Kubernetes", "AWS/Azure"],
      },
    ],
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases"],
    opportunities: ["Frontend Developer Intern", "Full Stack Hackathons", "Open Source Contributions"],
  },
  {
    id: "ai-ml",
    title: "AI/ML Engineer",
    description: "Build intelligent systems using machine learning and deep learning. Work on cutting-edge AI applications.",
    roadmap: [
      {
        phase: "Programming & Math (0-3 months)",
        duration: "3 months",
        topics: ["Python Programming", "NumPy & Pandas", "Linear Algebra", "Statistics & Probability"],
      },
      {
        phase: "Machine Learning (3-6 months)",
        duration: "3 months",
        topics: ["Supervised Learning", "Unsupervised Learning", "Scikit-learn", "Feature Engineering", "Model Evaluation"],
      },
      {
        phase: "Deep Learning (6-9 months)",
        duration: "3 months",
        topics: ["Neural Networks", "TensorFlow/PyTorch", "CNN & RNN", "Transfer Learning", "NLP Basics"],
      },
      {
        phase: "Specialization (9-12 months)",
        duration: "3 months",
        topics: ["Computer Vision", "NLP Advanced", "MLOps", "Model Deployment", "Research Papers"],
      },
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "Mathematics", "Data Analysis"],
    opportunities: ["Kaggle Competitions", "AI Hackathons", "Research Internships", "GSoC Projects"],
  },
  {
    id: "app-dev",
    title: "App Development",
    description: "Create mobile applications for Android and iOS. Build apps that millions of users can use daily.",
    roadmap: [
      {
        phase: "Basics (0-3 months)",
        duration: "3 months",
        topics: ["Programming (Kotlin/Swift/Dart)", "Mobile UI/UX", "Layout Design", "Git Basics"],
      },
      {
        phase: "Native Development (3-6 months)",
        duration: "3 months",
        topics: ["Android Studio/Xcode", "Activities/ViewControllers", "Database (Room/CoreData)", "API Integration"],
      },
      {
        phase: "Cross-Platform (6-9 months)",
        duration: "3 months",
        topics: ["Flutter/React Native", "State Management", "Firebase", "Push Notifications", "App Publishing"],
      },
      {
        phase: "Advanced (9-12 months)",
        duration: "3 months",
        topics: ["Advanced Animations", "Offline Support", "Performance Optimization", "Backend Integration", "Monetization"],
      },
    ],
    skills: ["Kotlin/Swift", "Flutter", "React Native", "Firebase", "UI/UX"],
    opportunities: ["Mobile App Hackathons", "App Contests", "Startup Projects", "Freelancing"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect systems and networks from digital attacks. Become an ethical hacker and security expert.",
    roadmap: [
      {
        phase: "Fundamentals (0-3 months)",
        duration: "3 months",
        topics: ["Networking Basics", "Linux Command Line", "Python for Security", "Security Concepts"],
      },
      {
        phase: "Offensive Security (3-6 months)",
        duration: "3 months",
        topics: ["Ethical Hacking", "Penetration Testing", "Web App Security", "Kali Linux Tools"],
      },
      {
        phase: "Defensive Security (6-9 months)",
        duration: "3 months",
        topics: ["Firewall & IDS", "Incident Response", "Malware Analysis", "Security Monitoring"],
      },
      {
        phase: "Specialization (9-12 months)",
        duration: "3 months",
        topics: ["Cloud Security", "Cryptography", "Bug Bounty", "Security Certifications (CEH/OSCP)"],
      },
    ],
    skills: ["Networking", "Linux", "Python", "Ethical Hacking", "Cryptography"],
    opportunities: ["CTF Competitions", "Bug Bounty Programs", "Security Hackathons", "Cybersecurity Workshops"],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Bridge development and operations. Automate deployment, scaling, and management of applications.",
    roadmap: [
      {
        phase: "Basics (0-3 months)",
        duration: "3 months",
        topics: ["Linux Administration", "Shell Scripting", "Git Advanced", "Networking"],
      },
      {
        phase: "Containerization (3-6 months)",
        duration: "3 months",
        topics: ["Docker", "Kubernetes", "Container Orchestration", "Microservices"],
      },
      {
        phase: "CI/CD (6-9 months)",
        duration: "3 months",
        topics: ["Jenkins/GitHub Actions", "GitLab CI", "Automated Testing", "Deployment Strategies"],
      },
      {
        phase: "Cloud & Monitoring (9-12 months)",
        duration: "3 months",
        topics: ["AWS/Azure/GCP", "Terraform", "Ansible", "Prometheus & Grafana", "Log Management"],
      },
    ],
    skills: ["Linux", "Docker", "Kubernetes", "CI/CD", "Cloud Platforms"],
    opportunities: ["Cloud Workshops", "DevOps Hackathons", "Open Source Tools", "Infrastructure Projects"],
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Extract insights from data. Use statistics, programming, and domain knowledge to solve business problems.",
    roadmap: [
      {
        phase: "Programming & Stats (0-3 months)",
        duration: "3 months",
        topics: ["Python/R", "Statistics", "Probability", "Data Visualization"],
      },
      {
        phase: "Data Analysis (3-6 months)",
        duration: "3 months",
        topics: ["Pandas & NumPy", "SQL", "Exploratory Data Analysis", "Data Cleaning"],
      },
      {
        phase: "Machine Learning (6-9 months)",
        duration: "3 months",
        topics: ["ML Algorithms", "Scikit-learn", "Feature Engineering", "Model Selection"],
      },
      {
        phase: "Advanced (9-12 months)",
        duration: "3 months",
        topics: ["Big Data (Spark)", "A/B Testing", "Time Series", "Business Analytics", "Storytelling"],
      },
    ],
    skills: ["Python/R", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
    opportunities: ["Data Hackathons", "Kaggle Competitions", "Analytics Internships", "Research Projects"],
  },
];

// User profile interface
export interface UserProfile {
  name: string;
  email: string;
  branch: string;
  year: number;
  college: string;
  skills: string[];
  interests: string[];
}

// Default user profile for prototype
export const defaultUserProfile: UserProfile = {
  name: "Student User",
  email: "student@example.com",
  branch: "Computer Science",
  year: 2,
  college: "Example Institute of Technology",
  skills: ["JavaScript", "React", "Python"],
  interests: ["Web Development", "AI/ML"],
};

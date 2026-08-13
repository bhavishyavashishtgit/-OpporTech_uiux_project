import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sendGeminiMessage } from "../services/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: "👋 Hi there! I'm your AI career assistant. I can help you with hackathon prep, internship hunting, career roadmaps, team building, and skill planning. Ask me anything, or choose one of the quick prompts below!",
  timestamp: new Date(),
};

const quickPromptGroups = [
  {
    title: "Popular Questions",
    prompts: [
      "How do I prepare for a hackathon?",
      "What skills do I need for web development?",
      "Find internships for beginners",
    ],
  },
  {
    title: "Career Growth",
    prompts: [
      "Career roadmap for AI/ML",
      "How to improve my competitive programming skills?",
      "How can I build a strong portfolio?",
    ],
  },
  {
    title: "Team & Projects",
    prompts: [
      "How to build a strong team?",
      "Project ideas for my portfolio",
      "Best tools for remote collaboration",
    ],
  },
];

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const generateId = () => {
    return (++messageIdRef.current).toString();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateMockResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    // Hackathon related
    if (lowerMessage.includes("hackathon") || lowerMessage.includes("prepare")) {
      return `Great question about hackathons! Here's how to prepare effectively:

**Before the Hackathon:**
• Form a team with diverse skills (2-4 members)
• Research problem statements in advance
• Set up your development environment
• Prepare a toolkit of APIs and libraries you might use

**During the Hackathon:**
• Start with a clear problem statement
• Build an MVP first, then add features
• Document your code and create a good README
• Practice your pitch multiple times

**Winning Tips:**
• Focus on impact and feasibility
• Make your demo visually appealing
• Show clear business/social value
• Be ready to explain your tech stack

Check out the Smart India Hackathon 2026 and HackMIT in the Opportunities section!`;
    }

    // Career roadmap related
    if (lowerMessage.includes("roadmap") || lowerMessage.includes("learn") || lowerMessage.includes("skill")) {
      return `I can help you with career roadmaps! We have detailed guides for:

**1. Web Development** 🌐
• Frontend: HTML/CSS, React, TypeScript
• Backend: Node.js, databases, APIs
• Full Stack mastery in 12 months

**2. AI/ML Engineer** 🤖
• Python, Math, Statistics
• Machine Learning algorithms
• Deep Learning with TensorFlow/PyTorch

**3. App Development** 📱
• Native (Android/iOS) or Cross-platform
• Flutter, React Native
• UI/UX best practices

**4. Cybersecurity** 🔒
• Networking, Linux, Ethical Hacking
• Penetration Testing
• Bug Bounty programs

**5. DevOps** ⚙️
• Docker, Kubernetes, CI/CD
• Cloud platforms (AWS/Azure)

**6. Data Science** 📊
• Python/R, SQL, Statistics
• Data Analysis, Visualization
• Big Data tools

Visit the Career Roadmaps section for detailed phase-by-phase guides!`;
    }

    // Team building
    if (lowerMessage.includes("team") || lowerMessage.includes("member") || lowerMessage.includes("collaborate")) {
      return `Building the right team is crucial! Here's my advice:

**Ideal Team Composition:**
• 1 Frontend Developer (UI/UX)
• 1 Backend Developer (APIs, Database)
• 1 Designer/Ideator (Creative thinking)
• 1 Presenter (Communication skills)

**Where to Find Teammates:**
✅ Use our Team Finder feature to connect with students
✅ Join college tech clubs and communities
✅ Attend workshops and networking events
✅ Post on Discord servers and LinkedIn

**Team Success Tips:**
• Clear role distribution
• Regular communication (daily standups)
• Use collaboration tools like GitHub, Trello, and Miro
• Respect each other's ideas

Check the Team Finder section to browse available members!`;
    }

    // Internship related
    if (lowerMessage.includes("internship") || lowerMessage.includes("job") || lowerMessage.includes("placement")) {
      return `Looking for internships? Here are some great opportunities:

**Beginner-Friendly:**
• Google Summer of Code - Open source internship
• Microsoft Learn Student Ambassador - Community role
• Devfolio Summer of Code - Blockchain projects

**Tips to Land an Internship:**
1. Build a strong GitHub profile with projects
2. Create a portfolio website
3. Contribute to open source
4. Practice DSA for technical interviews
5. Network on LinkedIn

**Resume Tips:**
• Highlight projects with impact metrics
• List relevant skills and technologies
• Include hackathon wins and certifications
• Keep it 1-page, ATS-friendly

Visit the Opportunities page filtered for 'Internships' to see all available options!`;
    }

    // Coding contest related
    if (lowerMessage.includes("coding") || lowerMessage.includes("contest") || lowerMessage.includes("competitive")) {
      return `Competitive programming is a great skill builder! Here's how to excel:

**Practice Platforms:**
• LeetCode - Interview preparation
• CodeChef - Monthly contests
• Codeforces - Rating-based contests
• HackerRank - Company-specific prep

**Learning Path:**
1. **Basics (Month 1-2):** Arrays, Strings, Loops
2. **Data Structures (Month 3-4):** Stack, Queue, Trees, Graphs
3. **Algorithms (Month 5-6):** Sorting, Searching, DP, Greedy
4. **Advanced (Month 7+):** Segment Trees, Graph Advanced

**Contest Strategy:**
• Start with easiest problems
• Read all problems first
• Don't get stuck - move on and return
• Practice time management

Check out CodeChef April Long Challenge and LeetCode Weekly contests in Opportunities!`;
    }

    // Web development
    if (lowerMessage.includes("web") || lowerMessage.includes("frontend") || lowerMessage.includes("backend")) {
      return `Web Development is one of the most in-demand skills! Here's your path:

**Frontend (3-4 months):**
• HTML, CSS, JavaScript fundamentals
• React.js or Vue.js framework
• Tailwind CSS for styling
• Git & GitHub for version control

**Backend (3-4 months):**
• Node.js with Express
• Database: MongoDB or PostgreSQL
• REST APIs and authentication
• Deployment on Vercel/Netlify/Heroku

**Project Ideas:**
1. Portfolio Website
2. E-commerce store
3. Social media clone
4. Task management app
5. Real-time chat application

**Resources:**
• freeCodeCamp (Free courses)
• The Odin Project (Full curriculum)
• YouTube: Traversy Media, Web Dev Simplified

Visit Career Roadmaps > Web Development for the complete 12-month plan!`;
    }

    // AI/ML related
    if (lowerMessage.includes("ai") || lowerMessage.includes("ml") || lowerMessage.includes("machine learning") || lowerMessage.includes("artificial intelligence") || lowerMessage.includes("data science")) {
      return `AI/ML is super exciting! Here's how to get started:

**Prerequisites:**
• Strong Python programming
• Mathematics: Linear Algebra, Calculus, Statistics
• Data manipulation with NumPy and Pandas

**Learning Path (12 months):**

**Phase 1:** Foundation (0-3 months)
• Python + Math basics
• Data visualization (Matplotlib, Seaborn)

**Phase 2:** Machine Learning (3-6 months)
• Scikit-learn library
• Supervised & Unsupervised learning
• Feature engineering

**Phase 3:** Deep Learning (6-9 months)
• Neural Networks
• TensorFlow or PyTorch
• CNN for images, RNN for sequences

**Phase 4:** Specialization (9-12 months)
• NLP or Computer Vision
• MLOps and deployment
• Research papers

**Practice Opportunities:**
• Kaggle competitions
• AI hackathons
• Google AI challenges

Check the AI/ML roadmap in Career Roadmaps section!`;
    }

    // Resume and profile advice
    if (lowerMessage.includes("resume") || lowerMessage.includes("cv") || lowerMessage.includes("linkedin") || lowerMessage.includes("profile")) {
      return `A standout profile is all about clarity and concrete results.

**Resume checklist:**
• Keep the format clean and concise
• Highlight achievements with numbers
• Add relevant projects, tools, and tech stacks

**LinkedIn tips:**
• Use a strong headline and summary
• Share recent achievements or projects
• Ask for recommendations from peers and mentors

If you want, I can give you a resume outline or a profile summary template.`;
    }

    // Portfolio and project ideas
    if (lowerMessage.includes("portfolio") || lowerMessage.includes("project") || lowerMessage.includes("github") || lowerMessage.includes("website")) {
      return `Your portfolio should show what you can build and how you solve problems.

**Project portfolio checklist:**
• Include 2-4 polished projects
• Describe the problem, your solution, and the tech stack
• Link to live demos and GitHub repos
• Mention what you learned or improved

**Project ideas:**
1. Personal finance tracker
2. Event planner app
3. AI-powered recommendation tool
4. Study buddy collaboration platform

I can also suggest projects based on your selected career path.`;
    }

    // Interview preparation
    if (lowerMessage.includes("interview") || lowerMessage.includes("dsa") || lowerMessage.includes("technical") || lowerMessage.includes("phonescreen") || lowerMessage.includes("mock")) {
      return `Interview prep is a powerful way to build confidence.

**Start with fundamentals:**
• Master arrays, strings, and basic data structures
• Practice problem-solving step by step
• Write clean code and explain your thinking

**Interview habits:**
• Read the entire prompt before writing
• Start with a working solution, then optimize
• Use examples to validate your approach

**Practice resources:**
• LeetCode, CodeChef, HackerRank
• Mock interviews with friends or mentors
• Record your explanations and review them

Would you like a 30-day interview prep plan?`;
    }

    // Networking and communities
    if (lowerMessage.includes("network") || lowerMessage.includes("community") || lowerMessage.includes("connect") || lowerMessage.includes("mentor")) {
      return `Networking helps you discover opportunities faster.

**Easy ways to connect:**
• Join tech clubs, hackathons, and study groups
• Share your work on LinkedIn and GitHub
• Reach out to alumni, mentors, and recruiters

**Build rapport:**
• Be genuine and polite
• Ask clear questions or share useful updates
• Follow up with gratitude and progress notes

Need help drafting a networking message or mentor request?`;
    }

    // Scholarship related
    if (lowerMessage.includes("scholarship") || lowerMessage.includes("free") || lowerMessage.includes("certification")) {
      return `There are many scholarship and free learning opportunities for tech students!

**Current Scholarships:**
• Microsoft Learn Student Ambassador - Free certifications + community
• GitHub Campus Expert Program - Leadership training + swag
• Google Developer Student Clubs - Event funding

**Free Certifications:**
• Google IT Support (Coursera)
• Microsoft Azure Fundamentals
• AWS Cloud Practitioner
• Meta Frontend Developer
• IBM Data Science

**Financial Support Programs:**
• GitHub Student Developer Pack
• JetBrains Free Student License
• AWS Educate Credits
• Google Cloud Education Credits

**How to Maximize Benefits:**
1. Join multiple programs (no conflicts!)
2. Actively participate in communities
3. Share knowledge with peers
4. Build projects using free credits

Browse Scholarships in the Opportunities section!`;
    }

    // General/default response
    const defaultReplies = [
      `I understand you're asking about "${userMessage}". I can help with opportunity search, career roadmaps, project ideas, interview prep, or team building. What would you like to focus on?`,
      `Great question! I can suggest a learning path, portfolio project, resume update, or hackathon strategy. Tell me which one interests you most.`,
      `I can help with your next step in tech. Would you like advice on internships, project work, career planning, or interview prep?`,
    ];

    const randomResponse = (items: string[]) => items[Math.floor(Math.random() * items.length)];
    return randomResponse(defaultReplies);
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const hasApiKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY);
    if (hasApiKey) {
      try {
        return await sendGeminiMessage(userMessage);
      } catch (error) {
        console.error("Gemini API error:", error);
      }
    }

    return generateMockResponse(userMessage);
  };

  const sendChat = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(async () => {
      const response = await generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSend = async () => {
    await sendChat(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendChat(prompt);
  };

  const handleReset = () => {
    setMessages([welcomeMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col h-full border-0 shadow-none">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Career Assistant</CardTitle>
                <p className="text-sm text-purple-100">Ask about career advice, opportunities, teams, and skills.</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-white border-white/40 hover:bg-white/10"
            >
              New chat
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Quick Prompts */}
          <div className="p-4 bg-slate-50 border-b dark:bg-slate-950 dark:border-slate-800">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Get started quickly</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tap a prompt to ask instantly, or type your own question.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPromptGroups.flatMap((group) => group.prompts).map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-slate-900 dark:text-slate-100"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-slate-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white dark:bg-slate-950 dark:border-slate-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <Input
                placeholder="Ask me anything about opportunities, careers, skills..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>💡 Tip: Press Enter to send, or use one of the quick prompts.</span>
              <span>{isLoading ? "Generating a thoughtful reply..." : "Ready to help you move forward."}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

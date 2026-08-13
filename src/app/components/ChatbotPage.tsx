import { AIChatbot } from "./AIChatbot";
import { Sparkles, Zap, MessageSquare, Brain } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function ChatbotPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            AI Career Assistant
          </h1>
          <p className="text-gray-600 dark:text-slate-400">
            Get personalized career guidance powered by Gemini AI. Configure <code className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-1 rounded">VITE_GEMINI_API_KEY</code> in your .env for live responses, and install OpporTech as a PWA for offline access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chatbot */}
          <div className="lg:col-span-2">
            <div className="h-[700px] bg-white dark:bg-slate-950 rounded-lg shadow-lg overflow-hidden">
              <AIChatbot />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  What I Can Help With
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Opportunity Discovery</p>
                      <p className="text-xs text-gray-600 dark:text-slate-400">Find hackathons, contests, internships matching your profile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Career Guidance</p>
                      <p className="text-xs text-gray-600 dark:text-slate-400">Get personalized roadmaps for Web Dev, AI/ML, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Skill Development</p>
                      <p className="text-xs text-gray-600 dark:text-slate-400">Learn what skills to focus on and how to build them</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Team Building</p>
                      <p className="text-xs text-gray-600 dark:text-slate-400">Tips on finding teammates and collaborating effectively</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example Questions */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 dark:from-slate-900 dark:to-slate-950 dark:border-slate-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Example Questions
                </h3>
                <div className="space-y-2">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm text-gray-700 dark:text-slate-100">
                    "How do I prepare for my first hackathon?"
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm text-gray-700 dark:text-slate-100">
                    "What's the best career path for me as a 2nd year CS student?"
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm text-gray-700 dark:text-slate-100">
                    "Find beginner-friendly internships"
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm text-gray-700 dark:text-slate-100">
                    "How to improve my competitive programming skills?"
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm text-gray-700 dark:text-slate-100">
                    "What skills do I need to learn React?"
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Info */}
            <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-6 h-6" />
                  <h3 className="font-semibold">Powered by Gemini AI</h3>
                </div>
                <p className="text-sm text-purple-100">
                  Our AI assistant uses Google's Gemini to provide intelligent, 
                  context-aware responses to help you succeed in your tech career journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

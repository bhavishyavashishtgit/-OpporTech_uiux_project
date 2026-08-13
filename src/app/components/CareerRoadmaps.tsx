import { useState } from "react";
import { Code, Brain, Smartphone, Shield, Server, Database, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Progress } from "./ui/progress";
import { careerPaths } from "../data/mockData";

export function CareerRoadmaps() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0].id);

  const pathIcons: Record<string, any> = {
    "web-dev": Code,
    "ai-ml": Brain,
    "app-dev": Smartphone,
    "cybersecurity": Shield,
    "devops": Server,
    "data-science": Database,
  };

  const pathColors: Record<string, string> = {
    "web-dev": "from-blue-600 to-cyan-600",
    "ai-ml": "from-purple-600 to-pink-600",
    "app-dev": "from-green-600 to-teal-600",
    "cybersecurity": "from-red-600 to-orange-600",
    "devops": "from-gray-700 to-gray-900",
    "data-science": "from-indigo-600 to-blue-600",
  };

  const selectedCareerPath = careerPaths.find(p => p.id === selectedPath) || careerPaths[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Career Roadmaps</h1>
        <p className="text-gray-600 dark:text-slate-400">
          Step-by-step guides to master your chosen tech career path
        </p>
      </div>

      {/* Career Path Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {careerPaths.map((path) => {
          const Icon = pathIcons[path.id];
          const isSelected = selectedPath === path.id;
          
          return (
            <Card
              key={path.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? "ring-2 ring-blue-600 shadow-lg" : ""
              }`}
              onClick={() => setSelectedPath(path.id)}
            >
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-br ${pathColors[path.id]} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {path.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{path.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                <Button 
                  className="w-full" 
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected ? "Selected" : "View Roadmap"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roadmap Phases */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className={`bg-gradient-to-r ${pathColors[selectedPath]} text-white`}>
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const Icon = pathIcons[selectedPath];
                  return <Icon className="w-8 h-8" />;
                })()}
                <div>
                  <CardTitle className="text-2xl">{selectedCareerPath.title} Roadmap</CardTitle>
                  <CardDescription className="text-white/90">
                    12-month learning path to mastery
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 dark:text-slate-200 mb-6">{selectedCareerPath.description}</p>

              <Accordion type="single" collapsible className="w-full">
                {selectedCareerPath.roadmap.map((phase, index) => (
                  <AccordionItem key={index} value={`phase-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 text-left">
                        <div className={`w-8 h-8 bg-gradient-to-br ${pathColors[selectedPath]} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{phase.phase}</h4>
                          <p className="text-sm text-gray-500 dark:text-slate-400">{phase.duration}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-11 space-y-2">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3">Topics to Learn:</h5>
                        {phase.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-slate-200">{topic}</span>
                          </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
                          <Button size="sm" variant="outline">
                            Find Resources
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>Mark phases as you complete them</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="info-row mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Overall Progress</span>
                    <span className="justify-self-end text-sm font-medium text-gray-900 dark:text-white">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">1 of 4 phases completed</p>
                </div>
                <Button className="w-full">
                  Start Tracking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills You'll Master</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedCareerPath.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="info-row">
                  <span className="text-sm text-gray-600 dark:text-slate-400">Total Duration</span>
                  <span className="justify-self-end font-semibold text-gray-900 dark:text-white">12 months</span>
                </div>
                <div className="info-row">
                  <span className="text-sm text-gray-600 dark:text-slate-400">Phases</span>
                  <span className="justify-self-end font-semibold text-gray-900 dark:text-white">{selectedCareerPath.roadmap.length}</span>
                </div>
                <div className="info-row">
                  <span className="text-sm text-gray-600 dark:text-slate-400">Recommended Pace</span>
                  <span className="justify-self-end font-semibold text-gray-900 dark:text-white">10-15 hrs/week</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Opportunities</CardTitle>
              <CardDescription>Apply your skills here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedCareerPath.opportunities.map((opp, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-sm text-gray-700 dark:text-slate-200">
                    {opp}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Resources */}
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Need Learning Resources?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 text-sm mb-4">
                Get curated courses, tutorials, and project ideas for this career path.
              </p>
              <Button variant="secondary" className="w-full">
                Browse Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Consistent Learning</h4>
              <p className="text-sm text-gray-700 dark:text-slate-200">
                Dedicate 1-2 hours daily rather than cramming. Consistency beats intensity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Build Projects</h4>
              <p className="text-sm text-gray-700 dark:text-slate-200">
                Apply what you learn by building real projects. This solidifies your knowledge.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. Join Communities</h4>
              <p className="text-sm text-gray-700 dark:text-slate-200">
                Connect with others on the same path. Learn together, share resources, get help.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

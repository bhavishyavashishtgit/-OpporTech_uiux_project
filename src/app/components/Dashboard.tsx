import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, TrendingUp, Award, Zap, ArrowRight, Bell, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { fetchOpportunities, fetchUserProfile } from "../services/api";
import type { Opportunity, UserProfile } from "../data/mockData";

export function Dashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchOpportunities(), fetchUserProfile()]).then(([data, profile]) => {
      setOpportunities(data);
      setUserProfile(profile);
      setIsLoading(false);
    });
  }, []);

  const profileSkills = useMemo(() => userProfile?.skills ?? [], [userProfile?.skills]);
  const profileInterests = useMemo(() => userProfile?.interests ?? [], [userProfile?.interests]);

  const recommendedOpportunities = useMemo(
    () =>
      opportunities
        .map((opp) => {
          const skillMatches = opp.skills.filter((skill) =>
            profileSkills.some((userSkill) => skill.toLowerCase().includes(userSkill.toLowerCase())),
          ).length;
          const interestMatches = opp.tags.filter((tag) =>
            profileInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())),
          ).length;

          return {
            opp,
            score: skillMatches * 3 + interestMatches * 2 + (opp.level === "beginner" ? 2 : opp.level === "intermediate" ? 3 : 1),
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((item) => item.opp)
        .slice(0, 4),
    [opportunities, profileSkills, profileInterests],
  );

  const topOpportunity = useMemo(() => {
    return (
      opportunities
        .map((opp) => {
          const score =
            opp.skills.filter((skill) =>
              profileSkills.some((userSkill) => skill.toLowerCase().includes(userSkill.toLowerCase())),
            ).length * 3 +
            opp.tags.filter((tag) =>
              profileInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())),
            ).length * 2;
          return { opp, score };
        })
        .sort((a, b) => b.score - a.score)[0]?.opp || null
    );
  }, [opportunities, profileSkills, profileInterests]);

  const careerMatchScore = useMemo(() => {
    const skillMatchScore = opportunities.reduce(
      (total, opp) =>
        total +
        opp.skills.filter((skill) =>
          profileSkills.some((userSkill) => skill.toLowerCase().includes(userSkill.toLowerCase())),
        ).length,
      0,
    );

    const interestMatchScore = opportunities.reduce(
      (total, opp) =>
        total +
        opp.tags.filter((tag) =>
          profileInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())),
        ).length,
      0,
    );

    return Math.min(100, Math.max(55, Math.round((skillMatchScore * 9 + interestMatchScore * 7) / 5)));
  }, [opportunities, profileSkills, profileInterests]);

  if (isLoading || !userProfile) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center text-foreground">
        Loading dashboard...
      </div>
    );
  }

  // Upcoming deadlines
  const upcomingDeadlines = [...opportunities]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

  // Calculate days remaining
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Stats
  const stats = [
    {
      title: "Active Opportunities",
      value: opportunities.length,
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Expiring Soon",
      value: upcomingDeadlines.filter(o => getDaysRemaining(o.deadline) <= 7).length,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "For You",
      value: recommendedOpportunities.length,
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "This Month",
      value: opportunities.filter(o => new Date(o.deadline).getMonth() === 3).length,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-fuchsia-600 via-violet-600 to-sky-500 p-8 text-white shadow-2xl shadow-fuchsia-500/20">
          <div className="absolute inset-0 bg-box-grid opacity-35 pointer-events-none" />
          <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-8 left-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 grid gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-white/75 mb-3">
                  {userProfile.branch} • Year {userProfile.year}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Welcome back, {userProfile.name}!
                </h1>
                <p className="mt-3 max-w-xl text-base sm:text-lg text-white/85">
                  You have {upcomingDeadlines.filter(o => getDaysRemaining(o.deadline) <= 3).length} opportunities expiring soon. Stay on track with your tech journey.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass-card rounded-3xl border p-5 shadow-xl shadow-slate-900/10 text-white">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-white/70">
                          {stat.title}
                        </p>
                        <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
                      </div>
                      <div className={`${stat.bgColor} ${stat.color} p-3 rounded-2xl`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <Card className="rounded-3xl border border-slate-200 bg-white/90 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-white p-6">
          <CardHeader>
            <CardTitle className="text-lg">AI Opportunity Score</CardTitle>
            <CardDescription>How closely current opportunities align with your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-4xl font-semibold text-slate-900 dark:text-white">{careerMatchScore}%</p>
              <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">{recommendedOpportunities.length} matched</Badge>
            </div>
            <Progress value={careerMatchScore} />
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Personalized match score based on skills, interests and opportunity relevance.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white/90 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-white p-6">
          <CardHeader>
            <CardTitle className="text-lg">Top Recommended Opportunity</CardTitle>
            <CardDescription>We suggest this based on your current strengths.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {topOpportunity ? (
              <>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{topOpportunity.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-300">{topOpportunity.organizer}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {topOpportunity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>{getDaysRemaining(topOpportunity.deadline)} days left</span>
                  <Link to={`/opportunities/${topOpportunity.id}`}>
                    <Button size="sm">View Opportunity</Button>
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-300">No top recommendation found yet. Update your profile to get stronger matches.</p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white/90 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-white p-6">
          <CardHeader>
            <CardTitle className="text-lg">Career Growth Plan</CardTitle>
            <CardDescription>Next actions to boost your path this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p>• Visit Roadmaps to compare career paths and phase goals.</p>
              <p>• Use AI Assistant for guided resume and interview prep.</p>
              <p>• Apply to internships with skills you already know.</p>
            </div>
            <Link to="/roadmaps">
              <Button className="w-full">View Roadmaps</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
            <p className="text-sm text-gray-600">Based on your profile: {userProfile.branch}, Year {userProfile.year}</p>
          </div>
          <Link to="/opportunities">
            <Button variant="ghost">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedOpportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`
                    ${opp.type === 'hackathon' ? 'bg-purple-100 text-purple-700' : ''}
                    ${opp.type === 'contest' ? 'bg-blue-100 text-blue-700' : ''}
                    ${opp.type === 'internship' ? 'bg-green-100 text-green-700' : ''}
                    ${opp.type === 'scholarship' ? 'bg-orange-100 text-orange-700' : ''}
                    ${opp.type === 'workshop' ? 'bg-pink-100 text-pink-700' : ''}
                  `}>
                    {opp.type}
                  </Badge>
                  {getDaysRemaining(opp.deadline) <= 3 && (
                    <Badge variant="destructive" className="animate-pulse">
                      {getDaysRemaining(opp.deadline)}d left
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{opp.title}</CardTitle>
                <CardDescription className="line-clamp-2">{opp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Deadline: {new Date(opp.deadline).toLocaleDateString()}
                  </div>
                  {opp.prize && (
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <Award className="w-4 h-4 mr-2" />
                      {opp.prize}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {opp.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Link to={`/opportunities/${opp.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Don't miss these opportunities</CardDescription>
            </div>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((opp) => {
              const daysLeft = getDaysRemaining(opp.deadline);
              const isUrgent = daysLeft <= 3;
              
              return (
                <div key={opp.id} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{opp.title}</h4>
                      <Badge variant="outline" className="text-xs">{opp.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{opp.organizer}</p>
                  </div>
                  <div className="text-right ml-0 sm:ml-4">
                    <p className={`text-sm font-medium ${isUrgent ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Today'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {new Date(opp.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/opportunities/${opp.id}`} className="ml-0 sm:ml-4 self-start">
                    <Button size="sm" variant={isUrgent ? "default" : "outline"}>
                      View
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Career Assistant
            </CardTitle>
            <CardDescription className="text-purple-100">
              Get personalized guidance powered by Gemini AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/ai-assistant">
              <Button variant="secondary" className="w-full">
                Chat with AI
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle>Find Your Team</CardTitle>
            <CardDescription className="text-blue-100">
              Connect with talented students for hackathons and projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/team-finder">
              <Button variant="secondary" className="w-full">
                Browse Team Members
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white">
          <CardHeader>
            <CardTitle>Plan Your Career</CardTitle>
            <CardDescription className="text-green-100">
              Explore roadmaps for Web Dev, AI/ML, App Dev, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/roadmaps">
              <Button variant="secondary" className="w-full">
                View Roadmaps
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
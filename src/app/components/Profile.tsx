import { useEffect, useState } from "react";
import { User, Mail, GraduationCap, Calendar, Award, Bookmark, Settings, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { fetchUserProfile } from "../services/api";
import type { UserProfile } from "../data/mockData";

interface BackendUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  interests: string[];
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<BackendUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setProfile(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !profile) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center text-foreground">
        Loading profile...
      </div>
    );
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
          <p className="text-gray-600 dark:text-slate-400">Manage your account and preferences</p>
        </div>

        {/* Profile Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600">
                <AvatarFallback className="text-white text-3xl font-bold">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{profile.name}</h2>
                <p className="text-gray-600 dark:text-slate-400 mb-2">{profile.email}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="secondary">
                    {profile.branch}
                  </Badge>
                  <Badge variant="secondary">
                    Year {profile.year}
                  </Badge>
                  <Badge variant="outline">
                    {profile.college}
                  </Badge>
                </div>
              </div>

              <Button 
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2"
              >
                {isEditing ? <Settings className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and academic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                      <Input
                        id="college"
                        value={profile.college}
                        onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch/Stream</Label>
                    <Input
                      id="branch"
                      value={profile.branch}
                      onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Current Year</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                      <Input
                        id="year"
                        type="number"
                        min="1"
                        max="4"
                        value={profile.year}
                        onChange={(e) => setProfile({ ...profile, year: parseInt(e.target.value) })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Technologies and tools you're proficient in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm">
                      {skill}
                      {isEditing && (
                        <button 
                          className="ml-2 hover:text-red-600"
                          onClick={() => {
                            setProfile({
                              ...profile,
                              skills: profile.skills.filter((_, i) => i !== idx)
                            });
                          }}
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Add Skill
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Interests Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Interests</CardTitle>
                <CardDescription>Areas you're interested in exploring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.interests.map((interest, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {interest}
                      {isEditing && (
                        <button 
                          className="ml-2 hover:text-red-600"
                          onClick={() => {
                            setProfile({
                              ...profile,
                              interests: profile.interests.filter((_, i) => i !== idx)
                            });
                          }}
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Add Interest
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates about opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Deadline Reminders</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Get notified 1-3 days before deadlines</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">New Opportunities</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Email when new relevant opportunities are posted</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Team Requests</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Notify when someone wants to connect</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Weekly Digest</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Summary of opportunities every Sunday</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Opportunity Filters</CardTitle>
                <CardDescription>Customize what types of opportunities you see</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Hackathons</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Coding Contests</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Internships</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Scholarships</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="info-row p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Workshops</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Bookmark className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">8</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Saved Opportunities</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Applications Submitted</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">12</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Deadlines Tracked</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Saved "Smart India Hackathon 2026"</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Applied to "Google Summer of Code 2026"</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Connected with Rahul Sharma on Team Finder</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Started tracking "Web Development" roadmap</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

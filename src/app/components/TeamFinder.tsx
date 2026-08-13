import { useEffect, useState } from "react";
import { Search, Users, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { teamMembers } from "../data/mockData";

export function TeamFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    }

    return () => observer.disconnect();
  }, []);
  const panelClasses = isDarkMode
    ? "bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6"
    : "bg-white p-4 rounded-lg border border-slate-200 mb-6";
  const infoCardClasses = isDarkMode
    ? "mb-6 bg-slate-900 border border-slate-800"
    : "mb-6 bg-slate-50 border border-slate-200";
  const memberCardClasses = isDarkMode
    ? "hover:shadow-lg transition-shadow bg-slate-950 border border-slate-800"
    : "hover:shadow-lg transition-shadow bg-white border border-slate-200";
  const textPrimaryClass = isDarkMode ? "text-slate-100" : "text-slate-950";
  const textSecondaryClass = isDarkMode ? "text-slate-300" : "text-slate-600";
  const textAltClass = isDarkMode ? "text-slate-400" : "text-slate-500";
  const badgeBorderClass = isDarkMode ? "border-slate-700" : "border-slate-200";
  const controlBgClass = isDarkMode
    ? "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-400"
    : "bg-white border-slate-200 text-slate-950 placeholder:text-slate-500";
  const selectContentClass = isDarkMode
    ? "bg-slate-950 border-slate-800 text-slate-100"
    : "bg-white border-slate-200 text-slate-950";
  const detailBoxClass = isDarkMode
    ? "bg-slate-900 p-3 rounded-lg border border-slate-800"
    : "bg-slate-50 p-3 rounded-lg border border-slate-200";

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBranch = branchFilter === "all" || member.branch === branchFilter;
    const matchesYear = yearFilter === "all" || member.year.toString() === yearFilter;

    return matchesSearch && matchesBranch && matchesYear;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    return colors[parseInt(id) % colors.length];
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${textPrimaryClass}`}>Team Finder</h1>
        <p className={textSecondaryClass}>
          Connect with talented students for hackathons, projects, and competitions
        </p>
      </div>

      {/* Search and Filters */}
      <div className={panelClasses}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by name, skills, or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${controlBgClass}`}
              />
            </div>
          </div>
          <div>
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className={controlBgClass}>
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Computer Applications">Computer Applications</SelectItem>
                <SelectItem value="Electronics & Computer">Electronics & Computer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className={controlBgClass}>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className={`${textAltClass} text-sm mt-4`}>
          Showing {filteredMembers.length} of {teamMembers.length} members
        </p>
      </div>

      {/* Info Banner */}
      <Card className={infoCardClasses}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`font-semibold mb-1 ${textPrimaryClass}`}>How Team Finder Works</h3>
              <p className={`${textSecondaryClass} text-sm mb-3`}>
                Browse through students looking for team members, filter by skills and interests, 
                and connect with potential teammates for your next hackathon or project.
              </p>
              <div className="flex gap-3">
                <Button size="sm">Create Your Profile</Button>
                <Button size="sm" variant="outline">Post Team Requirement</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className={memberCardClasses}>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className={`w-16 h-16 ${getAvatarColor(member.id)}`}>
                  <AvatarFallback className="text-white text-lg font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className={`text-lg mb-1 ${textPrimaryClass}`}>{member.name}</CardTitle>
                  <CardDescription className={`text-sm ${textSecondaryClass}`}>
                    {member.branch}
                  </CardDescription>
                  <Badge variant="outline" className={`mt-1 ${textAltClass} ${badgeBorderClass}`}>
                    Year {member.year}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm font-medium mb-2 ${textPrimaryClass}`}>Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className={`text-sm font-medium mb-2 ${textPrimaryClass}`}>Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest, idx) => (
                      <Badge key={idx} variant="outline" className={`text-xs ${textAltClass} ${badgeBorderClass}`}>
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className={detailBoxClass}>
                  <p className={`text-sm ${textSecondaryClass}`}>{member.lookingFor}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-200">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className={emptyIconClass} />
          <p className={emptyTextClass}>No team members found matching your criteria.</p>
          <p className={emptySubTextClass}>Try adjusting your filters or search query.</p>
        </div>
      )}

      {/* Create Profile CTA */}
      <Card className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Want to Join as a Team Member?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Create your profile to showcase your skills and connect with other students 
            looking for team members. Get discovered by teams working on exciting projects!
          </p>
          <Button size="lg" variant="secondary">
            Create Your Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Calendar, Award, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { fetchOpportunities } from "../services/api";
import type { Opportunity } from "../data/mockData";

export function Opportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities().then((data) => {
      setOpportunities(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center text-foreground">
        Loading opportunities...
      </div>
    );
  }

  // Filter opportunities

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    const matchesLevel = levelFilter === "all" || opp.level === levelFilter;
    
    return matchesSearch && matchesType && matchesLevel;
  });

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Group by type
  const hackathons = filteredOpportunities.filter(o => o.type === "hackathon");
  const contests = filteredOpportunities.filter(o => o.type === "contest");
  const internships = filteredOpportunities.filter(o => o.type === "internship");
  const scholarships = filteredOpportunities.filter(o => o.type === "scholarship");
  const workshops = filteredOpportunities.filter(o => o.type === "workshop");

  const OpportunityCard = ({ opp }: { opp: typeof opportunities[0] }) => {
    const daysLeft = getDaysRemaining(opp.deadline);
    const isUrgent = daysLeft <= 3;

    return (
      <Card className="hover:shadow-lg transition-shadow">
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
            <Badge variant={opp.level === "beginner" ? "outline" : opp.level === "intermediate" ? "secondary" : "default"}>
              {opp.level}
            </Badge>
          </div>
          <CardTitle className="text-lg">{opp.title}</CardTitle>
          <CardDescription className="line-clamp-2">{opp.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            <div className="info-row text-sm">
              <span className="text-gray-600 dark:text-slate-400">Organizer:</span>
              <span className="justify-self-end font-medium text-gray-900 dark:text-white">{opp.organizer}</span>
            </div>
            <div className="info-row text-sm">
              <span className="text-gray-600 dark:text-slate-400 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Deadline:
              </span>
              <span className={`justify-self-end font-medium ${isUrgent ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                {new Date(opp.deadline).toLocaleDateString()} ({daysLeft}d)
              </span>
            </div>
            {opp.prize && (
              <div className="info-row text-sm">
                <span className="text-gray-600 flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Prize:
                </span>
                <span className="justify-self-end font-medium text-green-600">{opp.prize}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {opp.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Link to={`/opportunities/${opp.id}`}>
            <Button className="w-full">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Opportunities</h1>
        <p className="text-gray-600 dark:text-slate-400">
          Discover hackathons, contests, internships, scholarships, and workshops
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hackathon">Hackathons</SelectItem>
                <SelectItem value="contest">Contests</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                <SelectItem value="scholarship">Scholarships</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Filter className="w-4 h-4 text-gray-500 dark:text-slate-400" />
          <span className="text-sm text-gray-600 dark:text-slate-400">
            Showing {filteredOpportunities.length} of {opportunities.length} opportunities
          </span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({filteredOpportunities.length})</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons ({hackathons.length})</TabsTrigger>
          <TabsTrigger value="contests">Contests ({contests.length})</TabsTrigger>
          <TabsTrigger value="internships">Internships ({internships.length})</TabsTrigger>
          <TabsTrigger value="other">Other ({scholarships.length + workshops.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-slate-400">No opportunities found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="hackathons">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contests">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="internships">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...scholarships, ...workshops].map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

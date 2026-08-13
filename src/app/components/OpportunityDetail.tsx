import { useParams, Link, useNavigate } from "react-router";
import { Calendar, Award, MapPin, Users, ExternalLink, Clock, ArrowLeft, Share2, Bookmark, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { opportunities } from "../data/mockData";

export function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Opportunity not found</h2>
        <Link to="/opportunities">
          <Button>Back to Opportunities</Button>
        </Link>
      </div>
    );
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysRemaining(opportunity.deadline);
  const isUrgent = daysLeft <= 3;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`
                  ${opportunity.type === 'hackathon' ? 'bg-purple-100 text-purple-700' : ''}
                  ${opportunity.type === 'contest' ? 'bg-blue-100 text-blue-700' : ''}
                  ${opportunity.type === 'internship' ? 'bg-green-100 text-green-700' : ''}
                  ${opportunity.type === 'scholarship' ? 'bg-orange-100 text-orange-700' : ''}
                  ${opportunity.type === 'workshop' ? 'bg-pink-100 text-pink-700' : ''}
                `}>
                  {opportunity.type}
                </Badge>
                <Badge variant={opportunity.level === "beginner" ? "outline" : opportunity.level === "intermediate" ? "secondary" : "default"}>
                  {opportunity.level}
                </Badge>
                {opportunity.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-3xl mb-2">{opportunity.title}</CardTitle>
              <CardDescription className="text-base">
                Organized by {opportunity.organizer}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">{opportunity.description}</p>
              
              <div className="flex gap-3">
                <a href={opportunity.registrationLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Deadline
                  </h4>
                  <p className={`text-gray-700 ${isUrgent ? 'text-red-600 font-semibold' : ''}`}>
                    {new Date(opportunity.deadline).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {isUrgent && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Only {daysLeft} days remaining!
                    </p>
                  )}
                </div>

                {opportunity.prize && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-gray-500" />
                      Prize / Compensation
                    </h4>
                    <p className="text-green-600 font-semibold">{opportunity.prize}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Eligibility</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.eligibility.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hackathon Support Section */}
          {opportunity.type === "hackathon" && (
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Preparation Guide</CardTitle>
                <CardDescription>Tips to help you succeed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">1. Form Your Team</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Most hackathons require teams of 2-4 members. Make sure to have diverse skills.
                    </p>
                    <Link to="/team-finder">
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Find Team Members
                      </Button>
                    </Link>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">2. Brainstorm Ideas</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Focus on solving real-world problems</li>
                      <li>Keep it simple and achievable in the time limit</li>
                      <li>Think about the impact and scalability</li>
                      <li>Consider the judging criteria</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">3. Prepare Your Pitch</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Problem statement (30 seconds)</li>
                      <li>Your solution (1 minute)</li>
                      <li>Demo (2-3 minutes)</li>
                      <li>Business model/Impact (30 seconds)</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">4. Tools & Resources</h4>
                    <p className="text-sm text-gray-700">
                      Make sure you have your development environment ready, GitHub repo set up, 
                      and all necessary APIs/services tested before the hackathon begins.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card className={isUrgent ? "border-red-300 bg-red-50" : ""}>
            <CardHeader>
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="info-row">
                <span className="text-sm text-gray-600">Time Remaining</span>
                <span className={`justify-self-end text-right font-semibold ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                  {daysLeft > 0 ? `${daysLeft} days` : 'Today'}
                </span>

                <span className="text-sm text-gray-600">Difficulty</span>
                <span className="justify-self-end text-right">
                  <Badge variant={opportunity.level === "beginner" ? "outline" : opportunity.level === "intermediate" ? "secondary" : "default"}>
                    {opportunity.level}
                  </Badge>
                </span>

                <span className="text-sm text-gray-600">Type</span>
                <span className="justify-self-end text-right">
                  <Badge>{opportunity.type}</Badge>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Reminder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Set Reminder</CardTitle>
              <CardDescription>Get notified before the deadline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                1 day before
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                3 days before
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                1 week before
              </Button>
            </CardContent>
          </Card>

          {/* Similar Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {opportunities
                .filter(o => o.type === opportunity.type && o.id !== opportunity.id)
                .slice(0, 3)
                .map(opp => (
                  <Link key={opp.id} to={`/opportunities/${opp.id}`}>
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{opp.title}</h4>
                      <p className="text-xs text-gray-600">{opp.organizer}</p>
                    </div>
                  </Link>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

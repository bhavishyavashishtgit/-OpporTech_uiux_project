import {
  opportunities,
  teamMembers,
  careerPaths,
  defaultUserProfile,
  type Opportunity,
  type TeamMember,
  type CareerPath,
  type UserProfile,
} from "../data/mockData";
import { getToken } from "./auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let cachedOpportunities: Opportunity[] | null = null;
let cachedTeamMembers: TeamMember[] | null = null;
let cachedCareerPaths: CareerPath[] | null = null;
let cachedUserProfile: UserProfile | null = null;

export async function fetchOpportunities(): Promise<Opportunity[]> {
  if (cachedOpportunities) return cachedOpportunities;
  await delay(250);
  cachedOpportunities = opportunities;
  return cachedOpportunities;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (cachedTeamMembers) return cachedTeamMembers;
  await delay(250);
  cachedTeamMembers = teamMembers;
  return cachedTeamMembers;
}

export async function fetchCareerPaths(): Promise<CareerPath[]> {
  if (cachedCareerPaths) return cachedCareerPaths;
  await delay(250);
  cachedCareerPaths = careerPaths;
  return cachedCareerPaths;
}

export async function fetchUserProfile(): Promise<UserProfile> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.json();
    return {
      id: data.user.id,
      name: data.user.name || "Unknown User",
      email: data.user.email,
      skills: data.user.skills || [],
      interests: data.user.interests || [],
      role: data.user.role,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // Fallback to mock data if API fails
    await delay(250);
    const fallback = cachedUserProfile || defaultUserProfile;
    return {
      id: fallback.id || "unknown",
      name: fallback.name,
      email: fallback.email,
      skills: fallback.skills,
      interests: fallback.interests,
      role: fallback.role || "user",
    };
  }
}

export async function fetchDashboardData(): Promise<{ opportunities: Opportunity[]; userProfile: UserProfile }> {
  const [opps, profile] = await Promise.all([fetchOpportunities(), fetchUserProfile()]);
  return {
    opportunities: opps,
    userProfile: profile,
  };
}

export async function sendGeminiMessage(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = import.meta.env.VITE_GEMINI_API_URL ?? "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate";

  if (!apiKey) {
    throw new Error("Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file.");
  }

  const response = await fetch(`${apiUrl}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: { text: prompt },
      temperature: 0.8,
      maxOutputTokens: 512,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Gemini API error", data);
    throw new Error(data.error?.message || "Gemini API request failed");
  }

  return (
    data?.candidates?.[0]?.output ||
    data?.outputText ||
    data?.response ||
    data?.candidates?.[0]?.content ||
    "Sorry, I couldn't generate a response."
  );
}

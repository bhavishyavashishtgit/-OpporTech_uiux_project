import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { ErrorPage } from "./components/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Dashboard = lazy(() => import("./components/Dashboard").then((module) => ({ default: module.Dashboard })));
const Opportunities = lazy(() => import("./components/Opportunities").then((module) => ({ default: module.Opportunities })));
const TeamFinder = lazy(() => import("./components/TeamFinder").then((module) => ({ default: module.TeamFinder })));
const CareerRoadmaps = lazy(() => import("./components/CareerRoadmaps").then((module) => ({ default: module.CareerRoadmaps })));
const Profile = lazy(() => import("./components/Profile").then((module) => ({ default: module.Profile })));
const OpportunityDetail = lazy(() => import("./components/OpportunityDetail").then((module) => ({ default: module.OpportunityDetail })));
const ChatbotPage = lazy(() => import("./components/ChatbotPage").then((module) => ({ default: module.ChatbotPage })));
const AdminPortal = lazy(() => import("./components/AdminPortal").then((module) => ({ default: module.AdminPortal })));
const Login = lazy(() => import("./components/Login").then((module) => ({ default: module.Login })));
const Signup = lazy(() => import("./components/Signup").then((module) => ({ default: module.Signup })));
const NotFound = lazy(() => import("./components/NotFound").then((module) => ({ default: module.NotFound })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "opportunities",
        element: (
          <ProtectedRoute>
            <Opportunities />
          </ProtectedRoute>
        ),
      },
      {
        path: "opportunities/:id",
        element: (
          <ProtectedRoute>
            <OpportunityDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "team-finder",
        element: (
          <ProtectedRoute>
            <TeamFinder />
          </ProtectedRoute>
        ),
      },
      {
        path: "roadmaps",
        element: (
          <ProtectedRoute>
            <CareerRoadmaps />
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-assistant",
        element: (
          <ProtectedRoute>
            <ChatbotPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPortal />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "*", Component: NotFound },
]);

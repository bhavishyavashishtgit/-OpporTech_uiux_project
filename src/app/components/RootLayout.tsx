import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Home, Search, Users, Map, User, Bell, X, Menu, Sparkles, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { FloatingChatButton } from "./FloatingChatButton";

export function RootLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("opportech-theme");
      return savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("opportech-theme", theme);
  }, [theme]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/opportunities", label: "Opportunities", icon: Search },
    { path: "/team-finder", label: "Team Finder", icon: Users },
    { path: "/roadmaps", label: "Career Roadmaps", icon: Map },
    { path: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
    { path: "/admin", label: "Admin Portal", icon: ShieldCheck },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: "1",
      title: "New application received",
      description: "A student applied for your DevOps collaboration request.",
      time: "5 mins ago",
    },
    {
      id: "2",
      title: "Hackathon reminder",
      description: "Smart India Hackathon starts tomorrow at 10 AM.",
      time: "21 mins ago",
    },
    {
      id: "3",
      title: "Profile update suggestion",
      description: "Add your latest project to the Portfolio section.",
      time: "1 hour ago",
    },
  ];

  const isDark = theme === "dark";
  const navInactiveClasses = isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100";
  const headerClasses = isDark
    ? "sticky top-0 z-40 bg-slate-950 border-b border-slate-800 text-slate-100"
    : "sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900";
  const sheetClasses = isDark
    ? "w-[min(80vw,18rem)] p-4 bg-slate-950 text-slate-100"
    : "w-[min(80vw,18rem)] p-4 bg-white text-slate-900";
  const sidebarClasses = isDark
    ? "hidden lg:block w-64 min-h-screen border-r border-slate-800 bg-slate-950 p-4 text-slate-100"
    : "hidden lg:block w-64 min-h-screen border-r border-slate-200 bg-white p-4 text-slate-900";
  const iconButtonClasses = isDark ? "text-slate-100" : "text-slate-900";

  const brandTitleClass = isDark ? "text-white" : "text-slate-900";
  const brandSubtitleClass = isDark ? "text-slate-400" : "text-slate-500";

  const NavContent = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              active
                ? "bg-sky-600 text-white"
                : navInactiveClasses
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={headerClasses}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 h-16">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden p-3 bg-white/90 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl"
                    aria-label="Open navigation menu"
                  >
                    <Menu className={`w-6 h-6 ${iconButtonClasses}`} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={sheetClasses}>
                  <div className="flex flex-col gap-2 mt-8">
                    <NavContent />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className={`text-xl font-bold ${brandTitleClass}`}>OpporTech</h1>
                  <p className={`text-xs ${brandSubtitleClass}`}>Technical Opportunity Hub</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={iconButtonClasses}
                aria-label="Toggle light and dark mode"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsNotificationsOpen((prev) => !prev)}
                  className={`relative ${iconButtonClasses}`}
                  aria-label="Open notifications"
                >
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500">
                    {notifications.length}
                  </Badge>
                </Button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        aria-label="Close notifications"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="max-h-[340px] overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{notification.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.description}</p>
                          <p className="text-[11px] uppercase text-slate-400 dark:text-slate-500 mt-2">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 text-sm dark:border-slate-800 dark:bg-slate-900">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="w-full"
                      >
                        View all activity
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Sidebar - Desktop */}
        <aside className={sidebarClasses}>
          <nav className="flex flex-col gap-2 sticky top-20" aria-label="Primary navigation">
            <NavContent />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-h-screen px-4 py-6 pb-28 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="py-20 text-center text-slate-600 dark:text-slate-300">Loading page...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-xl shadow-slate-950/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.label}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-3xl px-2 py-2 text-center text-[11px] transition-all ${
                  active ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}
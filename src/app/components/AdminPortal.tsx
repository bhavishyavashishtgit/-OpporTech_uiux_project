import { useState } from "react";
import { ShieldCheck, UserCircle2, Bell, LayoutGrid, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const ADMIN_EMAIL = "admin@opportech.com";
const ADMIN_PASSWORD = "Admin123!";

export function AdminPortal() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError("");
      setIsAuthenticated(true);
      return;
    }

    setError("Invalid admin credentials. Use the preview login details.");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
          <CardHeader>
            <CardTitle className="text-3xl">Admin Portal Preview</CardTitle>
            <CardDescription>
              Admin users can log in here to review site metrics, user requests, and system health.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Admin email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Preview credentials: <span className="font-semibold">admin@opportech.com</span> / <span className="font-semibold">Admin123!</span>
                </p>

                <Button type="submit" className="w-full">
                  Login as Admin
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-900">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Welcome, Admin</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    You can manage preview data, monitor platform activity, and approve important requests.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Pending Requests</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">8</p>
                      </div>
                      <Bell className="w-6 h-6 text-sky-600" />
                    </div>
                  </Card>
                  <Card className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Active Users</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">1,320</p>
                      </div>
                      <UserCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                  </Card>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">System Health</p>
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">Online</Badge>
                      </div>
                      <LayoutGrid className="w-6 h-6 text-emerald-600" />
                    </div>
                  </Card>
                  <Card className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Security Alerts</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">2</p>
                      </div>
                      <ShieldAlert className="w-6 h-6 text-orange-600" />
                    </div>
                  </Card>
                </div>

                <Button variant="outline" onClick={handleLogout} className="w-full">
                  Sign out
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
            <CardHeader>
              <CardTitle className="text-lg">Admin Preview Notes</CardTitle>
              <CardDescription>
                This preview is intended to show how an admin can authenticate and monitor core platform metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>• Use the preview credentials above to inspect dashboard state.</p>
                <p>• Admins can view pending approvals, user activity, and security alerts.</p>
                <p>• This is a prototype screen and does not yet manage real backend data.</p>
              </div>
              <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Preview Mode</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login, saveToken } from "../services/auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login({ email, password });
      saveToken(result.token);
      navigate("/");
    } catch (submitError) {
      let message = "Login failed.";
      if (axios.isAxiosError(submitError)) {
        message = submitError.response?.data?.message || submitError.message || message;
      } else if (submitError instanceof Error) {
        message = submitError.message;
      }
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sign in to access your dashboard.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="mt-2"
            />
          </div>

          {error && <p className="text-sm text-destructive-600 dark:text-destructive-400">{error}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          New here? <Link to="/signup" className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

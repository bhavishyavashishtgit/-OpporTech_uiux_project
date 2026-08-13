import { Link } from "react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
          <AlertCircle className="h-10 w-10" />
        </div>
        <div className="mt-8 max-w-md">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Page not found
          </h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            The page you are looking for does not exist or has been moved. Use the navigation menu to go back to the OpporTech dashboard.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/">
              <Button>
                Go back home
                <ArrowLeft className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

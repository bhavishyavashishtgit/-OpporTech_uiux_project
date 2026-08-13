import { useRouteError } from "react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

export function ErrorPage() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : "Something went wrong.";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">Unexpected Error</h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{message}</p>
        <div className="mt-8">
          <Link to="/">
            <Button>
              Go back home
              <ArrowLeft className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

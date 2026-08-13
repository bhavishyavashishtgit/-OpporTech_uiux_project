import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { AIChatbot } from "./AIChatbot";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-8 sm:right-6 sm:left-auto w-full max-w-md max-h-[90vh] z-50 shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800">
          <div className="h-full min-h-[22rem] flex flex-col">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <h3 className="font-semibold">AI Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AIChatbot />
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl transition-all z-50 group"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </Button>
      )}
    </>
  );
}

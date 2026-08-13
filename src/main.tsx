
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      () => {
        console.log('OpporTech service worker registered.');
      },
    ).catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);

import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setDisplayed(text.slice(0, current));
      if (current >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [text, speed]);

  return displayed;
}

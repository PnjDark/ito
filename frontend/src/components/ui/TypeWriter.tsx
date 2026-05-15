"use client";

import { useEffect, useState } from "react";

export function TypeWriter({
  text,
  speed = 30,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);
    return () => window.clearInterval(interval);
  }, [text, speed]);

  return <p className={`whitespace-pre-line text-sm leading-7 ${className}`}>{displayed}</p>;
}

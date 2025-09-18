"use client";

import type { JSX } from "react";

import { useEffect, useState } from "react";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const defFunc = () => null;

function ThemeOption({
  icon,
  value,
  isActive,
  onClick = defFunc,
}: {
  icon: JSX.Element;
  value: string;
  isActive?: boolean;
  onClick?: (value: string) => void;
}) {
  return (
    <button
      aria-checked={isActive}
      aria-label={`Switch to ${value} theme`}
      className={cn(
        "relative flex size-8 cursor-default items-center justify-center  transition-all [&_svg]:size-4 rounded-full",
        isActive ? "bg-muted text-primary" : "text-foreground hover:bg-muted",
      )}
      role="radio"
      type="button"
      onClick={() => onClick(value)}
    >
      {icon}

      {isActive && (
        <motion.div
          className="border-primary absolute inset-0 rounded-full border"
          layoutId="theme-option"
          transition={{ type: "keyframes", duration: 0.3 }}
        />
      )}
    </button>
  );
}

const THEME_OPTIONS = [
  {
    icon: <IconDeviceDesktop />,
    value: "system",
  },
  {
    icon: <IconSun />,
    value: "light",
  },
  {
    icon: <IconMoon />,
    value: "dark",
  },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return <Fallback />;
  }

  return (
    <div
      className="bg-background ring-muted inline-flex items-center overflow-hidden rounded-full ring-1 "
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.value}
          icon={option.icon}
          isActive={theme === option.value}
          value={option.value}
          onClick={setTheme}
        />
      ))}
    </div>
  );
}

function Fallback() {
  return (
    <div
      className="bg-background ring-accent inline-flex items-center overflow-hidden rounded ring-1 ring-inset"
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.value}
          icon={option.icon}
          value={option.value}
        />
      ))}
    </div>
  );
}

export { ThemeSwitcher as ThemeSwitch };

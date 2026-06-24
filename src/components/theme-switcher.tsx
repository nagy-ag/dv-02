"use client";

import { Moon, Sun } from "lucide-react";
import {
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
type ToggleEvent =
  | ReactMouseEvent<HTMLButtonElement>
  | ReactKeyboardEvent<HTMLButtonElement>;

type ViewTransitionHandle = {
  ready: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

const storageKey = "scale-button-theme";
const transitionDuration = 820;
const transitionEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
const themeListeners = new Set<() => void>();
let currentTheme: Theme = "light";

function preferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const themeColor = theme === "dark" ? "#050505" : "#f5f5f2";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColor);
}

function getThemeSnapshot() {
  return currentTheme;
}

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);

  if (typeof window !== "undefined") {
    const initial = preferredTheme();
    applyTheme(initial);

    if (currentTheme !== initial) {
      currentTheme = initial;
      queueMicrotask(listener);
    }
  }

  return () => {
    themeListeners.delete(listener);
  };
}

function commitTheme(nextTheme: Theme) {
  currentTheme = nextTheme;
  applyTheme(nextTheme);
  window.localStorage.setItem(storageKey, nextTheme);
  for (const listener of themeListeners) {
    listener();
  }
}

function toggleOrigin(target: HTMLButtonElement) {
  const rect = target.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function revealRadius(x: number, y: number) {
  return Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  );
}

function pauseAmbientAnimationDuringTransition() {
  document.documentElement.dataset.themeTransition = "active";
  window.setTimeout(() => {
    delete document.documentElement.dataset.themeTransition;
  }, transitionDuration + 120);
}

type ThemeSwitcherProps = {
  label: string;
};

export function ThemeSwitcher({ label }: ThemeSwitcherProps) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeSnapshot,
  );
  const isDark = theme === "dark";

  const toggleTheme = (event: ToggleEvent) => {
    const nextTheme = isDark ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const documentWithTransition = document as DocumentWithViewTransition;

    if (!documentWithTransition.startViewTransition || prefersReducedMotion) {
      commitTheme(nextTheme);
      return;
    }

    pauseAmbientAnimationDuringTransition();

    const { x, y } = toggleOrigin(event.currentTarget);
    const radius = revealRadius(x, y);

    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(() => commitTheme(nextTheme));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: transitionDuration,
          easing: transitionEasing,
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-switcher__track" aria-hidden="true">
        <span
          className="theme-switcher__thumb"
          data-theme-thumb={isDark ? "dark" : "light"}
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </span>
      </span>
    </button>
  );
}

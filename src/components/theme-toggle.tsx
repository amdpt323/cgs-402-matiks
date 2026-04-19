import { MoonStar, SunMedium } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === "light";

  return (
    <div className="flex items-center gap-3 rounded-full border border-border/70 bg-card/70 px-3 py-2 backdrop-blur-sm">
      <MoonStar className="size-4 text-primary" />
      <Switch
        checked={isLightTheme}
        onCheckedChange={toggleTheme}
        aria-label="Toggle website theme"
      />
      <SunMedium className="size-4 text-amber-400" />
    </div>
  );
}

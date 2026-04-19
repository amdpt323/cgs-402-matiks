import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import type { SurveyQuestion } from "@/data/survey-questions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type TextareaQuestionCardProps = {
  question: SurveyQuestion;
  value?: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

function getFeedback(value?: string) {
  if (!value || value.trim().length === 0) {
    return "Share your thoughts openly — your feedback helps improve the experience.";
  }

  if (value.length < 20) {
    return "You can add a bit more detail to make your feedback more helpful.";
  }

  if (value.length < 80) {
    return "Good start — this gives useful insight.";
  }

  return "Great detail — this kind of feedback is very valuable.";
}

export function TextareaQuestionCard({
  question,
  value,
  onChange,
  maxLength = 300,
}: TextareaQuestionCardProps) {
  const [isFocused, setIsFocused] = useState(false);

  const length = value?.length || 0;
  const isActive = value && value.trim().length > 0;

  return (
    <Card
      className={cn(
        "w-[min(88vw,42rem)] snap-start border-border/60 bg-card/80 backdrop-blur-md transition-all duration-300",
        isActive && "border-primary/40 shadow-glow"
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="secondary">{question.label}</Badge>
            <div className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl">
                {question.title}
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm md:text-base">
                {question.prompt}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ✍️ Textarea */}
        <div
          className={cn(
            "rounded-2xl border transition-all duration-200",
            isFocused && "border-primary shadow-md",
            isActive && "border-primary/60"
          )}
        >
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            placeholder="Type your thoughts here..."
            className="min-h-[140px] resize-none border-0 bg-transparent focus-visible:ring-0 text-base"
          />
        </div>

        {/* 📊 Footer Row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{length}/{maxLength} characters</span>
          {length > maxLength * 0.8 && (
            <span className="text-amber-500">Approaching limit</span>
          )}
        </div>

        {/* 💬 Feedback */}
        <div
          className={cn(
            "flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm transition-all duration-300",
            isActive
              ? "border-primary/40 bg-primary/5"
              : "border-border/70 bg-background/40"
          )}
        >
          <CheckCircle2
            className={cn(
              "mt-0.5 size-5 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          <div className="space-y-1">
            <p
              className={cn(
                "font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {isActive ? "Response captured" : "Awaiting response"}
            </p>
            <p className="text-muted-foreground">
              {getFeedback(value)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
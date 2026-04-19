import { CheckCircle2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";

const ratings = Array.from({ length: 10 }, (_, index) => index + 1);

type RatingQuestionCardProps = {
  question: SurveyQuestion;
  value?: string;
  onChange: (value: string) => void;
};

function getRatingColor(rating: number) {
  const hue = (rating - 1) * (120 / 9);
  return `hsl(${hue}, 70%, 50%)`;
}

function getRatingColorSoft(rating: number) {
  const hue = (rating - 1) * (120 / 9);
  return `hsl(${hue}, 70%, 92%)`;
}

function getFeedbackLabel(value?: string) {
  const score = Number(value);

  if (!value) {
    return "Choose a number from 1 to 10 to show how strongly you feel about this part of your Matiks experience.";
  }
  if (score <= 2) return "Very low score — confusing or frustrating.";
  if (score <= 4) return "Low score — needs improvement.";
  if (score <= 6) return "Average — mixed experience.";
  if (score <= 8) return "Good — works fairly well.";
  return "Excellent — strong and helpful.";
}

export function RatingQuestionCard({
  question,
  value,
  onChange,
}: RatingQuestionCardProps) {
  const selectedRating = value ? Number(value) : null;
  const feedbackColor = selectedRating
    ? getRatingColor(selectedRating)
    : "hsl(220, 10%, 50%)";

  return (
    <Card
      className={cn(
        "w-[min(88vw,42rem)] snap-start border-border/60 bg-card/80 backdrop-blur-md transition-all duration-300"
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

      <CardContent className="space-y-6">
        {/* 🌈 Gradient Heat Bar */}
        <div className="h-2 w-full rounded-full overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(to right, hsl(0,70%,50%), hsl(60,70%,50%), hsl(120,70%,50%))",
            }}
          />
        </div>

        {/* 🔢 Rating Buttons */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {ratings.map((rating) => {
            const isSelected = value === String(rating);
            const baseColor = getRatingColor(rating);
            const softColor = getRatingColorSoft(rating);

            return (
              <Button
                key={rating}
                type="button"
                className={cn(
                  "h-12 rounded-2xl text-black border transition-all duration-200",
                  "hover:scale-105 active:scale-95",
                  isSelected && "text-white scale-110"
                )}
                style={{
                  backgroundColor: isSelected ? baseColor : softColor,
                  borderColor: baseColor,
                  boxShadow: isSelected
                    ? `0 0 20px ${baseColor}66`
                    : `0 0 0px transparent`,
                }}
                onClick={() => onChange(String(rating))}
              >
                {rating}
              </Button>
            );
          })}
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>1 · Strongly Disagree</span>
          <span>10 · Strongly Agree</span>
        </div>

        {/* 💬 Feedback */}
        <div
          className="flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm transition-all duration-300"
          style={{
            borderColor: feedbackColor,
            backgroundColor: selectedRating
              ? `${feedbackColor}15`
              : "rgba(255,255,255,0.05)",
          }}
        >
          <CheckCircle2
            className="mt-0.5 size-5 transition-colors duration-300"
            style={{ color: feedbackColor }}
          />
          <div className="space-y-1">
            <p
              className="font-medium transition-colors duration-300"
              style={{ color: feedbackColor }}
            >
              {value ? `Selected rating: ${value}/10` : "Awaiting response"}
            </p>
            <p className="text-muted-foreground">
              {getFeedbackLabel(value)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
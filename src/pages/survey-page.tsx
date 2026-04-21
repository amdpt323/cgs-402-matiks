import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ListChecks,
  MessageSquareText,
  RotateCcw,
  Send,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
} satisfies Variants;

type QuestionType =
  | "single_choice"
  | "multi_choice"
  | "rating_1_10"
  | "textarea";

type SurveyOption = {
  label: string;
  value: string;
};

type BaseSurveyQuestion = {
  id: string;
  label: string;
  title: string;
  prompt: string;
  type: QuestionType;
  required?: boolean;
  helper?: string;
  showWhen?: {
    questionId: string;
    value: string;
  };
};

type ChoiceSurveyQuestion = BaseSurveyQuestion & {
  type: "single_choice" | "multi_choice";
  options: SurveyOption[];
};

type RatingSurveyQuestion = BaseSurveyQuestion & {
  type: "rating_1_10";
  minLabel?: string;
  maxLabel?: string;
};

type TextareaSurveyQuestion = BaseSurveyQuestion & {
  type: "textarea";
  placeholder?: string;
};

type SurveyQuestion =
  | ChoiceSurveyQuestion
  | RatingSurveyQuestion
  | TextareaSurveyQuestion;

type SurveyAnswer = string | string[];

type Point = [number, number];
type Stroke = Point[];
type SignatureValue = Stroke[];

const surveyQuestions: SurveyQuestion[] = [
  {
    id: "1",
    label: "Question 1",
    title: "Usage frequency",
    prompt: "How often do you use Coursera?",
    type: "single_choice",
    options: [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
      { label: "Rarely", value: "rarely" },
    ],
  },
  {
    id: "2",
    label: "Question 2",
    title: "Purpose of use",
    prompt: "Why do you use Coursera?",
    type: "single_choice",
    helper: "Select all that apply.",
    options: [
      { label: "Skill learning", value: "skill_learning" },
      { label: "College studies", value: "college_studies" },
      { label: "Career growth", value: "career_growth" },
      { label: "Certificates", value: "certificates" },
      { label: "Personal interest", value: "personal_interest" },
    ],
  },
  {
    id: "3",
    label: "Question 3",
    title: "Video clarity",
    prompt: "Are the course videos easy to understand and remember?",
    type: "single_choice",
    options: [
      { label: "Very Easy", value: "very_easy" },
      { label: "Easy", value: "easy" },
      { label: "Average", value: "average" },
      { label: "Difficult", value: "difficult" },
    ],
  },
  {
    id: "4",
    label: "Question 4",
    title: "Quizzes and assignments",
    prompt: "Do quizzes and assignments help you learn better?",
    type: "single_choice",
    options: [
      { label: "Yes, a lot", value: "yes_a_lot" },
      { label: "Somewhat", value: "somewhat" },
      { label: "Very little", value: "very_little" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "5",
    label: "Question 5",
    title: "Revision of concepts",
    prompt:
      "Does Coursera revise old topics or important concepts during the course?",
    type: "single_choice",
    options: [
      { label: "Often", value: "often" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Rarely", value: "rarely" },
      { label: "Never", value: "never" },
    ],
  },
  {
    id: "6",
    label: "Question 6",
    title: "Mistake explanation",
    prompt:
      "When you answer wrong, does the platform explain mistakes clearly?",
    type: "single_choice",
    options: [
      { label: "Always", value: "always" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Rarely", value: "rarely" },
      { label: "Never", value: "never" },
    ],
  },
  {
    id: "7",
    label: "Question 7",
    title: "Remembering content",
    prompt: "Do you feel you remember course content after completing lessons?",
    type: "single_choice",
    options: [
      { label: "Strongly agree", value: "strongly_agree" },
      { label: "Agree", value: "agree" },
      { label: "Neutral", value: "neutral" },
      { label: "Disagree", value: "disagree" },
    ],
  },
  {
    id: "8",
    label: "Question 8",
    title: "Ease of navigation",
    prompt: "Is the app/website easy to use and navigate?",
    type: "single_choice",
    options: [
      { label: "Very easy", value: "very_easy" },
      { label: "Easy", value: "easy" },
      { label: "Average", value: "average" },
      { label: "Difficult", value: "difficult" },
    ],
  },
  {
    id: "9",
    label: "Question 9",
    title: "Continuing after a break",
    prompt: "Can you easily continue where you left off after a break?",
    type: "single_choice",
    options: [
      { label: "Always", value: "always" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Rarely", value: "rarely" },
      { label: "Never", value: "never" },
    ],
  },
  {
    id: "10",
    label: "Question 10",
    title: "Technical problems",
    prompt: "Have you faced any technical problems while using Coursera?",
    type: "single_choice",
    options: [
      { label: "Never", value: "never" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Often", value: "often" },
    ],
  },
  {
    id: "11",
    label: "Question 11",
    title: "Biggest challenge",
    prompt: "What is the biggest challenge while using Coursera?",
    type: "single_choice",
    options: [
      { label: "Lack of time", value: "lack_of_time" },
      { label: "Expensive certificates", value: "expensive_certificates" },
      { label: "Long courses", value: "long_courses" },
      { label: "Internet issues", value: "internet_issues" },
      { label: "Low motivation", value: "low_motivation" },
    ],
  },
  {
    id: "12",
    label: "Question 12",
    title: "Course completion",
    prompt: "Have you ever left a course incomplete?",
    type: "single_choice",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "13",
    label: "Question 13",
    title: "Reason for leaving",
    prompt: "If yes, what was the main reason?",
    type: "single_choice",
    showWhen: {
      questionId: "12",
      value: "yes",
    },
    options: [
      { label: "Lack of time", value: "lack_of_time" },
      { label: "Lost interest", value: "lost_interest" },
      { label: "Difficult content", value: "difficult_content" },
      { label: "No longer needed", value: "no_longer_needed" },
      { label: "Other", value: "other" },
    ],
  },
  {
    id: "14",
    label: "Question 14",
    title: "Recommend Coursera",
    prompt: "How likely are you to recommend Coursera to a friend?",
    type: "rating_1_10",
    minLabel: "Not likely",
    maxLabel: "Extremely likely",
  },
  {
    id: "15",
    label: "Question 15",
    title: "Main improvement",
    prompt: "What one thing should Coursera improve most?",
    type: "textarea",
    placeholder:
      "For example: certificate pricing, video clarity, course length, reminders, quizzes, app performance...",
  },
];

function SignaturePad({
  value,
  onChange,
}: {
  value?: SignatureValue;
  onChange: (value: SignatureValue) => void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = React.useRef(false);
  const strokesRef = React.useRef<SignatureValue>([]);
  const currentStrokeRef = React.useRef<Stroke>([]);

  const drawAllStrokes = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827";

    strokesRef.current.forEach((stroke) => {
      if (stroke.length === 0) return;

      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);

      if (stroke.length === 1) {
        ctx.lineTo(stroke[0][0] + 0.1, stroke[0][1] + 0.1);
      } else {
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i][0], stroke[i][1]);
        }
      }

      ctx.stroke();
    });
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 180;

    strokesRef.current = Array.isArray(value) ? value : [];
    drawAllStrokes();
  }, [value, drawAllStrokes]);

  const getPoint = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];

    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return [
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top,
      ];
    }

    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    isDrawingRef.current = true;
    const point = getPoint(e);
    currentStrokeRef.current = [point];
    strokesRef.current = [...strokesRef.current, currentStrokeRef.current];
    drawAllStrokes();
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();

    const point = getPoint(e);
    currentStrokeRef.current.push(point);
    drawAllStrokes();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;

    isDrawingRef.current = false;
    onChange([...strokesRef.current]);
  };

  const clearSignature = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    onChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border bg-background">
        <canvas
          ref={canvasRef}
          className="block h-[180px] w-full touch-none rounded-xl"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={clearSignature}>
          Clear Signature
        </Button>
      </div>
    </div>
  );
}

function transformSignature(strokes: number[][][]) {
  return strokes.map((stroke) => stroke.map(([x, y]) => ({ x, y })));
}

function isQuestionVisible(
  question: SurveyQuestion,
  answers: Record<string, SurveyAnswer>
) {
  if (!question.showWhen) return true;

  const controllingAnswer = answers[question.showWhen.questionId];

  if (Array.isArray(controllingAnswer)) {
    return controllingAnswer.includes(question.showWhen.value);
  }

  return controllingAnswer === question.showWhen.value;
}

function isAnswered(question: SurveyQuestion, answer: SurveyAnswer | undefined) {
  if (question.required === false) return true;

  if (Array.isArray(answer)) {
    return answer.length > 0;
  }

  if (typeof answer === "string") {
    return answer.trim().length > 0;
  }

  return false;
}

function getOptionLabel(question: SurveyQuestion, value: string) {
  if (question.type !== "single_choice" && question.type !== "multi_choice") {
    return value;
  }

  return question.options.find((option) => option.value === value)?.label ?? value;
}

function formatAnswer(question: SurveyQuestion, answer: SurveyAnswer | undefined) {
  if (!answer || (Array.isArray(answer) && answer.length === 0)) {
    return "Not answered";
  }

  if (question.type === "rating_1_10") {
    return `${answer}/10`;
  }

  if (Array.isArray(answer)) {
    return answer.map((value) => getOptionLabel(question, value)).join(", ");
  }

  if (question.type === "single_choice") {
    return getOptionLabel(question, answer);
  }

  return answer;
}

function ChoiceOptionCard({
  label,
  selected,
  multiple = false,
  onClick,
}: {
  label: string;
  selected: boolean;
  multiple?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition",
        "hover:border-primary/50 hover:bg-primary/5",
        selected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-border/70 bg-background/40",
      ].join(" ")}
    >
      <span
        className={[
          "flex size-6 shrink-0 items-center justify-center border",
          multiple ? "rounded-lg" : "rounded-full",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background",
        ].join(" ")}
      >
        {selected && <CheckCircle2 className="size-4" />}
      </span>

      <span className="text-sm font-medium leading-6">{label}</span>
    </button>
  );
}

function QuestionCard({
  question,
  answer,
  onSingleChoice,
  onMultiChoice,
  onTextAnswer,
}: {
  question: SurveyQuestion;
  answer: SurveyAnswer | undefined;
  onSingleChoice: (question: SurveyQuestion, value: string) => void;
  onMultiChoice: (questionId: string, value: string) => void;
  onTextAnswer: (questionId: string, value: string) => void;
}) {
  const Icon =
    question.type === "textarea"
      ? MessageSquareText
      : question.type === "rating_1_10"
      ? Star
      : ListChecks;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show">
      <Card className="border-border/60 bg-card/70 backdrop-blur-md">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="rounded-full px-4 py-1">
              {question.label}
            </Badge>

            <Badge variant="secondary" className="rounded-full px-4 py-1">
              {question.type === "single_choice" && "Single choice"}
              {question.type === "multi_choice" && "Multiple choice"}
              {question.type === "rating_1_10" && "1–10 rating"}
              {question.type === "textarea" && "Open answer"}
            </Badge>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <CardTitle className="text-2xl">{question.title}</CardTitle>
              <CardDescription className="mt-2 text-base leading-7">
                {question.prompt}
              </CardDescription>

              {question.helper && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {question.helper}
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {question.type === "single_choice" && (
            <div className="grid gap-3 md:grid-cols-2">
              {question.options.map((option) => (
                <ChoiceOptionCard
                  key={option.value}
                  label={option.label}
                  selected={answer === option.value}
                  onClick={() => onSingleChoice(question, option.value)}
                />
              ))}
            </div>
          )}

          {question.type === "multi_choice" && (
            <div className="grid gap-3 md:grid-cols-2">
              {question.options.map((option) => {
                const selectedValues = Array.isArray(answer) ? answer : [];

                return (
                  <ChoiceOptionCard
                    key={option.value}
                    label={option.label}
                    multiple
                    selected={selectedValues.includes(option.value)}
                    onClick={() => onMultiChoice(question.id, option.value)}
                  />
                );
              })}
            </div>
          )}

          {question.type === "rating_1_10" && (
            <div className="space-y-5">
              <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
                {Array.from({ length: 10 }, (_, index) => {
                  const value = String(index + 1);
                  const selected = answer === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onSingleChoice(question, value)}
                      className={[
                        "flex aspect-square items-center justify-center rounded-2xl border text-sm font-semibold transition",
                        "hover:border-primary/50 hover:bg-primary/5",
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border/70 bg-background/40",
                      ].join(" ")}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{question.minLabel ?? "Low"}</span>
                <span>{question.maxLabel ?? "High"}</span>
              </div>
            </div>
          )}

          {question.type === "textarea" && (
            <Textarea
              value={typeof answer === "string" ? answer : ""}
              onChange={(event) => onTextAnswer(question.id, event.target.value)}
              placeholder={question.placeholder}
              className="min-h-40 resize-none rounded-2xl"
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ReviewCard({
  visibleQuestions,
  answers,
  signature,
  setSignature,
  hasSignature,
  allQuestionsCompleted,
  isSubmitting,
  submitMessage,
  submitError,
  submitted,
}: {
  visibleQuestions: SurveyQuestion[];
  answers: Record<string, SurveyAnswer>;
  signature: SignatureValue;
  setSignature: React.Dispatch<React.SetStateAction<SignatureValue>>;
  hasSignature: boolean;
  allQuestionsCompleted: boolean;
  isSubmitting: boolean;
  submitMessage: string;
  submitError: string;
  submitted: boolean;
}) {
  const completedCount = visibleQuestions.filter((question) =>
    isAnswered(question, answers[question.id])
  ).length;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show">
      <Card className="border-border/60 bg-card/70 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <div>
              <CardTitle className="text-2xl">Review your answers</CardTitle>
              <CardDescription className="mt-1">
                You answered {completedCount} of {visibleQuestions.length} visible questions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {visibleQuestions.map((question) => (
            <div
              key={question.id}
              className="rounded-2xl border border-border/60 bg-background/40 p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {question.label}: {question.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {formatAnswer(question, answers[question.id])}
              </p>
            </div>
          ))}

          <div
            className={cn(
              "space-y-2 rounded-2xl border border-border/60 bg-background/40 p-4",
              !hasSignature && "border-red-300 bg-red-50"
            )}
          >
            <p className="text-sm font-medium">Signature</p>

            <SignaturePad value={signature} onChange={setSignature} />

            <p className="text-xs text-muted-foreground">
              Your signature is required to verify the authenticity of the response and
              ensure that submissions are made by a real user.
            </p>

            {!hasSignature && (
              <p className="text-sm font-medium text-red-600">
                You must provide a signature to submit this survey.
              </p>
            )}
          </div>

          {!allQuestionsCompleted && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              Some questions are unanswered. On submit, you will be taken to the
              first unanswered question.
            </div>
          )}

          {submitMessage && (
            <div className="text-sm font-medium text-green-600">
              ✅ {submitMessage}
            </div>
          )}

          {submitError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {submitError}
            </div>
          )}

          {submitted && (
            <div className="text-sm text-muted-foreground">
              Redirecting you to the home page...
            </div>
          )}

          {isSubmitting && (
            <div className="text-sm text-muted-foreground">
              Submitting your responses...
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CompleteCard({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-primary/20 bg-card/80 text-center backdrop-blur-md">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <CheckCircle2 className="size-8" />
          </div>

          <div>
            <CardTitle className="text-3xl">Survey submitted</CardTitle>
            <CardDescription className="mt-3 text-base leading-7">
              Thank you for sharing your Coursera learning experience.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex justify-center gap-3">
          <Button variant="outline" className="rounded-2xl" onClick={onRestart}>
            <RotateCcw className="size-4" />
            Start again
          </Button>

          <Button asChild className="rounded-2xl">
            <Link to="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SurveyPage() {
  const [answers, setAnswers] = React.useState<Record<string, SurveyAnswer>>({});
  const [signature, setSignature] = React.useState<SignatureValue>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");

  const visibleQuestions = React.useMemo(
    () => surveyQuestions.filter((question) => isQuestionVisible(question, answers)),
    [answers]
  );

  const hasSignature = signature.length > 0;

  const unansweredQuestionIndex = visibleQuestions.findIndex(
    (q) => !isAnswered(q, answers[q.id])
  );

  const allQuestionsCompleted = unansweredQuestionIndex === -1;

  const isReviewStep = currentIndex >= visibleQuestions.length;
  const currentQuestion = visibleQuestions[currentIndex];

  const completedCount = visibleQuestions.filter((question) =>
    isAnswered(question, answers[question.id])
  ).length;

  const progressValue =
    visibleQuestions.length > 0
      ? Math.round((completedCount / visibleQuestions.length) * 100)
      : 0;

  const canContinue =
    isReviewStep || !currentQuestion
      ? true
      : isAnswered(currentQuestion, answers[currentQuestion.id]);

  function handleSingleChoice(question: SurveyQuestion, value: string) {
    setAnswers((previousAnswers) => {
      const nextAnswers = {
        ...previousAnswers,
        [question.id]: value,
      };

      if (question.id === "12" && value !== "yes") {
        delete nextAnswers["13"];
      }

      return nextAnswers;
    });
  }

  function handleMultiChoice(questionId: string, value: string) {
    setAnswers((previousAnswers) => {
      const currentValues = Array.isArray(previousAnswers[questionId])
        ? previousAnswers[questionId]
        : [];

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...previousAnswers,
        [questionId]: nextValues,
      };
    });
  }

  function handleTextAnswer(questionId: string, value: string) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: value,
    }));
  }

  function goNext() {
    if (!canContinue) return;

    setCurrentIndex((previousIndex) =>
      Math.min(previousIndex + 1, visibleQuestions.length)
    );
  }

  function goBack() {
    setCurrentIndex((previousIndex) => Math.max(previousIndex - 1, 0));
  }

  async function handleSubmit() {
    const firstUnanswered = visibleQuestions.findIndex(
      (q) => !isAnswered(q, answers[q.id])
    );

    if (firstUnanswered !== -1) {
      setCurrentIndex(firstUnanswered);
      return;
    }

    if (!hasSignature) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const payload = {
        responses: [
          ...visibleQuestions
            .map((q) => {
              const value = answers[q.id];

              return {
                questionId: q.id,
                response: q.type === "rating_1_10" ? Number(value) : value,
              };
            })
            .filter((item) => {
              if (typeof item.response === "string") {
                return item.response.trim() !== "";
              }

              if (Array.isArray(item.response)) {
                return item.response.length > 0;
              }

              return item.response !== undefined;
            }),

          {
            questionId: "signature",
            response: transformSignature(signature),
          },
        ],
      };

      // console.log(payload);

      const res = await fetch(`${import.meta.env.VITE_POST_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // console.log("STATUS:", res.status);

      const text = await res.text();
      // console.log("BODY:", text);

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      setSubmitted(true);
      setSubmitMessage("Your answers are being captured successfully.");

      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    } catch (error) {
      console.error("Survey submission failed:", error);
      setSubmitError(
        "Oops Something Went Wrong ! Your responses could not be submitted. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRestart() {
    setAnswers({});
    setSignature([]);
    setCurrentIndex(0);
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitMessage("");
    setSubmitError("");
  }

  React.useEffect(() => {
    if (currentIndex > visibleQuestions.length) {
      setCurrentIndex(visibleQuestions.length);
    }
  }, [currentIndex, visibleQuestions.length]);

  if (submitted) {
    return <CompleteCard onRestart={handleRestart} />;
  }

  return (
    <div className="relative -mt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-[28rem] h-[18rem] w-[18rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <section className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="ghost" className="rounded-2xl">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>

          <Badge className="rounded-full px-4 py-1">Coursera Survey</Badge>
        </div>

        <Card className="border-border/60 bg-card/70 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">
                    {isReviewStep
                      ? "Review step"
                      : `Question ${currentIndex + 1} of ${visibleQuestions.length}`}
                  </span>
                  <span className="text-muted-foreground">
                    {progressValue}% completed
                  </span>
                </div>

                <Progress value={progressValue} />
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-muted-foreground">
                {completedCount}/{visibleQuestions.length} answered
              </div>
            </div>
          </CardContent>
        </Card>

        {!isReviewStep && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onSingleChoice={handleSingleChoice}
            onMultiChoice={handleMultiChoice}
            onTextAnswer={handleTextAnswer}
          />
        )}

        {isReviewStep && (
          <ReviewCard
            visibleQuestions={visibleQuestions}
            answers={answers}
            signature={signature}
            setSignature={setSignature}
            hasSignature={hasSignature}
            allQuestionsCompleted={allQuestionsCompleted}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            submitError={submitError}
            submitted={submitted}
          />
        )}

        <Card className="border-border/60 bg-card/70 backdrop-blur-md">
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={goBack}
                disabled={currentIndex === 0 || isSubmitting}
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>

              <div className="hidden flex-1 px-4 md:block">
                <Separator />
              </div>

              {!isReviewStep ? (
                <Button
                  className="rounded-2xl"
                  onClick={goNext}
                  disabled={!canContinue || isSubmitting}
                >
                  {currentIndex === visibleQuestions.length - 1
                    ? "Review answers"
                    : "Next question"}
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  className="rounded-2xl"
                  onClick={handleSubmit}
                  disabled={!hasSignature || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit survey"}
                  <Send className="size-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
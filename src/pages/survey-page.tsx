import * as React from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { RatingQuestionCard } from "@/components/rating-question-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { surveyQuestions } from "@/data/survey-questions"
import { TextareaQuestionCard } from "@/components/textarea-question-card"
import { cn } from "@/lib/utils"

type Point = [number, number]
type Stroke = Point[]
type SignatureValue = Stroke[]

function SignaturePad({
  value,
  onChange,
}: {
  value?: SignatureValue
  onChange: (value: SignatureValue) => void
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = React.useRef(false)
  const strokesRef = React.useRef<SignatureValue>([])
  const currentStrokeRef = React.useRef<Stroke>([])

  const drawAllStrokes = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#111827"

    strokesRef.current.forEach((stroke) => {
      if (stroke.length === 0) return

      ctx.beginPath()
      ctx.moveTo(stroke[0][0], stroke[0][1])

      if (stroke.length === 1) {
        ctx.lineTo(stroke[0][0] + 0.1, stroke[0][1] + 0.1)
      } else {
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i][0], stroke[i][1])
        }
      }

      ctx.stroke()
    })
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const rect = parent.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = 180

    strokesRef.current = Array.isArray(value) ? value : []
    drawAllStrokes()
  }, [value, drawAllStrokes])

  const getPoint = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): Point => {
    const canvas = canvasRef.current
    if (!canvas) return [0, 0]

    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      return [
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top,
      ]
    }

    return [e.clientX - rect.left, e.clientY - rect.top]
  }

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    isDrawingRef.current = true
    const point = getPoint(e)
    currentStrokeRef.current = [point]
    strokesRef.current = [...strokesRef.current, currentStrokeRef.current]
    drawAllStrokes()
  }

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawingRef.current) return
    e.preventDefault()

    const point = getPoint(e)
    currentStrokeRef.current.push(point)
    drawAllStrokes()
  }

  const stopDrawing = () => {
    if (!isDrawingRef.current) return

    isDrawingRef.current = false
    onChange([...strokesRef.current])
  }

  const clearSignature = () => {
    strokesRef.current = []
    currentStrokeRef.current = []

    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    onChange([])
  }

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
  )
}

function transformSignature(strokes: number[][][]) {
  return strokes.map(stroke =>
    stroke.map(([x, y]) => ({ x, y }))
  )
}

function WelcomeCard({ goNext }: { goNext: () => void }) {
  return (
    <Card className="w-[min(88vw,42rem)] snap-start border-border/60 bg-card/80 text-center shadow-xl backdrop-blur-md transition-all duration-300">
      <CardHeader className="space-y-4 pt-6">
        <div className="space-y-2">
          <CardTitle className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome 👋
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground md:text-lg">
            Help us understand your experience with{" "}
            <span className="font-medium text-foreground">Matiks</span>.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-8">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            ⏱ <span>7-10 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            💬 <span>Quick feedback</span>
          </div>
          <div className="flex items-center gap-2">
            🔒 <span>Anonymous</span>
          </div>
        </div>

        <Button
          onClick={goNext}
          size="lg"
          className="group rounded-2xl px-6 text-base"
        >
          Start Survey
          <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>

        <p className="text-xs text-muted-foreground">
          Your responses directly help improve the experience.
        </p>
      </CardContent>
    </Card>
  )
}

export default function SurveyPage() {
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [signature, setSignature] = React.useState<SignatureValue>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState<"next" | "prev">("next")
  const [showPreview, setShowPreview] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitMessage, setSubmitMessage] = React.useState("")
  const [submitError, setSubmitError] = React.useState("")

  const autoNextTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const totalCards = surveyQuestions.length + 2

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const clearAutoNext = () => {
    if(autoNextTimeoutRef.current){
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current=null;
    }
  }

  const scheduleAutoNext = ()=> {
    clearAutoNext();
    autoNextTimeoutRef.current = setTimeout(() => { goNext() }, 1000);
  }

  const goNext = React.useCallback(() => {
    clearAutoNext();
    setDirection("next")
    setCurrentIndex((prev) => {
      if (prev >= totalCards - 1) return prev
      return prev + 1
    })
  }, [totalCards])

  const goPrev = React.useCallback(() => {
    clearAutoNext();
    setDirection("prev")
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev
      return prev - 1
    })
  }, [])

  const unansweredQuestionIndex = surveyQuestions.findIndex(
    (q) => !answers[q.id]
  )

  const allQuestionsCompleted = unansweredQuestionIndex === -1
  const hasSignature = signature.length > 0

  const handleSubmit = async () => {
    const firstUnanswered = surveyQuestions.findIndex((q) => !answers[q.id])

    if (firstUnanswered !== -1) {
      setDirection("prev")
      setCurrentIndex(firstUnanswered + 1)
      return
    }

    if (!hasSignature) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")
    setSubmitError("")

    try {
      const payload = {
        responses: [
          ...surveyQuestions
            .map((q) => {
              const value = answers[q.id]

              return {
                questionId: q.id,
                response:
                  q.type === "rating_1_10"
                    ? Number(value)
                    : value,
              }
            })
            .filter((item) => {
              if (typeof item.response === "string") {
                return item.response.trim() !== ""
              }
              return item.response !== undefined
            }),

          {
            questionId: "signature",
            response: transformSignature(signature),
          },
        ],
      }

      console.log(payload)

      const res = await fetch(
        `${import.meta.env.VITE_POST_URI}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
      
      console.log("STATUS:", res.status)

      // This will FAIL silently if CORS is wrong
      const text = await res.text()
      console.log("BODY:", text)

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }


      setSubmitted(true)
      setSubmitMessage("Your answers are being captured successfully.")

      setTimeout(() => {
        window.location.href = "/"
      }, 1800)
    } catch (error) {
      console.error("Survey submission failed:", error)
      setSubmitError(
        "Backend fucked up. Your responses could not be submitted. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderCard(index: number) {
    if (index === 0) {
      return <WelcomeCard goNext={goNext} />
    }

    if (index === totalCards - 1) {
      return (
        <Card className="w-full max-w-2xl rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle>Finalize your responses</CardTitle>
            <CardDescription>
              Review your answers, sign, and then submit
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div
              className={cn(
                "space-y-2",
                !hasSignature && "rounded-lg border border-red-300 bg-red-50 p-3"
              )}
            >
              <p className="text-sm font-medium">Signature</p>

              <SignaturePad value={signature} onChange={setSignature} />

              {!hasSignature && (
                <p className="text-sm font-medium text-red-600">
                  You must provide a signature to submit this survey.
                </p>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowPreview(true)}
            >
              Preview Responses
            </Button>

            {!allQuestionsCompleted && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                Some questions are unanswered. On submit, you will be taken to
                the first unanswered question.
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!hasSignature || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Survey"}
            </Button>

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
          </CardContent>
        </Card>
      )
    }

    const questionIndex = index - 1
    const question = surveyQuestions[questionIndex]

    if (!question) return null

    return (
      <div className="w-full max-w-2xl">
        {question.type === "rating_1_10"? (
          <RatingQuestionCard
            question={question}
            value={answers[question.id]}
            onChange={(value) => {
              updateAnswer(question.id, value)
              scheduleAutoNext()
            }}
          />
        ) : (
          <TextareaQuestionCard
            question={question}
            value={answers[question.id]}
            onChange={(value) => {
              updateAnswer(question.id, value)
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold">Questionnaire</h1>
        <p className="text-muted-foreground">
          Answer the questions below based on your experience
        </p>

        {currentIndex > 0 && currentIndex < totalCards - 1 && (
          <p className="text-sm text-muted-foreground">
            Question {currentIndex} of {surveyQuestions.length}
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            disabled={currentIndex === 0 || isSubmitting}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            disabled={currentIndex === totalCards - 1 || isSubmitting}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="relative -mt-10 flex min-h-[420px] w-full items-center justify-center overflow-hidden">
            <div
              key={currentIndex}
              className={`flex w-full justify-center ${
                direction === "next"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }`}
            >
              {renderCard(currentIndex)}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Your Responses</DialogTitle>
          </DialogHeader>

          <div className="max-h-[400px] space-y-4 overflow-y-auto pr-1">
            {surveyQuestions.map((q) => (
              <div key={q.id} className="rounded-lg border p-3">
                <p className="font-medium">{q.title}</p>
                <p className="text-sm text-muted-foreground">
                  {answers[q.id] || "Not answered"}
                </p>
              </div>
            ))}

            <div className="rounded-lg border p-3">
              <p className="font-medium">Signature</p>
              {hasSignature ? (
                <div className="mt-2 rounded-md border p-2 text-sm text-muted-foreground">
                  {signature.length} stroke{signature.length !== 1 ? "s" : ""} captured
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Not signed</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .animate-slide-in-right {
          animation: slideInRight 0.45s ease;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.45s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
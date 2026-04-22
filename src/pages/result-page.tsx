import * as React from 'react'
import {
  ArrowLeft,
  BarChart3,
  Brain,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  MessageSquareText,
  PenLine,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
} satisfies Variants

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} satisfies Variants

type QuestionType = 'single_choice' | 'rating_1_10' | 'textarea'

type SurveyOption = {
  label: string
  value: string
}

type SurveyQuestion = {
  id: string
  label: string
  title: string
  prompt: string
  type: QuestionType
  options?: SurveyOption[]
  showWhen?: {
    questionId: string
    value: string
  }
  minLabel?: string
  maxLabel?: string
  placeholder?: string
}

type BackendSignaturePoint = {
  x: number
  y: number
}

type SignatureStroke = BackendSignaturePoint[]
type SignatureValue = SignatureStroke[]

type BackendResponseItem = {
  questionId: string
  response: unknown
}

type BackendSubmission = {
  id: string
  responses: BackendResponseItem[]
  createdAt?: string
}

type BackendPayload = {
  success: boolean
  count: number
  data: BackendSubmission[]
}

type OptionResult = {
  label: string
  value: string
  count: number
}

type ThoughtBubble = {
  text: string
  x: number
  y: number
  dx: number
  dy: number
  rotate: number
  delay: number
  size?: 'sm' | 'md' | 'lg'
}

type AggregatedQuestion = {
  id: string
  label: string
  title: string
  prompt: string
  type: QuestionType
  expected: string
  observation: string
  options?: OptionResult[]
  ratingDistribution?: number[]
  thoughts?: ThoughtBubble[]
  textResponses?: string[]
  answeredCount: number
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: '1',
    label: 'Question 1',
    title: 'Learner engagement frequency',
    prompt: 'How often do participants use Coursera?',
    type: 'single_choice',
    options: [
      { label: 'Daily', value: 'daily' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'Rarely', value: 'rarely' },
    ],
  },
  {
    id: '2',
    label: 'Question 2',
    title: 'Learning goals and motivation',
    prompt: 'What mainly brings learners to Coursera?',
    type: 'single_choice',
    options: [
      { label: 'Skill development', value: 'skill_learning' },
      { label: 'Academic support', value: 'college_studies' },
      { label: 'Career growth', value: 'career_growth' },
      { label: 'Certification', value: 'certificates' },
      { label: 'Personal interest', value: 'personal_interest' },
    ],
  },
  {
    id: '3',
    label: 'Question 3',
    title: 'Video clarity and recall',
    prompt: 'Are the course videos clear enough to understand and remember?',
    type: 'single_choice',
    options: [
      { label: 'Very easy', value: 'very_easy' },
      { label: 'Easy', value: 'easy' },
      { label: 'Average', value: 'average' },
      { label: 'Difficult', value: 'difficult' },
    ],
  },
  {
    id: '4',
    label: 'Question 4',
    title: 'Practice and assessment value',
    prompt: 'Do quizzes and assignments strengthen learning?',
    type: 'single_choice',
    options: [
      { label: 'Yes, a lot', value: 'yes_a_lot' },
      { label: 'Somewhat', value: 'somewhat' },
      { label: 'Very little', value: 'very_little' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: '5',
    label: 'Question 5',
    title: 'Concept reinforcement',
    prompt:
      'Does Coursera revisit important concepts during a course?',
    type: 'single_choice',
    options: [
      { label: 'Often', value: 'often' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Rarely', value: 'rarely' },
      { label: 'Never', value: 'never' },
    ],
  },
  {
    id: '6',
    label: 'Question 6',
    title: 'Feedback after mistakes',
    prompt:
      'When learners answer incorrectly, are mistakes explained clearly?',
    type: 'single_choice',
    options: [
      { label: 'Always', value: 'always' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Rarely', value: 'rarely' },
      { label: 'Never', value: 'never' },
    ],
  },
  {
    id: '7',
    label: 'Question 7',
    title: 'Post-lesson retention',
    prompt: 'Do learners feel they remember course content after completing lessons?',
    type: 'single_choice',
    options: [
      { label: 'Strongly agree', value: 'strongly_agree' },
      { label: 'Agree', value: 'agree' },
      { label: 'Neutral', value: 'neutral' },
      { label: 'Disagree', value: 'disagree' },
    ],
  },
  {
    id: '8',
    label: 'Question 8',
    title: 'Navigation and usability',
    prompt: 'Is the Coursera app or website easy to navigate?',
    type: 'single_choice',
    options: [
      { label: 'Very easy', value: 'very_easy' },
      { label: 'Easy', value: 'easy' },
      { label: 'Average', value: 'average' },
      { label: 'Difficult', value: 'difficult' },
    ],
  },
  {
    id: '9',
    label: 'Question 9',
    title: 'Learning continuity',
    prompt: 'Can learners easily resume from where they left off after a break?',
    type: 'single_choice',
    options: [
      { label: 'Always', value: 'always' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Rarely', value: 'rarely' },
      { label: 'Never', value: 'never' },
    ],
  },
  {
    id: '10',
    label: 'Question 10',
    title: 'Technical reliability',
    prompt: 'Have learners faced technical problems while using Coursera?',
    type: 'single_choice',
    options: [
      { label: 'Never', value: 'never' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Often', value: 'often' },
    ],
  },
  {
    id: '11',
    label: 'Question 11',
    title: 'Main barrier to progress',
    prompt: 'What is the biggest challenge learners face on Coursera?',
    type: 'single_choice',
    options: [
      { label: 'Lack of time', value: 'lack_of_time' },
      { label: 'Expensive certificates', value: 'expensive_certificates' },
      { label: 'Long courses', value: 'long_courses' },
      { label: 'Internet issues', value: 'internet_issues' },
      { label: 'Low motivation', value: 'low_motivation' },
    ],
  },
  {
    id: '12',
    label: 'Question 12',
    title: 'Course completion behavior',
    prompt: 'Have learners ever left a Coursera course incomplete?',
    type: 'single_choice',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    id: '13',
    label: 'Question 13',
    title: 'Reason for discontinuing',
    prompt: 'For learners who stopped, what was the main reason?',
    type: 'single_choice',
    showWhen: {
      questionId: '12',
      value: 'yes',
    },
    options: [
      { label: 'Lack of time', value: 'lack_of_time' },
      { label: 'Lost interest', value: 'lost_interest' },
      { label: 'Difficult content', value: 'difficult_content' },
      { label: 'No longer needed', value: 'no_longer_needed' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: '14',
    label: 'Question 14',
    title: 'Likelihood to recommend',
    prompt: 'How likely are learners to recommend Coursera to a friend?',
    type: 'rating_1_10',
    minLabel: 'Not likely at all',
    maxLabel: 'Extremely likely',
  },
  {
    id: '15',
    label: 'Question 15',
    title: 'Priority improvement area',
    prompt: 'What should Coursera improve first?',
    type: 'textarea',
    placeholder:
      'Example: certificate cost, clearer videos, shorter courses, reminders, quiz feedback, app performance...',
  },
]

const expectedByQuestionId: Record<string, string> = {
  '1': 'This question establishes how often learners return to Coursera. Engagement frequency helps frame the reliability of feedback about navigation, course flow, and overall usefulness.',
  '2': 'This question identifies the main motivation behind using Coursera, whether learners are focused on skills, academics, career growth, certification, or personal interest.',
  '3': 'This question checks whether video lessons are clear enough to support understanding and later recall, not just whether they look polished.',
  '4': 'This question evaluates whether quizzes and assignments actively strengthen learning rather than simply marking course progress.',
  '5': 'This question measures how well courses reinforce earlier ideas so learners can connect new topics with previous concepts.',
  '6': 'This question examines whether incorrect answers lead to clear feedback, helping learners understand and correct mistakes.',
  '7': 'This question captures how confident learners feel about remembering content after completing lessons, which is central to real learning value.',
  '8': 'This question reviews how easily learners can move through the Coursera app or website without confusion or friction.',
  '9': 'This question looks at learning continuity: whether learners can pause, return, and resume without losing context.',
  '10': 'This question highlights the level of technical friction learners experience while using Coursera.',
  '11': 'This question surfaces the main obstacle that may prevent learners from staying consistent or completing courses.',
  '12': 'This question shows whether learners are able to maintain engagement through to course completion.',
  '13': 'This follow-up question clarifies why some learners stop after enrolling, helping explain course drop-off behavior.',
  '14': 'This question captures overall satisfaction and recommendation intent through a simple 1–10 rating.',
  '15': 'This question collects open-ended improvement ideas, giving learners space to mention issues that fixed-choice questions may miss.',
}

const chartPalette = [
  'rgba(37, 99, 235, 0.82)',
  'rgba(14, 165, 233, 0.78)',
  'rgba(99, 102, 241, 0.78)',
  'rgba(168, 85, 247, 0.74)',
  'rgba(236, 72, 153, 0.72)',
  'rgba(249, 115, 22, 0.72)',
  'rgba(34, 197, 94, 0.72)',
  'rgba(20, 184, 166, 0.72)',
  'rgba(234, 179, 8, 0.72)',
  'rgba(100, 116, 139, 0.72)',
]

const bubbleLayouts = [
  { x: 6, y: 16, dx: 34, dy: -18, rotate: 5, delay: 0, size: 'lg' as const },
  {
    x: 38,
    y: 12,
    dx: -24,
    dy: 24,
    rotate: -5,
    delay: 0.4,
    size: 'md' as const,
  },
  {
    x: 68,
    y: 18,
    dx: -18,
    dy: -16,
    rotate: 4,
    delay: 0.8,
    size: 'md' as const,
  },
  { x: 16, y: 48, dx: 28, dy: 18, rotate: -4, delay: 1.2, size: 'lg' as const },
  {
    x: 52,
    y: 52,
    dx: -30,
    dy: -12,
    rotate: 7,
    delay: 1.6,
    size: 'md' as const,
  },
  { x: 74, y: 60, dx: -26, dy: 14, rotate: -6, delay: 2, size: 'sm' as const },
  { x: 8, y: 76, dx: 36, dy: -14, rotate: -7, delay: 2.4, size: 'md' as const },
  { x: 42, y: 78, dx: -18, dy: 12, rotate: 3, delay: 2.8, size: 'sm' as const },
  {
    x: 66,
    y: 82,
    dx: -22,
    dy: -10,
    rotate: 5,
    delay: 3.2,
    size: 'md' as const,
  },
  { x: 24, y: 28, dx: 20, dy: -10, rotate: 4, delay: 3.6, size: 'sm' as const },
]

const radarMappings: Record<string, Record<string, number>> = {
  '3': { very_easy: 5, easy: 4, average: 3, difficult: 2 },
  '4': { yes_a_lot: 5, somewhat: 4, very_little: 2, no: 1 },
  '5': { often: 5, sometimes: 4, rarely: 2, never: 1 },
  '6': { always: 5, sometimes: 4, rarely: 2, never: 1 },
  '7': { strongly_agree: 5, agree: 4, neutral: 3, disagree: 2 },
  '8': { very_easy: 5, easy: 4, average: 3, difficult: 2 },
}

const themeMatchers = [
  {
    label: 'certificate cost',
    keywords: ['certificate', 'pricing', 'price', 'cost', 'expensive', 'fee'],
  },
  {
    label: 'course length and pacing',
    keywords: ['long', 'length', 'pace', 'pacing', 'duration', 'time'],
  },
  {
    label: 'quiz feedback',
    keywords: [
      'quiz',
      'quizzes',
      'feedback',
      'wrong',
      'answers',
      'explain',
      'explanations',
    ],
  },
  {
    label: 'practical examples',
    keywords: [
      'practical',
      'industry',
      'real',
      'examples',
      'application',
      'applications',
    ],
  },
  {
    label: 'reminders and continuity',
    keywords: [
      'reminder',
      'reminders',
      'notification',
      'continue',
      'midway',
      'break',
    ],
  },
  {
    label: 'app performance',
    keywords: ['app', 'website', 'performance', 'technical', 'issues', 'slow'],
  },
]

const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1300,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      padding: 12,
      cornerRadius: 12,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'rgba(100, 116, 139, 1)',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(148, 163, 184, 0.22)',
      },
      ticks: {
        color: 'rgba(100, 116, 139, 1)',
        precision: 0,
      },
    },
  },
}

const doughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  animation: {
    animateRotate: true,
    duration: 1300,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        color: 'rgba(100, 116, 139, 1)',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      padding: 12,
      cornerRadius: 12,
    },
  },
}

const lineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1400,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      padding: 12,
      cornerRadius: 12,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'rgba(100, 116, 139, 1)',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(148, 163, 184, 0.22)',
      },
      ticks: {
        color: 'rgba(100, 116, 139, 1)',
        precision: 0,
      },
    },
  },
}

const radarOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1400,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      padding: 12,
      cornerRadius: 12,
    },
  },
  scales: {
    r: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        backdropColor: 'transparent',
        color: 'rgba(100, 116, 139, 1)',
      },
      pointLabels: {
        color: 'rgba(51, 65, 85, 1)',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.25)',
      },
      angleLines: {
        color: 'rgba(148, 163, 184, 0.25)',
      },
    },
  },
}

function getResponseForQuestion(
  submission: BackendSubmission,
  questionId: string,
): unknown | undefined {
  return submission.responses.find((item) => item.questionId === questionId)
    ?.response
}

function normalizeStringResponse(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function normalizeRatingResponse(value: unknown): number | null {
  if (typeof value === 'number' && value >= 1 && value <= 10) return value

  if (typeof value === 'string') {
    const parsed = Number(value)
    if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 10) return parsed
  }

  return null
}

function normalizeSignatureValue(value: unknown): SignatureValue | null {
  if (!Array.isArray(value)) return null

  const normalized: SignatureValue = value
    .map((stroke) => {
      if (!Array.isArray(stroke)) return []

      return stroke
        .map((point) => {
          if (
            point &&
            typeof point === 'object' &&
            'x' in point &&
            'y' in point &&
            typeof (point as { x: unknown }).x === 'number' &&
            typeof (point as { y: unknown }).y === 'number'
          ) {
            return {
              x: (point as { x: number }).x,
              y: (point as { y: number }).y,
            }
          }

          return null
        })
        .filter(Boolean) as SignatureStroke
    })
    .filter((stroke) => stroke.length > 0)

  return normalized.length > 0 ? normalized : null
}

function strokeToPath(stroke: SignatureStroke) {
  if (stroke.length === 0) return ''

  return stroke
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
}

function getOptionCounts(
  question: SurveyQuestion,
  submissions: BackendSubmission[],
): OptionResult[] {
  const options = question.options ?? []

  return options.map((option) => {
    let count = 0

    submissions.forEach((submission) => {
      const response = getResponseForQuestion(submission, question.id)
      if (response === option.value) {
        count += 1
      }
    })

    return {
      label: option.label,
      value: option.value,
      count,
    }
  })
}

function getAnsweredCount(
  questionId: string,
  submissions: BackendSubmission[],
) {
  return submissions.reduce((total, submission) => {
    const response = getResponseForQuestion(submission, questionId)
    return response !== undefined ? total + 1 : total
  }, 0)
}

function getRatingDistribution(
  questionId: string,
  submissions: BackendSubmission[],
): number[] {
  const distribution = Array.from({ length: 10 }, () => 0)

  submissions.forEach((submission) => {
    const response = normalizeRatingResponse(
      getResponseForQuestion(submission, questionId),
    )
    if (response !== null) {
      distribution[response - 1] += 1
    }
  })

  return distribution
}

function getTextResponses(
  questionId: string,
  submissions: BackendSubmission[],
): string[] {
  return submissions
    .map((submission) =>
      normalizeStringResponse(getResponseForQuestion(submission, questionId)),
    )
    .filter((item): item is string => Boolean(item))
}

function getTopOption(options?: OptionResult[]) {
  if (!options || options.length === 0) return null
  return [...options].sort((a, b) => b.count - a.count)[0]
}

function getAverageRating(distribution?: number[]) {
  const values = distribution ?? []
  const total = values.reduce((sum, value) => sum + value, 0)

  if (total === 0) return 0

  const weighted = values.reduce(
    (sum, count, index) => sum + count * (index + 1),
    0,
  )
  return weighted / total
}

function getNPS(distribution?: number[]) {
  const values = distribution ?? []
  const total = values.reduce((sum, v) => sum + v, 0)

  if (total === 0) return 0

  const detractors = values
    .slice(0, 6)   // 1–6
    .reduce((sum, v) => sum + v, 0)

  const promoters = values
    .slice(8, 10)  // 9–10
    .reduce((sum, v) => sum + v, 0)

  const promoterPercent = (promoters / total) * 100
  const detractorPercent = (detractors / total) * 100

  return (promoterPercent - detractorPercent)
}

function getPromoterShare(distribution?: number[]) {
  const values = distribution ?? []
  const total = values.reduce((sum, value) => sum + value, 0)

  if (total === 0) return 0

  const promoters = values.slice(8).reduce((sum, value) => sum + value, 0)
  return Math.round((promoters / total) * 100)
}

function buildThoughtBubbles(texts: string[]): ThoughtBubble[] {
  const cleaned = texts
    .map((text) => text.trim())
    .filter(Boolean)
    .slice(0, 18)

  return cleaned.map((text, index) => {
    const layout = bubbleLayouts[index % bubbleLayouts.length]
    return {
      text,
      ...layout,
      delay: layout.delay + index * 0.22,
    }
  })
}

function getThemeSummary(texts: string[]): string[] {
  const lowered = texts.map((text) => text.toLowerCase())

  const counts = themeMatchers.map((theme) => {
    let count = 0

    lowered.forEach((text) => {
      if (theme.keywords.some((keyword) => text.includes(keyword))) {
        count += 1
      }
    })

    return {
      label: theme.label,
      count,
    }
  })

  const filtered = counts
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
  return filtered.slice(0, 4).map((item) => item.label)
}

function getAverageMappedScore(
  questionId: string,
  submissions: BackendSubmission[],
  mapping: Record<string, number>,
) {
  let total = 0
  let count = 0

  submissions.forEach((submission) => {
    const response = normalizeStringResponse(
      getResponseForQuestion(submission, questionId),
    )
    if (response && mapping[response] !== undefined) {
      total += mapping[response]
      count += 1
    }
  })

  return count > 0 ? Number((total / count).toFixed(2)) : 0
}

function buildObservation(
  question: SurveyQuestion,
  answeredCount: number,
  options?: OptionResult[],
  distribution?: number[],
  textResponses?: string[],
): string {
  if (question.type === 'rating_1_10') {
    const average = getAverageRating(distribution)
    const nps = getNPS(distribution)
    const promoterShare = getPromoterShare(distribution)
    return `${answeredCount} learners submitted a recommendation rating. The NPS is ${nps.toFixed(2)}, with ${promoterShare}% giving a strong rating between 9 and 10.`
  }

  if (question.type === 'textarea') {
    const themes = getThemeSummary(textResponses ?? [])
    if (answeredCount === 0) {
      return 'No open-ended improvement responses have been submitted yet.'
    }

    if (themes.length === 0) {
      return `${answeredCount} written responses were submitted. Since the answers cover different issues, the individual comments give the clearest detail.`
    }

    return `${answeredCount} written responses were submitted. The strongest recurring themes are ${themes.join(', ')}.`
  }

  const top = getTopOption(options)
  if (!top || answeredCount === 0) {
    return 'No responses have been submitted yet for this question.'
  }

  const percent = Math.round((top.count / answeredCount) * 100)

  if (question.id === '12') {
    const yesOption = options?.find((item) => item.value === 'yes')
    const yesPercent =
      yesOption && answeredCount > 0
        ? Math.round((yesOption.count / answeredCount) * 100)
        : 0

    return `${yesOption?.count ?? 0} of ${answeredCount} learners reported leaving a course incomplete, equal to ${yesPercent}% of responses for this question.`
  }

  if (question.id === '13') {
    return `Among ${answeredCount} learners who answered this follow-up question, "${top.label}" is the leading reason for discontinuing a course (${top.count}, ${percent}%).`
  }

  return `Across ${answeredCount} responses, "${top.label}" is the leading answer (${top.count}, ${percent}%).`
}

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.div>
  )
}

function SummaryMetricCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType
  label: string
  value: string
  description: string
}) {
  return (
    <motion.div variants={fadeUp}>
      <Card className='h-full border-border/60 bg-card/70 backdrop-blur-md'>
        <CardContent className='p-5'>
          <div className='flex items-start gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
              <Icon className='size-5' />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-sm text-muted-foreground'>{label}</p>
              <h3 className='mt-1 text-2xl font-semibold'>{value}</h3>
              <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MainUsageChart({ question }: { question: AggregatedQuestion }) {
  const data = React.useMemo<ChartData<'bar'>>(
    () => ({
      labels: question.options?.map((item) => item.label) ?? [],
      datasets: [
        {
          label: 'Responses',
          data: question.options?.map((item) => item.count) ?? [],
          backgroundColor: chartPalette,
          borderRadius: 14,
          borderSkipped: false,
        },
      ],
    }),
    [question],
  )

  return (
    <Card className='h-full border-border/60 bg-card/70 backdrop-blur-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <BarChart3 className='size-5 text-primary' />
          Learner engagement frequency
        </CardTitle>
        <CardDescription>How often participants return to Coursera.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='h-72'>
          <Bar data={data} options={barOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

function PurposeChart({ question }: { question: AggregatedQuestion }) {
  const data = React.useMemo<ChartData<'doughnut'>>(
    () => ({
      labels: question.options?.map((item) => item.label) ?? [],
      datasets: [
        {
          label: 'Responses',
          data: question.options?.map((item) => item.count) ?? [],
          backgroundColor: chartPalette,
          borderColor: 'rgba(255, 255, 255, 0.9)',
          borderWidth: 3,
        },
      ],
    }),
    [question],
  )

  return (
    <Card className='h-full border-border/60 bg-card/70 backdrop-blur-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <Target className='size-5 text-primary' />
          Learning goals and motivation
        </CardTitle>
        <CardDescription>
          Primary reasons learners choose Coursera, based on Question 2 responses.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='h-72'>
          <Doughnut data={data} options={doughnutOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

function LearningRadarChart({
  values,
}: {
  values: {
    videoClarity: number
    quizzes: number
    revision: number
    feedback: number
    retention: number
    navigation: number
  }
}) {
  const data = React.useMemo<ChartData<'radar'>>(
    () => ({
      labels: [
        'Video clarity',
        'Practice value',
        'Revision',
        'Feedback',
        'Retention',
        'Navigation',
      ],
      datasets: [
        {
          label: 'Learning experience score',
          data: [
            values.videoClarity,
            values.quizzes,
            values.revision,
            values.feedback,
            values.retention,
            values.navigation,
          ],
          backgroundColor: 'rgba(37, 99, 235, 0.18)',
          borderColor: 'rgba(37, 99, 235, 0.9)',
          pointBackgroundColor: 'rgba(37, 99, 235, 1)',
          pointBorderColor: 'rgba(255, 255, 255, 1)',
          pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointHoverBorderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2,
          fill: true,
        },
      ],
    }),
    [values],
  )

  return (
    <Card className='h-full border-border/60 bg-card/70 backdrop-blur-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <Brain className='size-5 text-primary' />
          Learning quality profile
        </CardTitle>
        <CardDescription>
          Mapped averages across clarity, practice, revision, feedback, retention, and usability.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='h-72'>
          <Radar data={data} options={radarOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

function RecommendationChart({ question }: { question: AggregatedQuestion }) {
  const data = React.useMemo<ChartData<'line'>>(
    () => ({
      labels:
        question.ratingDistribution?.map((_, index) => String(index + 1)) ?? [],
      datasets: [
        {
          label: 'Responses',
          data: question.ratingDistribution ?? [],
          borderColor: 'rgba(37, 99, 235, 0.9)',
          backgroundColor: 'rgba(37, 99, 235, 0.16)',
          pointBackgroundColor: 'rgba(37, 99, 235, 1)',
          pointBorderColor: 'rgba(255, 255, 255, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    [question],
  )

  return (
    <Card className='h-full border-border/60 bg-card/70 backdrop-blur-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <TrendingUp className='size-5 text-primary' />
          Recommendation intent
        </CardTitle>
        <CardDescription>
          Distribution of the submitted 1–10 likelihood-to-recommend ratings.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='h-72'>
          <Line data={data} options={lineOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

function ThoughtJuggleSection({ question }: { question?: AggregatedQuestion }) {
  const thoughts = question?.thoughts ?? []
  const total = question?.textResponses?.length ?? 0

  return (
    <section className='space-y-6'>
      <Reveal className='space-y-3'>
        <Badge variant='outline' className='rounded-full px-4 py-1'>
          Learner voice
        </Badge>
        <h2 className='text-3xl font-semibold md:text-4xl'>
          Open feedback in learners’ own words
        </h2>
        <p className='max-w-3xl leading-7 text-muted-foreground'>
          Improvement suggestions from Question 15 are displayed as individual learner comments.
        </p>
      </Reveal>

      <Reveal>
        <Card className='overflow-hidden border-border/60 bg-card/70 backdrop-blur-md'>
          <CardContent className='p-0'>
            <div className='relative min-h-[34rem] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary/10 via-background/40 to-card'>
              <div className='pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl' />
              <div className='pointer-events-none absolute -left-12 bottom-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl' />
              <div className='pointer-events-none absolute -right-10 top-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl' />

              <div className='absolute left-6 top-6 z-10 rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur'>
                Improvement suggestions · {total}
              </div>

              {thoughts.length === 0 ? (
                <div className='flex min-h-[34rem] items-center justify-center px-6 text-center text-muted-foreground'>
                  No open-ended responses available yet.
                </div>
              ) : (
                thoughts.map((thought, index) => (
                  <motion.div
                    key={`${thought.text}-${index}`}
                    className={[
                      'absolute z-10 max-w-xs rounded-3xl border border-border/70 bg-background/80 shadow-xl shadow-primary/5 backdrop-blur-md',
                      thought.size === 'lg'
                        ? 'p-5 text-base'
                        : thought.size === 'sm'
                          ? 'p-3 text-xs'
                          : 'p-4 text-sm',
                    ].join(' ')}
                    style={{
                      left: `${thought.x}%`,
                      top: `${thought.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      x: [0, thought.dx, -thought.dx * 0.45, 0],
                      y: [0, thought.dy, -thought.dy * 0.5, 0],
                      rotate: [0, thought.rotate, -thought.rotate * 0.5, 0],
                    }}
                    transition={{
                      duration: 5 + 1.7 * index,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: thought.delay,
                    }}
                  >
                    <div className='mb-3 flex items-center gap-2 text-primary'>
                      <MessageSquareText className='size-4' />
                      <span className='text-xs font-semibold uppercase tracking-[0.18em]'>
                        Response
                      </span>
                    </div>
                    <p className='leading-6 text-muted-foreground'>
                      “{thought.text}”
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  )
}

function SignaturePreview({
  signature,
  index,
}: {
  signature: SignatureValue
  index: number
}) {
  return (
    <div className='w-72 shrink-0 rounded-3xl border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2 text-sm font-medium'>
          <PenLine className='size-4 text-primary' />
          Signature record {index + 1}
        </div>
        <Badge variant='secondary' className='rounded-full'>
          recorded
        </Badge>
      </div>

      <svg
        viewBox='0 0 960 180'
        className='h-28 w-full rounded-2xl bg-card/70'
        aria-label={`Signature ${index + 1}`}
      >
        {signature.map((stroke, strokeIndex) => (
          <path
            key={strokeIndex}
            d={strokeToPath(stroke)}
            fill='none'
            stroke='currentColor'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-foreground'
          />
        ))}
      </svg>
    </div>
  )
}

function SignatureMovingPanel({
  signatures,
}: {
  signatures: SignatureValue[]
}) {
  const safeSignatures = signatures.filter((item) => item.length > 0)
  const signatureLoop = [...safeSignatures, ...safeSignatures]

  return (
    <section className='space-y-6'>
      <Reveal className='space-y-3'>
        <Badge variant='outline' className='rounded-full px-4 py-1'>
          Response validation
        </Badge>
        <h2 className='text-3xl font-semibold md:text-4xl'>
          Submitted signature records
        </h2>
        <p className='max-w-3xl leading-7 text-muted-foreground'>
          Valid signature entries are separated from survey answers and shown here for response validation.
        </p>
      </Reveal>

      <Reveal>
        <Card className='overflow-hidden border-border/60 bg-card/70 backdrop-blur-md'>
          <CardContent className='p-5'>
            {safeSignatures.length === 0 ? (
              <div className='rounded-[1.5rem] border border-border/60 bg-background/40 p-8 text-center text-muted-foreground'>
                No signature records available yet.
              </div>
            ) : (
              <div className='overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/40 p-4'>
                <motion.div
                  className='flex w-max gap-4'
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    duration: 100,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {signatureLoop.map((signature, index) => (
                    <SignaturePreview
                      key={`${index}-${signature.length}`}
                      signature={signature}
                      index={index % safeSignatures.length}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </Reveal>
    </section>
  )
}

function QuestionMiniChart({ question }: { question: AggregatedQuestion }) {
  if (question.type === 'textarea') {
    const thoughts = question.textResponses ?? []

    return (
      <div className='rounded-3xl border border-border/60 bg-background/40 p-5'>
        <div className='mb-4 flex items-center gap-2'>
          <MessageSquareText className='size-5 text-primary' />
          <h4 className='font-semibold'>Open-ended responses</h4>
        </div>

        <div className="relative h-64 overflow-hidden">
          <div className="flex flex-col gap-3 animate-scroll">
            {[...thoughts, ...thoughts].map((thought, index) => (
              <div
                key={`${thought}-${index}`}
                className='rounded-2xl border border-border/60 bg-card/70 p-3 text-sm leading-6 text-muted-foreground'
              >
                “{thought}”
              </div>
            ))}
          </div>

          {/* fade top */}
          <div className="pointer-events-none absolute top-0 h-8 w-full bg-gradient-to-b from-background to-transparent" />
          {/* fade bottom */}
          <div className="pointer-events-none absolute bottom-0 h-8 w-full bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    )
  }

  if (question.type === 'rating_1_10') {
    const data: ChartData<'bar'> = {
      labels:
        question.ratingDistribution?.map((_, index) => `${index + 1}`) ?? [],
      datasets: [
        {
          label: 'Responses',
          data: question.ratingDistribution ?? [],
          backgroundColor: chartPalette,
          borderRadius: 12,
          borderSkipped: false,
        },
      ],
    }

    return (
      <div className='h-72 rounded-3xl border border-border/60 bg-background/40 p-4'>
        <Bar data={data} options={barOptions} />
      </div>
    )
  }

  const data: ChartData<'bar'> = {
    labels: question.options?.map((item) => item.label) ?? [],
    datasets: [
      {
        label: 'Responses',
        data: question.options?.map((item) => item.count) ?? [],
        backgroundColor: chartPalette,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  }

  return (
    <div className='h-72 rounded-3xl border border-border/60 bg-background/40 p-4'>
      <Bar data={data} options={barOptions} />
    </div>
  )
}

function QuestionResultCard({
  question,
  index,
}: {
  question: AggregatedQuestion
  index: number
}) {
  const topOption = getTopOption(question.options)
  const optionTotal =
    question.options?.reduce((sum, item) => sum + item.count, 0) ?? 0
  const ratingAverage = getAverageRating(question.ratingDistribution)
  const nps = getNPS(question.ratingDistribution)

  return (
    <motion.div variants={fadeUp}>
      <Card className='overflow-hidden border-border/60 bg-card/70 backdrop-blur-md'>
        <CardHeader className='space-y-4'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge variant='outline' className='rounded-full px-4 py-1'>
                {question.label}
              </Badge>
              <Badge variant='secondary' className='rounded-full px-4 py-1'>
                {question.type === 'single_choice' && 'Single-choice result'}
                {question.type === 'rating_1_10' && '1–10 recommendation rating'}
                {question.type === 'textarea' && 'Open-ended feedback'}
              </Badge>
            </div>

            <div className='text-sm text-muted-foreground'>
              Result #{index + 1}
            </div>
          </div>

          <div>
            <CardTitle className='text-2xl'>{question.title}</CardTitle>
            <CardDescription className='mt-2 text-base leading-7'>
              {question.prompt}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='grid gap-6 lg:grid-cols-[0.95fr_1.05fr]'>
            <QuestionMiniChart question={question} />

            <div className='space-y-4'>
              <div className='rounded-3xl border border-primary/20 bg-primary/5 p-5'>
                <div className='mb-3 flex items-center gap-2 text-primary'>
                  <Sparkles className='size-5' />
                  <h4 className='font-semibold'>Expected insight</h4>
                </div>
                <p className='text-sm leading-7 text-muted-foreground'>
                  {question.expected}
                </p>
              </div>

              <div className='rounded-3xl border border-border/60 bg-background/40 p-5'>
                <div className='mb-3 flex items-center gap-2'>
                  <ClipboardList className='size-5 text-primary' />
                  <h4 className='font-semibold'>What the data shows</h4>
                </div>
                <p className='text-sm leading-7 text-muted-foreground'>
                  {question.observation}
                </p>
              </div>

              {topOption && (
                <div className='rounded-3xl border border-border/60 bg-background/40 p-5'>
                  <div className='flex items-center justify-between gap-4'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Leading response
                      </p>
                      <h4 className='mt-1 text-lg font-semibold'>
                        {topOption.label}
                      </h4>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-muted-foreground'>Count</p>
                      <p className='mt-1 text-2xl font-semibold'>
                        {topOption.count}
                      </p>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <Progress
                      value={
                        optionTotal > 0
                          ? Math.round((topOption.count / optionTotal) * 100)
                          : 0
                      }
                    />
                  </div>
                </div>
              )}

              {question.type === 'rating_1_10' && (
                <div className='rounded-3xl border border-border/60 bg-background/40 p-5'>
                  <p className='text-sm text-muted-foreground'>
                    Net Promoter Score
                  </p>
                  <h4 className='mt-1 text-3xl font-semibold'>
                    {nps.toFixed(2)}
                  </h4>
                </div>
              )}

              {question.type === 'textarea' && (
                <div className='rounded-3xl border border-border/60 bg-background/40 p-5'>
                  <p className='text-sm text-muted-foreground'>
                    Open-ended responses
                  </p>
                  <h4 className='mt-1 text-3xl font-semibold'>
                    {question.answeredCount}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ResultPage() {
  const [payload, setPayload] = React.useState<BackendPayload | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string>('')

  React.useEffect(() => {
    let isMounted = true

    const fetchUserResponses = async () => {
      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(`${import.meta.env.VITE_GET_URI}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }

        const data: BackendPayload = await res.json()

        if (isMounted) {
          setPayload(data)
        }
      } catch (err) {
        console.error('Failed to fetch survey insights:', err)
        if (isMounted) {
          setError('Could not load the survey insights. Please try again.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchUserResponses()

    return () => {
      isMounted = false
    }
  }, [])

  const submissions = payload?.data ?? []
  const responseCount = payload?.count ?? submissions.length

  const signatures = React.useMemo(() => {
    return submissions
      .map((submission) =>
        normalizeSignatureValue(
          getResponseForQuestion(submission, 'signature'),
        ),
      )
      .filter((item): item is SignatureValue => Boolean(item))
  }, [submissions])

  const aggregatedQuestions = React.useMemo<AggregatedQuestion[]>(() => {
    return surveyQuestions.map((question) => {
      const answeredCount = getAnsweredCount(question.id, submissions)

      if (question.type === 'rating_1_10') {
        const ratingDistribution = getRatingDistribution(
          question.id,
          submissions,
        )

        return {
          id: question.id,
          label: question.label,
          title: question.title,
          prompt: question.prompt,
          type: question.type,
          expected: expectedByQuestionId[question.id] ?? '',
          observation: buildObservation(
            question,
            answeredCount,
            undefined,
            ratingDistribution,
            undefined,
          ),
          ratingDistribution,
          answeredCount,
        }
      }

      if (question.type === 'textarea') {
        const textResponses = getTextResponses(question.id, submissions)
        const thoughts = buildThoughtBubbles(textResponses)

        return {
          id: question.id,
          label: question.label,
          title: question.title,
          prompt: question.prompt,
          type: question.type,
          expected: expectedByQuestionId[question.id] ?? '',
          observation: buildObservation(
            question,
            answeredCount,
            undefined,
            undefined,
            textResponses,
          ),
          textResponses,
          thoughts,
          answeredCount,
        }
      }

      const options = getOptionCounts(question, submissions)

      return {
        id: question.id,
        label: question.label,
        title: question.title,
        prompt: question.prompt,
        type: question.type,
        expected: expectedByQuestionId[question.id] ?? '',
        observation: buildObservation(question, answeredCount, options),
        options,
        answeredCount,
      }
    })
  }, [submissions])

  const getAggregatedQuestion = React.useCallback(
    (id: string) => aggregatedQuestions.find((question) => question.id === id),
    [aggregatedQuestions],
  )

  const usageQuestion = getAggregatedQuestion('1')
  const purposeQuestion = getAggregatedQuestion('2')
  const recommendQuestion = getAggregatedQuestion('14')
  const textareaQuestion = getAggregatedQuestion('15')
  const challengeQuestion = getAggregatedQuestion('11')
  const incompleteQuestion = getAggregatedQuestion('12')

  const nps = getNPS(recommendQuestion?.ratingDistribution)
  const ratingAverage = getAverageRating(recommendQuestion?.ratingDistribution)

  const topChallenge = getTopOption(challengeQuestion?.options)
  const incompleteYes = incompleteQuestion?.options?.find(
    (item) => item.value === 'yes',
  )
  const incompleteAnswered = incompleteQuestion?.answeredCount ?? 0
  const incompletePercent =
    incompleteYes && incompleteAnswered > 0
      ? Math.round((incompleteYes.count / incompleteAnswered) * 100)
      : 0

  const radarValues = React.useMemo(() => {
    return {
      videoClarity: getAverageMappedScore('3', submissions, radarMappings['3']),
      quizzes: getAverageMappedScore('4', submissions, radarMappings['4']),
      revision: getAverageMappedScore('5', submissions, radarMappings['5']),
      feedback: getAverageMappedScore('6', submissions, radarMappings['6']),
      retention: getAverageMappedScore('7', submissions, radarMappings['7']),
      navigation: getAverageMappedScore('8', submissions, radarMappings['8']),
    }
  }, [submissions])

  const textareaThemes = getThemeSummary(textareaQuestion?.textResponses ?? [])

  const summaryMetrics = [
    {
      icon: Users,
      label: 'Submitted responses',
      value: String(responseCount),
      description: 'Total survey submissions currently available for analysis.',
    },
    {
      icon: TrendingUp,
      label: 'Net Promoter Score',
      value: `${nps.toFixed(2)}`,
      description: 'NPS from the submitted Question 14 ratings.',
    },
    {
      icon: Target,
      label: 'Top learning barrier',
      value: topChallenge?.label ?? 'No data yet',
      description: 'Leading response for the main challenge question.',
    },
    {
      icon: GraduationCap,
      label: 'Course drop-off share',
      value: `${incompletePercent}%`,
      description: 'Percentage of Question 12 respondents who selected Yes.',
    },
  ]

  if (isLoading) {
    return (
      <div className='relative -mt-16'>
        <section className='mx-auto max-w-5xl space-y-6'>
          <Card className='border-border/60 bg-card/70 backdrop-blur-md'>
            <CardContent className='p-10 text-center'>
              <h2 className='text-2xl font-semibold'>Loading survey insights...</h2>
              <p className='mt-2 text-muted-foreground'>
                Fetching the latest submitted survey responses.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className='relative -mt-16'>
        <section className='mx-auto max-w-5xl space-y-6'>
          <Card className='border-border/60 bg-card/70 backdrop-blur-md'>
            <CardContent className='p-10 text-center'>
              <h2 className='text-2xl font-semibold'>Could not load survey insights</h2>
              <p className='mt-2 text-muted-foreground'>{error}</p>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  }

  return (
    <div className='relative -mt-16 space-y-20'>
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute right-0 top-[34rem] h-[22rem] w-[22rem] rounded-full bg-primary/10 blur-3xl' />
        <div className='absolute left-0 top-[78rem] h-[20rem] w-[20rem] rounded-full bg-primary/10 blur-3xl' />
      </div>

      <section className='space-y-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <Button asChild variant='ghost' className='rounded-2xl'>
            <Link to='/'>
              <ArrowLeft className='size-4' />
              Back to home
            </Link>
          </Button>

          <Badge className='rounded-full px-4 py-1'>
            Coursera Survey Insights
          </Badge>
        </div>

        <Reveal>
          <Card className='overflow-hidden border-border/60 bg-card/70 backdrop-blur-xl'>
            <CardHeader className='space-y-5 pb-6'>
              <div className='flex flex-wrap gap-2'>
                <Badge className='rounded-full px-4 py-1'>
                  Survey Insights Dashboard
                </Badge>
                <Badge variant='secondary' className='rounded-full px-4 py-1'>
                  Live response data
                </Badge>
              </div>

              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary'>
                  <Sparkles className='size-4' />
                  Live insights from submitted learner responses
                </div>

                <CardTitle className='max-w-5xl text-4xl leading-tight md:text-5xl xl:text-6xl'>
                  Coursera learning experience: survey results dashboard.
                </CardTitle>

                <CardDescription className='max-w-3xl text-base leading-7 md:text-lg'>
                  Explore how learners use Coursera, what helps them learn, where they face friction, and which improvements they suggest most often.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Reveal>
      </section>

      <section className='space-y-6'>
        <Reveal className='space-y-3'>
          <h2 className='text-3xl font-semibold md:text-4xl'>
            Executive overview
          </h2>
          <p className='max-w-3xl leading-7 text-muted-foreground'>
            A concise snapshot of participation, recommendation intent, learning barriers, and course completion patterns.
          </p>
        </Reveal>

        <motion.div
          className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'
          variants={stagger}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.15 }}
        >
          {summaryMetrics.map((metric) => (
            <SummaryMetricCard key={metric.label} {...metric} />
          ))}
        </motion.div>
      </section>

      <section className='space-y-6'>
        <Reveal className='space-y-3'>
          <Badge variant='outline' className='rounded-full px-4 py-1'>
            Visual analysis
          </Badge>
          <h2 className='text-3xl font-semibold md:text-4xl'>
            Key response patterns
          </h2>
          <p className='max-w-3xl leading-7 text-muted-foreground'>
            These charts turn the submitted responses into clear patterns across engagement, motivation, learning quality, and recommendation intent.
          </p>
        </Reveal>

        <motion.div
          className='grid gap-6 xl:grid-cols-2'
          variants={stagger}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp}>
            {usageQuestion ? (
              <MainUsageChart question={usageQuestion} />
            ) : (
              <Card className='border-border/60 bg-card/70 backdrop-blur-md'>
                <CardContent className='p-8 text-center text-muted-foreground'>
                  Engagement chart is not available yet.
                </CardContent>
              </Card>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            {purposeQuestion ? (
              <PurposeChart question={purposeQuestion} />
            ) : (
              <Card className='border-border/60 bg-card/70 backdrop-blur-md'>
                <CardContent className='p-8 text-center text-muted-foreground'>
                  Motivation chart is not available yet.
                </CardContent>
              </Card>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <LearningRadarChart values={radarValues} />
          </motion.div>

          <motion.div variants={fadeUp}>
            {recommendQuestion ? (
              <RecommendationChart question={recommendQuestion} />
            ) : (
              <Card className='border-border/60 bg-card/70 backdrop-blur-md'>
                <CardContent className='p-8 text-center text-muted-foreground'>
                  Recommendation chart is not available yet.
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </section>

      <ThoughtJuggleSection question={textareaQuestion} />

      <SignatureMovingPanel signatures={signatures} />

      <section className='space-y-8'>
        <Reveal className='space-y-3'>
          <Badge variant='outline' className='rounded-full px-4 py-1'>
            Question-by-question insights
          </Badge>
          <h2 className='text-3xl font-semibold md:text-4xl'>
            Expected insight vs actual response pattern
          </h2>
          <p className='max-w-3xl leading-7 text-muted-foreground'>
            Each card explains why the question matters, then summarizes what the submitted responses currently show.
          </p>
        </Reveal>

        <motion.div
          className='space-y-6'
          variants={stagger}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.08 }}
        >
          {aggregatedQuestions.map((question, index) => (
            <QuestionResultCard
              key={question.id}
              question={question}
              index={index}
            />
          ))}
        </motion.div>
      </section>

      <Reveal>
        <Card className='border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-card/70 backdrop-blur-md'>
          <CardContent className='p-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center'>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                    <CheckCircle2 className='size-5' />
                  </div>

                  <div>
                    <h3 className='text-2xl font-semibold'>
                      Overall insight summary
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      A final readout based on the submitted response set.
                    </p>
                  </div>
                </div>

                <Separator />

                <p className='max-w-4xl text-sm leading-7 text-muted-foreground'>
                  The dashboard currently includes {responseCount} submitted
                  responses. The NPS recommendation score is{' '}
                  {nps.toFixed(1)}/10, and the leading learning barrier is{' '}
                  <span className='font-medium'>
                    {topChallenge?.label ?? 'not available'}
                  </span>
                  .
                  {textareaThemes.length > 0 && (
                    <>
                      {' '}
                      The most repeated improvement themes are{' '}
                      <span className='font-medium'>
                        {textareaThemes.join(', ')}
                      </span>
                      .
                    </>
                  )}
                </p>
              </div>

              <Button asChild size='lg' className='rounded-2xl px-6'>
                <Link to='/survey'>Return to survey</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}

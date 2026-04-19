import * as React from "react";
import {
  ArrowRight,
  Brain,
  Gauge,
  ShieldCheck,
  SignpostBig,
  Sparkles,
  Target,
  Trophy,
  Zap,
  BrainCircuit,
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
import { Separator } from "@/components/ui/separator";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
} satisfies Variants;

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} satisfies Variants;

const highlights = [
  {
    icon: Brain,
    title: "Learning science focused",
    description:
      "Evaluate whether Matiks supports memory, recall, repetition, and long-term retention instead of only feeling entertaining.",
  },
  {
    icon: Gauge,
    title: "Usability + engagement",
    description:
      "Measure how the app feels in practice through usability, trust, motivation, challenge level, and overall ease of use.",
  },
  {
    icon: Target,
    title: "Structured final outcome",
    description:
      "The survey ends with an overall recommendation-style question so users can express their final impression clearly.",
  },
];

const surveyBlocks = [
  "Memory & encoding",
  "Spacing & repetition",
  "Retrieval practice",
  "Feedback & error correction",
  "Long-term retention",
  "Nielsen usability principles",
  "Real-world barriers and motivation",
  "Net Promoter Score",
];

const agreements = [
  {
    title: "Informed participation",
    text: "This survey is meant to collect honest opinions about the Matiks app experience from a learner’s point of view.",
  },
  {
    title: "Response flexibility",
    text: "Participants can move through the questions at their own pace and review answers before submitting the survey.",
  },
  {
    title: "Research-style framing",
    text: "The questions focus on both learning effectiveness and user experience, not only on visuals or first impressions.",
  },
];

const matiksPoints = [
  {
    icon: Zap,
    title: "Fast and interactive practice",
    description:
      "Matiks is treated here as a quick, challenge-driven learning experience where users solve and respond actively instead of consuming content passively.",
  },
  {
    icon: Trophy,
    title: "Gamified motivation",
    description:
      "The survey studies whether game-like challenge, achievement, and competition make the learning experience more engaging and rewarding.",
  },
  {
    icon: BrainCircuit,
    title: "Learning impact",
    description:
      "Participants are asked to reflect on whether Matiks actually helps them think better, remember patterns, improve confidence, and stay motivated.",
  },
];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="relative -mt-16 space-y-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-[26rem] h-[20rem] w-[20rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 top-[44rem] h-[18rem] w-[18rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <Card className="overflow-hidden border-border/60 bg-card/70 backdrop-blur-xl">
            <CardHeader className="space-y-6 pb-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full px-4 py-1">Matiks App Survey</Badge>
                <Badge variant="secondary" className="rounded-full px-4 py-1">
                  Gamified Learning
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
                  <Sparkles className="size-4" />
                  Meaningful feedback, not just random ratings
                </div>

                <CardTitle className="max-w-4xl text-4xl leading-tight md:text-5xl xl:text-6xl">
                  Evaluate how well Matiks turns learning into an engaging and effective experience.
                </CardTitle>

                <CardDescription className="max-w-2xl text-base leading-7 md:text-lg">
                  This survey explores the Matiks experience through learning effectiveness,
                  usability, motivation, feedback, and long-term engagement. It is designed
                  to move beyond surface-level design and ask whether the product actually
                  helps people learn in a meaningful way.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <motion.div
                className="grid gap-4 md:grid-cols-3"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      className="rounded-[1.4rem] border border-border/60 bg-background/40 p-5 shadow-sm"
                    >
                      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-2xl px-6">
                  <Link to="/survey">
                    Start the survey
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="rounded-2xl px-6">
                  <a href="#matiks">About Matiks</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/15 via-card/90 to-card/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <SignpostBig className="size-5 text-primary" />
                Survey flow
              </CardTitle>
              <CardDescription>
                A simple two-step experience with a focused academic purpose.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="rounded-[1.25rem] border border-border/60 bg-background/40 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Step 1
                </p>
                <h3 className="mt-2 text-lg font-semibold">Understand the purpose</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The homepage introduces Matiks, explains the aim of the study,
                  and shows what dimensions of the user experience are being evaluated.
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-border/60 bg-background/40 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Step 2
                </p>
                <h3 className="mt-2 text-lg font-semibold">Respond section by section</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Users enter the questionnaire and rate how Matiks performs across
                  learning effectiveness, usability, motivation, barriers, and recommendation intent.
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-dashed border-primary/30 bg-primary/5 p-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Best suited for participants who have used Matiks and can reflect on its
                  learning value as well as its overall experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      {/* MATIKS SECTION */}
      <section id="matiks" className="space-y-8">
        <Reveal className="space-y-3">
          <Badge variant="outline" className="rounded-full px-4 py-1">
            About Matiks
          </Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Why this survey focuses on Matiks
          </h2>
          <p className="max-w-3xl leading-7 text-muted-foreground">
            This survey is centered on the Matiks app and its learning experience.
            The goal is to understand whether Matiks feels engaging, usable, motivating,
            and genuinely helpful for users while they learn and practice.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Card className="h-full border-border/60 bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl">What participants should keep in mind</CardTitle>
                <CardDescription>
                  Answer based on your real experience of using Matiks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  While answering, think about whether Matiks helps you stay engaged,
                  solve problems actively, remember concepts or patterns, recover from
                  mistakes, and feel motivated to continue learning.
                </p>
                <p>
                  Since Matiks mixes learning with game-like interaction, this survey
                  also explores whether that approach improves the experience or creates
                  pressure, confusion, or friction for the user.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <motion.div
            className="grid gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {matiksPoints.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div key={item.title} variants={fadeUp}>
                  <Card className="border-border/60 bg-card/70 backdrop-blur-md">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold leading-6">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="space-y-8">
        <Reveal className="space-y-3">
          <Badge variant="outline" className="rounded-full px-4 py-1">
            What this survey covers
          </Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            A broader look at learning, usability, and real user friction
          </h2>
          <p className="max-w-3xl text-muted-foreground leading-7">
            Instead of asking only whether an app looks good or feels fun, this survey
            checks whether it helps users remember content, recover from mistakes,
            maintain motivation, and trust the platform over time.
          </p>
        </Reveal>

        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {surveyBlocks.map((block, index) => (
            <motion.div key={block} variants={fadeUp}>
              <Card className="h-full border-border/60 bg-card/70 backdrop-blur-md">
                <CardContent className="flex h-full items-start gap-4 p-5">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-6">{block}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="h-full border-border/60 bg-card/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl">Why this study matters</CardTitle>
              <CardDescription>
                Educational apps do more than deliver screens. They shape how people learn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                A learning product may be visually polished and still fail to support
                memory, reflection, confidence, and long-term engagement.
              </p>
              <p>
                This survey tries to capture that wider picture by combining learning-related
                ideas with usability thinking and real-world problems users may face while studying.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="h-full border-border/60 bg-card/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl">What participants should expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-[1.25rem] border border-border/60 bg-background/40 p-4">
                <h3 className="font-semibold">Focused questions</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Each response should reflect actual use of Matiks rather than random guessing
                  or general app preference.
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-border/60 bg-background/40 p-4">
                <h3 className="font-semibold">Simple interaction</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The interface stays lightweight so attention remains on the questionnaire
                  rather than unnecessary visual clutter.
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-border/60 bg-background/40 p-4">
                <h3 className="font-semibold">Review before submit</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Users should be able to think, revise, and then submit their responses with clarity.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      {/* AGREEMENTS */}
      <section id="agreements" className="space-y-8">
        <Reveal className="space-y-3">
          <Badge variant="outline" className="rounded-full px-4 py-1">
            Participation notes
          </Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Before entering the questionnaire
          </h2>
          <p className="max-w-2xl text-muted-foreground leading-7">
            Please answer honestly based on your own experience with Matiks and review your
            responses before submitting.
          </p>
        </Reveal>

        <motion.div
          className="grid gap-4 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {agreements.map((agreement) => (
            <motion.div key={agreement.title} variants={fadeUp}>
              <Card className="h-full border-border/60 bg-card/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck className="size-5" />
                    </div>
                    <CardTitle className="text-xl leading-none">
                      {agreement.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {agreement.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <Card className="border-border/60 bg-card/70 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Quick participation summary</h3>
                  <Separator />
                  <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <li>• Answer based on your actual experience with Matiks.</li>
                    <li>• Review your responses before final submission.</li>
                    <li>• Continue only when you are ready to rate the full experience.</li>
                  </ul>
                </div>

                <Button asChild size="lg" className="rounded-2xl px-6">
                  <Link to="/survey">
                    Continue to survey
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
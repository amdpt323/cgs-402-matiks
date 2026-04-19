export type SurveyQuestion = {
  id: string;
  label: string;
  title: string;
  prompt: string;
  type: "rating_1_10" | "textarea";
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "1",
    label: "Question 1",
    title: "Learning that sticks",
    prompt:
      "When you first learn a new concept in Matiks, does the app explain it in a way that helps it stick through examples, visuals, or connections to things you already know?",
    type: "rating_1_10",
  },
  {
    id: "2",
    label: "Question 2",
    title: "Focus vs distraction",
    prompt:
      "Do Matiks features like points, streaks, or level progress help you focus more on learning, or do they distract you from understanding the concept?",
    type: "rating_1_10",
  },
  {
    id: "3",
    label: "Question 3",
    title: "Revisiting old concepts",
    prompt:
      "Does Matiks bring back concepts you learned earlier after a few days or weeks, or does it mostly keep moving forward without revisiting them?",
    type: "rating_1_10",
  },
  {
    id: "4",
    label: "Question 4",
    title: "Meaningful revision",
    prompt:
      "When Matiks repeats a topic, does it feel like meaningful revision or just the same kind of question repeated again?",
    type: "rating_1_10",
  },
  {
    id: "5",
    label: "Question 5",
    title: "Recall vs recognition",
    prompt:
      "Does Matiks make you actually recall answers from memory, or does it mostly ask you to recognize the right answer from options?",
    type: "rating_1_10",
  },
  {
    id: "6",
    label: "Question 6",
    title: "Applying ideas",
    prompt:
      "After you finish a question or challenge in Matiks, does the app ever ask you to apply the idea in a new way, or does the interaction end once you get the answer?",
    type: "rating_1_10",
  },
  {
    id: "7",
    label: "Question 7",
    title: "Helpful feedback",
    prompt:
      "When you get something wrong in Matiks, does the feedback help you understand your mistake clearly enough that you remember it later?",
    type: "rating_1_10",
  },
  {
    id: "8",
    label: "Question 8",
    title: "Timing of feedback",
    prompt:
      "Does the feedback in Matiks come at the right time—quick enough to help, but still giving you a chance to think first?",
    type: "rating_1_10",
  },
  {
    id: "9",
    label: "Question 9",
    title: "Retention after time",
    prompt:
      "If you were tested on a concept you learned in Matiks two weeks later, how confident are you that you would still remember it?",
    type: "rating_1_10",
  },
  {
    id: "10",
    label: "Question 10",
    title: "Visible improvement",
    prompt:
      "Has Matiks ever surprised you by showing how much you have improved or remembered over time?",
    type: "rating_1_10",
  },
  {
    id: "11",
    label: "Question 11",
    title: "Clear system response",
    prompt:
      "When you complete an activity or earn points in Matiks, is it immediately clear what happened and what you should do next?",
    type: "rating_1_10",
  },
  {
    id: "12",
    label: "Question 12",
    title: "Easy language",
    prompt:
      "Do the instructions, labels, and terms used in Matiks feel natural and easy to understand?",
    type: "rating_1_10",
  },
  {
    id: "13",
    label: "Question 13",
    title: "Easy correction",
    prompt:
      "If you tap the wrong answer or enter the wrong section in Matiks by mistake, is it easy to go back or correct it?",
    type: "rating_1_10",
  },
  {
    id: "14",
    label: "Question 14",
    title: "Consistent behavior",
    prompt:
      "Have you ever felt confused because a button, icon, or interaction in Matiks behaved differently in different parts of the app?",
    type: "rating_1_10",
  },
  {
    id: "15",
    label: "Question 15",
    title: "Mistake prevention",
    prompt:
      "Does Matiks prevent you from making accidental mistakes, like submitting too early or skipping something important without warning?",
    type: "rating_1_10",
  },
  {
    id: "16",
    label: "Question 16",
    title: "Resume after a break",
    prompt:
      "When you return to Matiks after a break, can you quickly continue from where you left off?",
    type: "rating_1_10",
  },
  {
    id: "17",
    label: "Question 17",
    title: "Flexibility and control",
    prompt:
      "Does Matiks offer enough flexibility, like shortcuts, personalization, or the ability to skip material you already know?",
    type: "rating_1_10",
  },
  {
    id: "18",
    label: "Question 18",
    title: "Screen overload",
    prompt:
      "Have you ever felt overwhelmed in Matiks because too many things were competing for your attention on the screen?",
    type: "rating_1_10",
  },
  {
    id: "19",
    label: "Question 19",
    title: "Clear error messages",
    prompt:
      "When something goes wrong in Matiks, does the app explain the problem clearly and tell you how to fix it?",
    type: "rating_1_10",
  },
  {
    id: "20",
    label: "Question 20",
    title: "Finding help",
    prompt:
      "If you get confused while using Matiks, is it easy to find help inside the app?",
    type: "rating_1_10",
  },
  {
    id: "21",
    label: "Question 21",
    title: "What you do when stuck",
    prompt:
      "When you feel stuck on a question or challenge in Matiks, what do you usually do?",
    type: "textarea",
  },
  {
    id: "22",
    label: "Question 22",
    title: "Rewards losing meaning",
    prompt:
      "Have points, streaks, or rewards in Matiks ever stopped feeling meaningful to you? If yes, when did that happen?",
    type: "textarea",
  },
  {
    id: "23",
    label: "Question 23",
    title: "Gamification distraction",
    prompt:
      "Can you describe a moment when game-like features in Matiks distracted you from actually learning?",
    type: "textarea",
  },
  {
    id: "24",
    label: "Question 24",
    title: "Real-world usefulness",
    prompt:
      "How confident are you that what you practice in Matiks helps you in real exams or real problem-solving situations?",
    type: "rating_1_10",
  },
  {
    id: "25",
    label: "Question 25",
    title: "Interrupted usage",
    prompt:
      "Have you ever had to stop using Matiks in the middle of a session because of internet issues, battery problems, or not having access to your device?",
    type: "textarea",
  },
  {
    id: "26",
    label: "Question 26",
    title: "Fit for your learning style",
    prompt:
      "Are there any features or parts of Matiks that feel like they are designed for a different kind of learner than you?",
    type: "textarea",
  },
  {
    id: "27",
    label: "Question 27",
    title: "Discouragement from comparison",
    prompt:
      "Have comparisons, rankings, or competitive features in Matiks ever made you feel discouraged instead of motivated?",
    type: "textarea",
  },
  {
    id: "28",
    label: "Question 28",
    title: "Tension in group use",
    prompt:
      "If Matiks is used in a classroom or group setting, do the competitive features ever create tension between students?",
    type: "textarea",
  },
  {
    id: "29",
    label: "Question 29",
    title: "Incorrect progress tracking",
    prompt:
      "Have you ever felt that Matiks tracked your progress incorrectly, such as marking something wrong when it seemed right or not saving your work properly?",
    type: "textarea",
  },
  {
    id: "30",
    label: "Question 30",
    title: "Why you might stop using it",
    prompt:
      "What would make you stop using Matiks permanently, even if you found it useful at first?",
    type: "textarea",
  },
  {
    id: "31",
    label: "Question 31",
    title: "Recommend Matiks",
    prompt: "How likely are you to recommend Matiks to a friend?",
    type: "rating_1_10",
  },
];
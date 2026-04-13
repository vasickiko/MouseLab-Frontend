import { ScanSearch } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

// Image imports
import palm_grip_mouse from "../assets/findmouse/palmgrip.jpg";
import claw_grip_mouse from "../assets/findmouse/clawgrip.jpg";
import fingertip_grip_mouse from "../assets/findmouse/fingertip.jpg";
import small_mouse from "../assets/findmouse/x2mini.jpg";
import medium_mouse from "../assets/findmouse/x2 medium.jpg";
import large_mouse from "../assets/findmouse/h2large.jpg";
import true_fingertip_mouse from "../assets/findmouse/true ftip.jpg";
import compact_fingertip_mouse from "../assets/findmouse/compact ftip.jpg";
import larger_fingertip_mouse from "../assets/findmouse/larger ftip.jpg";

type QuestionId =
  | "grip"
  | "sizeCategory"
  | "sizeCategoryFingertip"
  | "shape"
  | "weight"
  | "connectivity"
  | "batteryPriority"
  | "material";

type Option = {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
  image?: string;
};

type Question = {
  id: QuestionId;
  title: string;
  subtitle: string;
  options: Option[];
};

type Answers = {
  grip?: string;
  sizeCategory?: string;
  sizeCategoryFingertip?: string;
  shape?: string;
  weight?: string;
  connectivity?: string;
  batteryPriority?: string;
  material?: string;
};

const baseQuestions: Question[] = [
  {
    id: "grip",
    title: "What grip style do you prefer?",
    subtitle: "Choose the one that feels most natural to you.",
    options: [
      {
        value: "palm",
        label: "Palm Grip",
        description: "Your whole hand rests on the mouse",
        image: palm_grip_mouse,
      },
      {
        value: "claw",
        label: "Claw Grip",
        description: "Arched fingers with partial palm contact",
        image: claw_grip_mouse,
      },
      {
        value: "fingertip",
        label: "Fingertip Grip",
        description: "Only fingertips control the mouse",
        image: fingertip_grip_mouse,
      },
    ],
  },
];

const normalQuestions: Question[] = [
  {
    id: "sizeCategory",
    title: "What mouse size do you prefer?",
    subtitle: "Even with the same hand size, some people like smaller or larger mice.",
    options: [
      {
        value: "small",
        label: "Small",
        description: "Compact and nimble",
        image: small_mouse,
      },
      {
        value: "medium",
        label: "Medium",
        description: "Balanced and safe option",
        image: medium_mouse,
      },
      {
        value: "large",
        label: "Large",
        description: "More support and fuller feel",
        image: large_mouse,
      },
    ],
  },
];

const fingertipQuestions: Question[] = [
  {
    id: "sizeCategoryFingertip",
    title: "What kind of fingertip mouse feel do you want?",
    subtitle:
      "Some fingertip users want the smallest possible mouse, while others prefer a bit more support.",
    options: [
      {
        value: "true_fingertip",
        label: "True Fingertip",
        description: "Very small shape with minimal palm contact",
        image: true_fingertip_mouse,
      },
      {
        value: "compact_fingertip",
        label: "Compact",
        description: "Small and nimble, but still easier to control",
        image: compact_fingertip_mouse,
      },
      {
        value: "balanced_fingertip",
        label: "Balanced",
        description: "A medium shape that works well for fingertip",
        image: larger_fingertip_mouse,
      },
    ],
  },
];

const sharedQuestions: Question[] = [
  {
    id: "shape",
    title: "What shape do you prefer?",
    subtitle: "Shape heavily affects comfort and aim.",
    options: [
      {
        value: "symmetrical",
        label: "Symmetrical",
        description: "Balanced and versatile",
        image: medium_mouse,
      },
      {
        value: "asymmetrical",
        label: "Ergonomic",
        description: "More natural hand support",
        image: large_mouse,
      },
      {
        value: "no_preference",
        label: "No Preference",
        description: "Anything works",
        image: small_mouse,
      },
    ],
  },
  {
    id: "weight",
    title: "What weight do you prefer?",
    subtitle: "Weight impacts speed vs control.",
    options: [
      {
        value: "ultralight",
        label: "Ultralight",
        description: "Fast and effortless",
        image: small_mouse,
      },
      {
        value: "medium",
        label: "Balanced",
        description: "Mix of speed & control",
        image: medium_mouse,
      },
      {
        value: "heavy",
        label: "Heavier",
        description: "More stable feel",
        image: large_mouse,
      },
    ],
  },
  {
    id: "connectivity",
    title: "What connectivity do you prefer?",
    subtitle: "Affects latency and setup.",
    options: [
      {
        value: "wired",
        label: "Wired",
        description: "No charging, stable",
        image: small_mouse,
      },
      {
        value: "wireless",
        label: "Wireless",
        description: "Freedom and clean setup",
        image: medium_mouse,
      },
      {
        value: "no_preference",
        label: "No Preference",
        description: "Either is fine",
        image: large_mouse,
      },
    ],
  },
];

const extraQuestions: Question[] = [
  {
    id: "batteryPriority",
    title: "What matters more?",
    subtitle: "Wireless mice trade battery vs weight.",
    options: [
      {
        value: "battery",
        label: "Long Battery",
        description: "Charge less often",
        image: large_mouse,
      },
      {
        value: "lightweight",
        label: "Lower Weight",
        description: "Better performance feel",
        image: small_mouse,
      },
    ],
  },
  {
    id: "material",
    title: "What build do you prefer?",
    subtitle: "Material changes feel & durability.",
    options: [
      {
        value: "solid",
        label: "Solid Shell",
        description: "Premium & sturdy",
        image: large_mouse,
      },
      {
        value: "lightweight",
        label: "Lightweight Shell",
        description: "Focus on weight reduction",
        image: small_mouse,
      },
      {
        value: "no_preference",
        label: "No Preference",
        description: "Doesn’t matter",
        image: medium_mouse,
      },
    ],
  },
];

const MouseFinder = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  let activeQuestions =
    answers.grip === "fingertip"
      ? [...baseQuestions, ...fingertipQuestions]
      : [...baseQuestions, ...normalQuestions];

  activeQuestions = [...activeQuestions, ...sharedQuestions];

  if (answers.connectivity === "wireless") {
    activeQuestions.push(extraQuestions[0]);
  }

  activeQuestions.push(extraQuestions[1]);

  const isFinished = step >= activeQuestions.length;
  const currentQuestion = activeQuestions[step];
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = ((step + 1) / activeQuestions.length) * 100;

  function handleSelect(option: string) {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  }

  function handleNext() {
    if (!currentQuestion) return;
    if (!answers[currentQuestion.id]) return;

    setStep((prev) => prev + 1);
  }

  function handleBack() {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  }

  function handleSkip() {
    setStep((prev) => prev + 1);
  }

  function handleRestart() {
    setAnswers({});
    setStep(0);
  }

  if (isFinished) {
    return (
      <div className="min-h-screen text-white px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 md:p-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mx-auto mb-5">
            <ScanSearch className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold text-center">🎉 Finder Complete</h1>
          <p className="text-white/60 text-center mt-2">
            Here are the answers you selected.
          </p>

          <div className="mt-8 rounded-2xl bg-black/20 border border-white/10 p-5">
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-white/60">Grip style</span>
                <span className="font-medium capitalize">{answers.grip || "-"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-white/60">Mouse size preference</span>
                <span className="font-medium capitalize">
                  {answers.sizeCategory || answers.sizeCategoryFingertip || "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 rounded-2xl bg-white/10 hover:bg-white/15 transition px-5 py-3 font-semibold"
            >
              🔄 Start Again
            </button>

            <button className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-700 transition px-5 py-3 font-semibold">
              🐭 Show Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 text-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-10">
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-medium text-white">
            <p>Question {step + 1} of {activeQuestions.length}</p>
            <p>{Math.round(progress)}%</p>
          </div>

          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl md:text-4xl font-bold">{currentQuestion.title}</h1>
          <p className="text-white/60 text-sm md:text-base">{currentQuestion.subtitle}</p>
        </div>

        <div
          className={`grid gap-4 ${
            currentQuestion.options.length === 2
              ? "grid-cols-2"
              : "grid-cols-1 sm:grid-cols-3"
          }`}
        >
          {currentQuestion.options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`group rounded-2xl flex-1 border text-left transition-all min-h-[220px] flex flex-col justify-between ${
                  isSelected ? "border-white/20 bg-white/10 " : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <img src={option.image} alt={option.label} className="max-w-full h-full object-cover rounded-t-xl"/>

                <div className="flex flex-col items-center justify-center p-5 gap-2">
                  <h2 className="text-xl font-semibold text-center">{option.label}</h2>
                  <p className="text-sm text-white/60 text-center">{option.description}</p>
                  <p className="text-xs text-white/40 group-hover:text-white/60 transition mt-4">Tap to select</p>
                </div>           
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={handleBack} disabled={step === 0} className="bg-transparent">Previous</Button>

          <div className="flex sm:w-auto gap-1">
            <Button onClick={handleSkip} className="bg-transparent">Skip</Button>
            <Button onClick={handleNext} disabled={!selectedValue}>Next Question</Button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MouseFinder;
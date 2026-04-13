import { ScanSearch } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

import palm_grip_mouse from "../assets/findmouse/35263_1.webp"
import claw_grip_mouse from "../assets/findmouse/33717_1.webp"
import fingertip_grip_mouse from "../assets/findmouse/35236.webp"

type QuestionId = "handSize" | "grip" | "connectivity" | "sizeCategory";

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
  handSize?: string;
  grip?: string;
  connectivity?: string;
  sizeCategory?: string;
};

const questions: Question[] = [
  {
    id: "handSize",
    title: "What's your hand size?",
    subtitle: "Measure from wrist to tip of your middle finger.",
    options: [
      {
        value: "small",
        label: "Small",
        description: "Under 17cm × 8cm",
      },
      {
        value: "medium",
        label: "Medium",
        description: "17cm × 8cm – 19.5cm × 9cm",
       
      },
      {
        value: "large",
        label: "Large",
        description: "Over 19.5cm × 9cm",
       
      },
    ],
  },
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

  {
    id: "sizeCategory",
    title: "What mouse size do you prefer?",
    subtitle: "Even with the same hand size, some people like smaller or larger mice.",
    options: [
      {
        value: "small",
        label: "Small",
        description: "Compact and nimble",
      },
      {
        value: "medium",
        label: "Medium",
        description: "Balanced and safe option",
      },
      {
        value: "large",
        label: "Large",
        description: "More support and fuller feel",
      },
    ],
  },
];

const MouseFinder = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const isFinished = step >= questions.length;
  const currentQuestion = questions[step];
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = ((step + 1) / questions.length) * 100;

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
                <span className="text-white/60">Hand size</span>
                <span className="font-medium capitalize">{answers.handSize || "-"}</span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-white/60">Grip style</span>
                <span className="font-medium capitalize">{answers.grip || "-"}</span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-white/60">Connectivity</span>
                <span className="font-medium capitalize">{answers.connectivity || "-"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-white/60">Mouse size preference</span>
                <span className="font-medium capitalize">{answers.sizeCategory || "-"}</span>
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

            <button
              className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-700 transition px-5 py-3 font-semibold"
            >
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
        
        {/* PROGRESS BAR */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-medium text-white">
            <p>Question {step + 1} of {questions.length}</p>
            <p>{Math.round(progress)}%</p>
          </div>

          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* TITLE */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl md:text-4xl font-bold">{currentQuestion.title}</h1>
          <p className="text-white/60 text-sm md:text-base">{currentQuestion.subtitle}</p>
        </div>

        {/* CONTENT */}
        <div className="flex gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`group rounded-2xl flex-1 border text-left transition-all min-h-[220px] flex flex-col justify-between ${isSelected ? "border-white/20 bg-white/10 " : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"}`}>
                  
                                           
                  <img src={option.image} alt={option.label} className="max-w-full rounded-t-xl"/>

                  <div className="flex flex-col items-center justify-center p-5 gap-2">
                    <h2 className="text-xl font-semibold text-center">{option.label}</h2>
                    <p className="text-sm text-white/60 text-center">{option.description}</p>
                    <p className="text-xs text-white/40 group-hover:text-white/60 transition mt-4">Tap to select</p>
                  </div>           
                  
                  
              </button>
            );
          })}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
          <Button onClick={handleBack} disabled={step === 0} className="bg-transparent">Previous Question</Button>

          <div className="flex w-full sm:w-auto gap-1">
            <Button onClick={handleSkip} className="bg-transparent">Skip</Button>
            <Button onClick={handleNext} disabled={!selectedValue}>Next Question</Button>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default MouseFinder;
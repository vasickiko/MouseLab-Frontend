import { useState } from "react";

type Question = {
  id: "grip" | "connectivity" | "sizeCategory";
  title: string;
  options: string[];
};

type Answers = {
  grip?: string;
  connectivity?: string;
  sizeCategory?: string;
};

const questions: Question[] = [
  {
    id: "grip",
    title: "What grip style do you use?",
    options: ["palm", "claw", "fingertip"],
  },
  {
    id: "connectivity",
    title: "Do you prefer wired or wireless?",
    options: ["wired", "wireless"],
  },
  {
    id: "sizeCategory",
    title: "What size are your hands?",
    options: ["small", "medium", "large"],
  },
];

const MouseFinder = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState<number>(0);

  const isFinished = step >= questions.length;
  const currentQuestion = questions[step];

  function handleAnswer(option: string) {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));

    setStep((prev) => prev + 1);
  }

  function handleBack() {
    if (step === 0) return;

    const prevStep = step - 1;
    const prevQuestion = questions[prevStep];

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[prevQuestion.id];
      return updated;
    });

    setStep(prevStep);
  }

  function handleSkip() {
    if (step < questions.length) {
      setStep((prev) => prev + 1);
    }
  }

  if (isFinished) {
    return (
      <div className="min-h-screen container mx-auto bg-white/5 text-white p-10">
        <h1 className="text-2xl font-bold">Finished</h1>
        <pre className="mt-4">{JSON.stringify(answers, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto bg-white/5 text-white p-10">
      <h1 className="text-xl">{currentQuestion.title}</h1>

      <div className="flex gap-4 mt-10">
        {currentQuestion.options.map((option) => (
          <p
            key={option}
            onClick={() => handleAnswer(option)}
            className="cursor-pointer"
          >
            {option}
          </p>
        ))}
      </div>

      <div className="mt-10">
        <button
          className="p-2 px-6 bg-white/10 mr-5"
          onClick={handleBack}
        >
          Prev
        </button>

        <button
          className="p-2 px-6 bg-white/10"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default MouseFinder;
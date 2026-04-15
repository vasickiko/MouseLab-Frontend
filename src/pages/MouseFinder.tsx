import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api"
import { useCompare, type Mouse } from "../Context/CompareContext";

// Image imports
import palm from "../assets/findmouse/palm.jpg"
import claw from "../assets/findmouse/claw.jpg"
import fingertip from "../assets/findmouse/ftip.jpg"

import small from "../assets/findmouse/small.jpg"
import medium from "../assets/findmouse/medium.jpg"
import large from "../assets/findmouse/large.jpg"

import asymm from "../assets/findmouse/asymm.jpg"
import symm from "../assets/findmouse/symm.jpg"
import nullShape from "../assets/findmouse/null.jpg"

import ultralight from "../assets/findmouse/ultralight.jpg"
import light from "../assets/findmouse/light.jpg"
import balanced from "../assets/findmouse/balanced.jpg"

import trueftip from "../assets/findmouse/true ftip.jpg"
import smallftip from "../assets/findmouse/small ftip.jpg"
import balancedftip from "../assets/findmouse/balanced ftip.jpg"
import { Button } from "../components/ui/button"
import { FoldHorizontal, LoaderCircle, RotateCcw } from "lucide-react";


type QuestionId =
  | "grip"
  | "sizeCategory"
  | "sizeCategoryFingertip"
  | "shape"
  | "weight"
  

type Option = {
  value: string;
  label: string;
  description?: string;
  identifier?: any;
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
        image: palm,
      },
      {
        value: "claw",
        label: "Claw Grip",
        description: "Arched fingers with partial palm contact",
        image: claw,
      },
      {
        value: "fingertip",
        label: "Fingertip Grip",
        description: "Only fingertips control the mouse",
        image: fingertip,
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
        image: small,

      },
      {
        value: "medium",
        label: "Medium",
        description: "Balanced and safe option",
        image: medium,
      },
      {
        value: "large",
        label: "Large",
        description: "More support and fuller feel",
        image: large,

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
        description: "Smallest shape possible",
        image: trueftip,
      },
      {
        value: "compact_fingertip",
        label: "Compact",
        description: "Small and nimble",
        image: smallftip,
      },
      {
        value: "balanced_fingertip",
        label: "Balanced",
        description: "A medium shape that works well",
        image: balancedftip,
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
        image: symm,
      },
      {
        value: "asymmetrical",
        label: "Ergonomic",
        description: "More natural hand support",
        image: asymm,
      },
      {
        value: "no_preference",
        label: "No Preference",
        description: "Anything works",
        image: nullShape,
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
        description: "30-45g range",
        image: ultralight,
      },
      {
        value: "light",
        label: "Light",
        description: "45-60g range",
        image: light,

      },
      {
        value: "balanced",
        label: "Balanced",
        description: "60g+ range",
        image: balanced,
      },
    ],
  }
];



const MouseFinder = () => {

  const navigate = useNavigate()

  const {selectMultipleMice, selectMouse} = useCompare()

  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ recommended: Mouse[] } | null>(null);
  const[loading, setLoading] = useState(false)


  let activeQuestions = answers.grip === "fingertip" ? [...baseQuestions, ...fingertipQuestions] : [...baseQuestions, ...normalQuestions];
  activeQuestions = [...activeQuestions, ...sharedQuestions];

  const isFinished = step >= activeQuestions.length;
  const currentQuestion = activeQuestions[step];
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = ((step + 1) / activeQuestions.length) * 100;



const getRecommendations = async () => {
  try {
    setLoading(true);
    const res = await api.get("/recommend/mice", {
      params: answers,
    });

    setResult(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  useEffect(() => {
    if (isFinished && !result) {
      getRecommendations();
    }
  }, [isFinished, result]);

  function handleSelectMouse (mouse: Mouse){
    selectMouse(mouse);
    navigate("/compare")

  }
   

  function handleSelect(option: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({...prev,[currentQuestion.id]: option}));

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
    setResult(null);
  }

  function handleCompareAll(){
    if(!result?.recommended) return
    selectMultipleMice(result.recommended)
    navigate ("/compare")
  }

  if(loading){
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="rounded-lg text-xl font-medium flex text-white items-center p-5 gap-2 "> 
          <LoaderCircle className="animate-spin animate-[spin_1.5s_linear_infinite]" size={50}/>
        </div>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="flex-1 text-white px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-6xl rounded-2xl border flex flex-col items-center justify-center border-white/10 bg-white/10 backdrop-blur-xl p-5 space-y-10">
                              
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl md:text-4xl font-bold">Search is over</h1>
            <p className="text-white/60 text-base md:text-base">Here are {result?.recommended.length} recommendations for you</p>
          </div>                 
                        
          <div className="flex w-full flex-col sm:flex-row items-center gap-4">
            {result?.recommended.map((r) => (
              <div key={r._id} className="sm:w-1/3 w-full flex flex-col rounded-2xl bg-white/10">
                
                <div className="w-full h-64 flex flex-col justify-between bg-white  items-center  rounded-t-2xl">
                  <img
                    src={r.image}
                    alt=""
                    className="h-full object-contain  rounded-t-2xl "
                    loading="lazy"
                  />
                </div>

             
                <div className="flex flex-col items-center justify-center p-5 ">
                    <h2 className="text-white/60  text-center">{r.brand}</h2>
                    <p className=" text-white text-xl font-semibold text-center">{r.model}</p>     
                </div>

               <div className="p-2">
                <div className="rounded-xl bg-white/10 border py-2 px-3 flex flex-col gap-1 border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Size</p>
                      <p className="text-sm text-white/70">{r.sizeCategory}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Grip</p>
                      <p className="text-sm flex gap-2 text-white/70">{r.gripStyles?.map((g)=>(<span className="capitalize">{g}</span>))}</p>
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className="font-medium">Dimensions</p>
                      <p className="text-sm text-white/70">{r.dimensions.width}x{r.dimensions.length}x{r.dimensions.height}</p>
                    </div>
                    <div className="  flex items-center justify-between">
                      <p className="font-medium">Weight</p>
                      <p className="text-sm text-white/70">{r.weight}g</p>
                    </div>

                    <Button onClick={() => handleSelectMouse(r)}>Add to comapre</Button>
                    
                </div>
                  
               </div>
               
              </div>
            ))}
          </div> 

          <div className="flex items-center justify-center gap-1">
            <Button className="bg-white/10" onClick={handleRestart}><RotateCcw />Start Again</Button>
            <Button onClick={handleCompareAll}><FoldHorizontal />Compare All</Button>
          </div>
          

       </div>
      </div>
    );
  }

  return (
    <div className="flex-1 text-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 space-y-10">
        
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`group rounded-2xl flex-1 border text-center transition-all min-h-[220px] flex flex-col justify-between ${
                  isSelected ? "border-white/20 bg-white/10 " : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <img loading="lazy" src={option.image} alt={option.label} className="max-w-full h-full object-cover rounded-t-2xl"/>

                <div className="flex flex-col items-center justify-center p-5 gap-2">
                  <h2 className="text-2xl font-semibold text-center">{option.label}</h2>
                  <p className=" text-white/60 text-center">{option.description}</p>
                  <p className="text-sm text-white/40 group-hover:text-white/60 transition mt-4">Tap to select</p>
                </div>           
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={handleBack} disabled={step === 0} className="bg-white/10">Previous</Button>
          <Button className="bg-white/10" onClick={handleSkip}>Skip</Button>
          
        </div>
        
      </div>
    </div>
  );
};

export default MouseFinder;
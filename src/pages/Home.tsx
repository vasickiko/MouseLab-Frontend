import { Link } from "react-router-dom"

import { Button } from "../components/ui/button"
import { Focus, FoldHorizontal, MoveRight } from "lucide-react"

import finalMouse from "../assets/33717_1.png"

type ButtonItem = {
    label: string
    href: string
    icon?: React.ReactNode
}

const buttons: ButtonItem[] = [
    { label: "Compare Mice", href: "/compare", icon: <FoldHorizontal /> },
    { label: "Find Your Mouse", href: "/finder", icon: <Focus /> },
]

const Home = () => {

    return (
        <div className="flex-1 container mx-auto flex flex-col justify-between items-center min-h-[calc(100vh-120px)] px-4 sm:px-6">
  <div className="w-full flex flex-col gap-4 items-center justify-center pt-10 sm:pt-16 lg:pt-20 xl:pt-24 pb-6">
    <div className="text-white py-1 text-sm font-medium px-3 border border-white/50 rounded-full flex gap-2 items-center justify-center">
      <Link to={"/explore"}>1000+ Mice Available</Link>
      <MoveRight size={15} />
    </div>

    <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-center leading-none">
      Find and Compare <br /> Gaming Mice
    </h1>

    <p className="text-white text-sm sm:text-base lg:text-lg text-center font-medium w-full max-w-[700px]">
      Compare mice side by side and find the differences that matter or answer a few questions and discover the best mouse for you.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-3">
      {buttons.map((button) => (
        <Button key={button.href} variant="default">
          <Link to={button.href} className="w-full flex items-center gap-2">
            {button.icon}
            {button.label}
          </Link>
        </Button>
      ))}
    </div>
  </div>

  <img
  src={finalMouse}
  alt="Final Mouse"
  className="2-1/2 sm:w-[300px] md:w-[340px] lg:w-[380px] xl:w-[420px] 2xl:w-[600px] h-auto mx-auto object-contain"
/>
</div>
    )
}

export default Home
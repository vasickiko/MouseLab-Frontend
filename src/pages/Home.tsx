import { Link } from "react-router-dom"

import { Button } from "../components/ui/button"
import { Focus, FoldHorizontal, MoveRight } from "lucide-react"

import finalMouse from "../assets/35236_3.png"

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
        <div className="flex-1 container mx-auto relative">
            <div className="w-full flex flex-col gap-4 items-center justify-center sm:p-20 p-8">
                <div className="text-white py-1 text-sm font-medium px-3 border border-white/50 rounded-full flex gap-2 items-center justify-center">
                    <Link to={"/explore"}>1000+ Mice Available</Link>
                    <MoveRight size={15}/>
                </div> 
                <h1 className="text-white sm:text-8xl text-4xl font-bold text-center">Find and Compare <br /> Gaming Mice</h1>
                <p className="text-white text-sm sm:text-lg text-center font-medium  w-full sm:max-w-2xl">Compare mice side by side and find the differences that matter or answer a few questions and discover the best mouse for your grip and playstyle.</p>
                <div className="flex items-center gap-3">
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
            <img src={finalMouse} alt="Final Mouse" className="absolute left-1/2 -translate-x-1/2 bottom-0 size-[350px] sm:size-[630px] object-cover" />
            {/* <img src={hitscan} alt="Final Mouse" className="absolute left-1/2 -translate-x-1/2 bottom-0 size-[800px] object-contain" /> */}
        </div>
    )
}

export default Home
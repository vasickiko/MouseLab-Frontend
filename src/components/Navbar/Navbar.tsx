import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Drone, Focus, FoldHorizontal, MessageCircle, Mouse } from "lucide-react"
import { useCompare } from "../../Context/CompareContext"

type NavItem = {
  label: string
  href: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  { label: "Compare Mice", href: "/compare", icon: <FoldHorizontal /> },
  { label: "Find Your Mouse", href: "/finder", icon: <Focus /> },
  { label: "Explore Mice", href:"/explore", icon: <Mouse />},
  { label: "Blog", href:"/blog", icon: <MessageCircle />}
]

const Navbar = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const {openSearch} = useCompare()

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/poooka")
  }


  return (
    <>
    {/* BANNER */}
    <div className="w-full flex gap-2 items-center justify-center text-white text-sm font-semibold p-1.5 bg-gradient-to-r from-pink-600 to-orange-600">
      <p>🔥WLMouse Beast X Mini 30% off only today! Hurry up!🔥</p>
    </div>
    {/* BANNER */}

    <header className="w-full flex items-center justify-center bg-white/10 p-3">
      {token ? (
        <Button variant="default" onClick={handleLogout} className="ml-auto">
          Logout
        </Button>
      ) : (
        <div className="w-full flex items-center justify-between">

          <div className="flex items-center gap-1 text-white">
            <Drone />
            <h1 className="text-2xl text-white font-bold cursor-pointer" onClick={()=>{navigate("/")}}>MouseLab</h1>
          </div>

          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <Button key={item.href} variant="defaultv2">
                <Link to={item.href} className="text-white font-medium flex items-center gap-1.5 w-full">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          <Button variant="search" onClick={openSearch}>
              Search mouse...
         </Button>

        </div>
      )}
    </header>
    </>
  )
}

export default Navbar
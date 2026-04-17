import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  Drone,
  Focus,
  FoldHorizontal,
  MessageCircle,
  Mouse,
  Menu,
  X,
} from "lucide-react"
import { useCompare } from "../../Context/CompareContext"

type NavItem = {
  label: string
  href: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: "Compare Mice",
    href: "/compare",
    icon: <FoldHorizontal className="w-4 h-4" />,
  },
  {
    label: "Find Your Mouse",
    href: "/finder",
    icon: <Focus className="w-4 h-4" />,
  },
  {
    label: "Explore Mice",
    href: "/explore",
    icon: <Mouse className="w-4 h-4" />,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: <MessageCircle className="w-4 h-4" />,
  },
  // {
  //   label: "login",
  //   href: "/poooka",
  // },
]

const Navbar = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const { openSearch } = useCompare()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/poooka")
    setMenuOpen(false)
  }

  function handleNavigateHome() {
    navigate("/")
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-[1000] w-full bg-[#1A1A1A] border-b border-white/10">
      {token ? (
        <div className="flex justify-end p-3">
          <Button variant="default" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="relative">
          {/* Banner */}
          <div className="w-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold p-1.5 bg-gradient-to-r from-pink-600 to-orange-600">
            <p>🔥WLMouse Beast X Mini 30% off only today! Hurry up!🔥</p>
          </div>

          {/* Main navbar row */}
          <div className="w-full flex items-center p-3">
            {/* Left */}
            <div
              className="flex flex-1 items-center gap-1 text-white cursor-pointer shrink-0"
              onClick={handleNavigateHome}
            >
              <Drone />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                MouseLab
              </h1>
            </div>

            {/* Center desktop nav */}
            <nav className="hidden md:flex items-center justify-center gap-4">
              {navItems.map((item) => (
                <Button key={item.href} variant="defaultv2">
                  <Link
                    to={item.href}
                    className="text-white font-medium flex items-center gap-1.5 w-full"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>

            {/* Right */}
            <div className="flex flex-1 items-center justify-end gap-2">
              <Button variant="search" onClick={openSearch}>
                Search mouse...
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="md:hidden text-white"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X size={18} strokeWidth={3} />
                ) : (
                  <Menu size={18} strokeWidth={3} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/50 backdrop-blur-3xl border-t border-white/10 z-[1001]">
              <div className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
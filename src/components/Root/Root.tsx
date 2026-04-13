import { Outlet } from "react-router-dom"

import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import MouseSearch from "../SearchMice/SearchMice"

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <MouseSearch />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root
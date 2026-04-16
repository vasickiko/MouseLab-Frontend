import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCompare, type Mouse } from "../../Context/CompareContext"
import api from "../../api/api"
import { ChevronLeft } from "lucide-react"


const MouseSearch = () => {
  const navigate = useNavigate()

  const [mice, setMice] = useState<Mouse[]>([])
  const [search, setSearch] = useState("")

  const { isSearchOpen, closeSearch, selectMouse, miceToCompare } = useCompare()

  const handleSelect = (mouse: Mouse) => {
    selectMouse(mouse)
    navigate("/compare")
  }

  const fetchMice = async () => {
    try {
      const res = await api.get("/get/mice", {
        params: { search }
      })
      setMice(res.data.mice)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(!search.trim()){
        setMice([])
      return
    }

    fetchMice()
  }, [search])

  useEffect(() => {
    setSearch("")
  }, [closeSearch])

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex items-start justify-center overflow-x-hidden py-10 sm:pt-44 px-4">

      <div className="w-full max-h-full overflow-x-hidden max-w-2xl bg-[#1A1A1A] overflow-auto rounded-2xl p-3 border-4 border-[#535353] flex flex-col justify-start gap-3">
        
        <div onClick={closeSearch} className="flex items-center gap-1 text-white cursor-pointer w-fit">
          <ChevronLeft strokeWidth={2.5} size={15} />
          <p className="text-sm font-medium text-center">Back</p>
        </div>
        
        <div className="flex items-center justify-between gap-2 border border-[#535353] rounded-xl py-2 px-4 outline-none bg-[#313131]">
          <input
            type="text"
            placeholder="Add mice to compare"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-white w-full bg-transparent  focus:outline-none placeholder:text-white placeholder:text-sm"
          />
            <div className="w-fit flex gap-1 text-xs font-medium text-white items-center justify-center">
              <p>{mice.length}</p>  
              <p>results</p>
            </div>      
          {/* <p className="w-fit text-center font-medium text-sm text-white">{mice.length} results</p> */}
        </div>


       {mice.length > 0 && (
         <div className="space-y-3 gap-2 w-full overflow-y-auto text-white">
          {mice.map((mouse) => (
            <div
              key={mouse._id}
              onClick={() => handleSelect(mouse)}
              className={`cursor-pointer rounded-lg hover:bg-white/10 transition flex items-center gap-4 ${miceToCompare.some((m) => m._id === mouse._id) ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <img
                src={mouse.image}
                alt={`${mouse.brand} ${mouse.model}`}
                className="w-20 object-contain rounded-lg bg-white"
              />

              <div>
                <p className="font-semibold">
                  {mouse.brand} {mouse.model}
                </p>
                <p className="text-xs sm:text-sm text-white/40 capitalize">
                   {mouse.gripStyles.join(", ")} • {mouse.weight}g • {mouse.performance.pollingRate}Hz
                </p>
              </div>
            </div>
          ))}

        </div>
       )}
      </div>
    </div>
  )
}

export default MouseSearch
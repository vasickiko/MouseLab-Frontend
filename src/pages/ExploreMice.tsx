import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Funnel, RotateCcw, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"

import { useCompare, type Mouse } from "../Context/CompareContext"

import api from "../api/api"

type ApiResponse = {
  mice: Mouse[]
  total: number
  page: number
  pages: number
}

const ExploreMice = () => {

  const navigate = useNavigate()
  const { selectMouse } = useCompare()

  const [mice, setMice] = useState<Mouse[]>([])
  const [allBrands, setAllBrands] = useState<string[]>([])
  const [brand, setBrand] = useState("all")
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("recent")
  const [size, setSize] = useState("all")
  const [shape, setShape] = useState("all")
  const [connectivity, setConnectivity] = useState("all")
  const [sensor, setSensor] = useState("")
  const [material, setMaterial] = useState("")
  const [weightRange, setWeightRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchBrands = async () => {
        try {
        const res = await api.get<ApiResponse>("/get/mice", {
            params: { limit: 1000 }
        })

        const brands = [...new Set(res.data.mice.map((mouse) => mouse.brand))]
        setAllBrands(brands)
        } catch (error) {
        console.error("Failed to fetch brands", error)
        }
    }
    fetchBrands()
    }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilters(true)
      } else {
        setShowFilters(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchMice = async () => {
      try {
        setLoading(true)

        const params: Record<string, string | number> = {
          page,
          limit: 24,
          sort,
        }

        if (search) params.search = search
        if (brand !== "all") params.brand = brand
        if (size !== "all") params.size = size
        if (shape !== "all") params.shape = shape
        if (connectivity !== "all") params.connectivity = connectivity
        if (sensor) params.sensor = sensor
        if (material) params.material = material
        if (weightRange[0] > 0) params.weightMin = weightRange[0]
        if (weightRange[1] < 100) params.weightMax = weightRange[1]

        const { data } = await api.get<ApiResponse>("/get/mice", { params })

        setMice(data.mice || [])
        setTotal(data.total || 0)
        setPages(data.pages || 1)
      } catch (error) {
        console.error("Failed to fetch mice", error)
        setMice([])
        setTotal(0)
        setPages(1)
      } finally {
        setLoading(false)
      }
    }

    fetchMice()
  }, [search, sort, brand, size, shape, connectivity, sensor, material, weightRange, page])

  const clearFilters = () => {
    setSearchInput("")
    setSearch("")
    setSort("recent")
    setBrand("all")
    setSize("all")
    setShape("all")
    setConnectivity("all")
    setSensor("")
    setMaterial("")
    setWeightRange([0, 100])
    setPage(1)
  }

  const appliedFilters = [
    search ? `Search: ${search}` : null,
    sort !== "recent" ? `Sort: ${sort}` : null,
    brand !== "all" ? `Brand: ${brand}` : null,
    size !== "all" ? `Size: ${size}` : null,
    shape !== "all" ? `Shape: ${shape}` : null,
    connectivity !== "all" ? `Connectivity: ${connectivity}` : null,
    sensor ? `Sensor: ${sensor}` : null,
    material ? `Material: ${material}` : null,
    weightRange[0] !== 0 || weightRange[1] !== 100 ? `Weight: ${weightRange[0]}g - ${weightRange[1]}g` : null,
  ].filter(Boolean)

  const handleMouseClick = (mouse: Mouse) => {
    selectMouse(mouse)
    navigate("/compare")
  }

  
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="w-full lg:w-[280px] shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-2 lg:hidden">
                  <div className="flex-1 relative text-white">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full placeholder:text-white rounded-xl bg-white/10 border border-white/10 h-10 px-3 text-white"
                    />
                    <Search
                      size={17}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                    />
                  </div>

                  <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="py-2 px-3 h-10 bg-white/10 border border-white/10 rounded-xl text-sm flex items-center gap-2"
                  >
                    <Funnel size={16} />
                    Filters
                  </button>
                </div>

                <div className="hidden lg:block relative text-white">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full placeholder:text-white rounded-xl bg-white/10 border border-white/10 py-2 px-3 text-white"
                  />
                  <Search
                    size={17}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  />
                </div>

                <div
                  className={`${showFilters ? "block mt-4" : "hidden"} lg:block rounded-2xl bg-white/10 border border-white/10 p-4 space-y-4`}
                >
                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-2">
                      Default sort
                    </label>
                    <Select
                      value={sort}
                      onValueChange={(value) => {
                        setSort(value)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="recent">Recently added</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="weight-low">Weight: low to high</SelectItem>
                          <SelectItem value="weight-high">Weight: high to low</SelectItem>
                          <SelectItem value="dpi-high">DPI: high to low</SelectItem>
                          <SelectItem value="dpi-low">DPI: low to high</SelectItem>
                          <SelectItem value="name-asc">Name: A-Z</SelectItem>
                          <SelectItem value="name-desc">Name: Z-A</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-2">Size</label>
                    <Select
                      value={size}
                      onValueChange={(value) => {
                        setSize(value)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-2">Shape</label>
                    <Select
                      value={shape}
                      onValueChange={(value) => {
                        setShape(value)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by shape" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="symmetrical">Symmetrical</SelectItem>
                          <SelectItem value="asymmetrical">Asymmetrical</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-2">Brand</label>
                    <Select
                      value={brand}
                      onValueChange={(value) => {
                        setBrand(value)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by shape" />
                      </SelectTrigger>
                      <SelectContent>
                       
                          <SelectGroup>
                            <SelectItem value="all">All</SelectItem>
                            {allBrands.map((brandName) => (
                                <SelectItem key={brandName} value={brandName}>
                                {brandName}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                       
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-2">
                      Connectivity
                    </label>
                    <Select
                      value={connectivity}
                      onValueChange={(value) => {
                        setConnectivity(value)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by connectivity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="wired">Wired</SelectItem>
                          <SelectItem value="wireless">Wireless</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-2">Sensor</label>
                    <input
                      type="text"
                      id="sensor"
                      placeholder="Example: PAW3395"
                      value={sensor}
                      onChange={(e) => {
                        setSensor(e.target.value)
                        setPage(1)
                      }}
                      className="w-full placeholder:text-white/60 rounded-xl bg-white/10 border border-white/10 py-2.5 px-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 text-sm mb-4">
                      Weight range
                    </label>

                    <div className="px-2 mt-2 h-1 bg-white/20 flex items-center justify-center rounded-full">
                      <Slider
                        value={weightRange}
                        onValueChange={(value) => {setWeightRange(value); setPage(1)}}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-3 gap-2">
                      <p className="text-white">{weightRange[0]}g</p>
                      <p className="text-white">{weightRange[1]}g</p>
                    </div>
                  </div>

                  <Button className="bg-white/10 w-full" onClick={clearFilters}>
                    <RotateCcw />
                    Clear filters
                  </Button>
                </div>
              </div>
            </aside>

            <main className="flex-1 min-w-0 space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Explore Mice
                </h1>
                <p className="max-w-4xl leading-7">
                  Browse and compare gaming mice to find the ideal match for your
                  preferences. Shape, size, and weight affect comfort, while sensor,
                  DPI and polling rate affect performance.
                </p>
                <p className="text-white/60 text-sm">{total} products</p>
              </div>

              {appliedFilters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.map((filter, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white"
                    >
                      {filter}
                    </div>
                  ))}
                </div>
              )}

              {loading ? (
                <div className="py-20 text-center text-zinc-400">Loading mice...</div>
              ) : mice.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-zinc-400">
                  No mice found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {mice.map((mouse) => (
                    <div
                      key={mouse._id}
                      className="rounded-2xl border border-white/10 bg-white/10 overflow-hidden hover:bg-white/[0.13] transition"
                    >
                      <div className="bg-white h-56 flex items-center justify-center p-4">
                        <img
                          src={mouse.image}
                          alt={`${mouse.brand} ${mouse.model}`}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <div className="p-3 text-center">
                          <p className="text-sm text-white/60">{mouse.brand}</p>
                          <p className="font-semibold">{mouse.model}</p>
                        </div>

                        <div className="w-full px-3 pb-3">
                          <Button onClick={() => handleMouseClick(mouse)} className="w-full">Compare</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg 5 disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                onClick={() => setPage(index + 1)}
                className={`h-10 w-10 font-bold rounded-full border ${
                  page === index + 1
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white border-white/10"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreMice
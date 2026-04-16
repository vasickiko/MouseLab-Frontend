import { createContext, useContext, useState, type ReactNode } from "react"

type SizeCategory = "small" | "medium" | "large"
type ShapeCategory = "symmetrical" | "asymmetrical"
type GripStyle = "palm" | "claw" | "fingertip" | "true fingertip" | "aggressive claw" | "relaxed claw"
type Connectivity = "wired" | "wireless"
type Software = "web" | "download" | "web and download"
export type MouseColorVariant = { mode: "static" | "ombre", values: string[] }

export interface MouseFormData {
  image: File | null
  brand: string
  model: string
  sizeCategory: SizeCategory
  dimensions: {
    width: string
    height: string
    length: string
  }
  weight: string
  shapeCategory: ShapeCategory
  gripStyles: GripStyle[]
  sensor: string
  connectivity: Connectivity
  software: Software
  mcu: string
  batteryLife?: string
  performance: {
    dpi: string
    pollingRate: string
    trackingSpeed: string
    acceleration: string
  }
  batteryMah?: string
  switches: string
  scrollWheel: string
  material: string
  coating: boolean
  colors: MouseColorVariant[]
  affiliateLink?: {
    amazon:string
    aliExpress:string
  } 
}

export interface Mouse {
  _id: string
  image: string
  brand: string
  model: string
  sizeCategory: SizeCategory
  dimensions: {
    width: string
    height: string
    length: string
  }
  weight: string
  shapeCategory: ShapeCategory
  gripStyles: GripStyle[]
  sensor: string
  connectivity: Connectivity
  software: Software
  mcu: string
  batteryLife?: string
  performance: {
    dpi: string
    pollingRate: string
    trackingSpeed: string
    acceleration: string
  }
  batteryMah?: string
  switches: string
  scrollWheel: string
  material: string
  coating: boolean
  colors: MouseColorVariant[]
  affiliateLink?: {
    amazon:string
    aliExpress:string
  } 
}

interface CompareContextType {
  miceToCompare: Mouse[]
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  selectMouse: (mouse: Mouse) => void
  selectMultipleMice: (mice: Mouse[]) => void
  removeMouse: (mouseId: string) => void
}

const CompareContext = createContext<CompareContextType | null>(null)

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [miceToCompare, setMiceToCompare] = useState<Mouse[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = () => {
    setIsSearchOpen(true)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const selectMouse = (mouse: Mouse) => {
    const alreadyExists = miceToCompare.some((m) => m._id === mouse._id)

    if (alreadyExists) {
      closeSearch()
      return
    }

    setMiceToCompare((prev) => [...prev, mouse])
    closeSearch()
  }

  const selectMultipleMice = (mice: Mouse[]) => {
  setMiceToCompare((prev) => {
    const newMice = mice.filter(
      (mouse) => !prev.some((m) => m._id === mouse._id)
    )
    return [...prev, ...newMice]
  })
}


  const removeMouse = (mouseId: string) => {
    setMiceToCompare((prev) => prev.filter((m) => m._id !== mouseId))
  }

  return (
    <CompareContext.Provider
      value={{
        miceToCompare,
        isSearchOpen,
        openSearch,
        closeSearch,
        selectMouse,
        selectMultipleMice,
        removeMouse,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => {
  const context = useContext(CompareContext)

  if (!context) {
    throw new Error("useCompare must be used inside CompareProvider")
  }

  return context
}
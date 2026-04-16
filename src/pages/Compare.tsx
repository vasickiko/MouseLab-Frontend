
import { useCompare } from "../Context/CompareContext"
import { AudioWaveform, Battery, Cpu, Crosshair, Download, Egg, GitCommitVertical, Hand, LocateFixed, Maximize, Minimize2, MouseLeft, Palette, Plus, ShoppingBag, Squircle, Weight, Wifi, Wind, X, Zap } from "lucide-react"

const LABEL_WIDTH = "sm:w-[280px] w-[215px]"
const COL_WIDTH = "sm:w-[280px] w-[200px]"
const GAP = "gap-0"

import type { MouseColorVariant } from "../Context/CompareContext"

// import amazon from "../assets/affiliateLinks/amazon-logo.jpg"
// import aliexpress from "../assets/affiliateLinks/aliexpress-icon.jpg"

const Row = ({label, values, metric, icon}:{label: string, metric?: string, values: (string | number)[], icon?: React.ReactNode}) => {
  return (
    <div className="flex gap-0">

      <div className={`${LABEL_WIDTH} flex-shrink-0 h-14 sm:text-base text-sm px-4 flex items-center justify-between border-b border-r border-white/10 bg-white/10 `}>
        <div className="flex items-center justify-center gap-1.5">
          {icon && icon}
          <p className="capitalize font-medium">{label}</p>
        </div>

        {metric && (
          <p className="text-xs font-medium py-1 px-2 text-white/40 bg-white/10 rounded-lg">{metric}</p>
        )}
      </div>

      <div className={`flex ${GAP}`}>
        {values.map((value, index) => (
          <div key={index} className={`${COL_WIDTH} font-medium sm:text-base text-sm capitalize border-b border-r border-white/10 flex-shrink-0 h-14 px-4 flex items-center justify-center text-center bg-black bg-white/5`}>
            {value || "-"}
            {label === "Weight" && <p className="lowercase">g</p>}
            
          </div>
        ))}
      </div>

    </div>
  )
}

// const LinkRow = ({label, values, icon}: {label: string, values: { amazon?: string, aliExpress?: string}[], icon?: React.ReactNode}) => {
//   return (
//     <div className="flex gap-0">

//       <div className={`${LABEL_WIDTH} flex-shrink-0 min-h-14 px-4 py-3 flex items-center justify-between border-b border-r border-white/10 bg-white/10`}>
//         <div className="flex items-center justify-center gap-1.5">
//           {icon && icon}
//           <p className="capitalize">{label}</p>
//         </div>
//       </div>

//       <div className={`flex ${GAP}`}>
//         {values.map((value, index) => (
//           <div key={index} className={`${COL_WIDTH} border-b border-r border-white/10 flex-shrink-0 min-h-14 px-4 py-3 flex items-center justify-center text-center bg-white/5`}>
//             {value?.amazon || value?.aliExpress ? (
//               <div className="w-full flex flex-col gap-2">
//                 {value?.amazon && (
//                   <a
//                     href={value.amazon}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="h-9 bg-white flex items-center justify-center rounded-xl gap-1"
//                   >
//                     <img src={amazon} alt="Amazon" className="sm:w-7 w-6" />
//                     <p className="font-semibold sm:text-sm text-xs text-black">Amazon</p>
//                   </a>
//                 )}

//                 {value?.aliExpress && (
//                   <a
//                     href={value.aliExpress}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="h-9 bg-white flex items-center justify-center rounded-xl gap-1"
//                   >
//                     <img src={aliexpress} alt="AliExpress" className="sm:w-6 w-5" />
//                     <p className="font-semibold sm:text-sm text-xs text-black">AliExpress</p>
//                   </a>
//                 )}
//               </div>
//             ) : (
//               "-"
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



const ColorRow = ({
  label,
  values,
  icon,
}: {
  label: string
  values: MouseColorVariant[][]
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex gap-0">
      <div className={`${LABEL_WIDTH} flex-shrink-0 min-h-14 px-4 py-3 flex items-center border-b border-r border-white/10 bg-white/10`}>
        <div className="flex items-center gap-1.5">
          {icon}
          <p className="capitalize">{label}</p>
        </div>
      </div>

      <div className={`flex ${GAP}`}>
        {values.map((colors, index) => (
          <div
            key={index}
            className={`${COL_WIDTH} border-b border-r border-white/10 flex-shrink-0 min-h-14 px-4 py-3 flex items-center justify-center bg-white/5`}
          >
            {colors?.length ? (
              <div className="flex gap-2 flex-wrap justify-center items-start">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="sm:h-6 w-5 sm:w-6 h-5 rounded-full border border-white/50"
                    style={
                      color.mode === "ombre"
                        ? {
                            background: `linear-gradient(to bottom, ${color.values[0]}, ${color.values[1]})`,
                          }
                        : {
                            backgroundColor: color.values[0],
                          }
                    }
                  />
                ))}
              </div>
            ) : (
              "-"
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const Compare = () => {
  const { miceToCompare, openSearch, removeMouse } = useCompare()

  return (
    <div className="container min-h-screen flex flex-col space-y-8 mx-auto px-4 py-8 text-white">

      <div className={`overflow-x-auto flex ${miceToCompare.length === 0 ? "justify-center" : ""}`}>
        <div className="min-w-max">

          <div className={`flex ${GAP}`}>

            <div className={`${miceToCompare.length === 0 ? "hidden" : ""} ${LABEL_WIDTH} flex-shrink-0`} />

            {miceToCompare.map((mouse) => (       
              <div key={mouse._id} className={`${COL_WIDTH} border h-fit border-white/10 border-b-0 flex-shrink-0 rounded-xl rounded-b-none overflow-hidden bg-white/10`}>
                  
                <div className="relative h-fit bg-white flex items-center justify-center">
                  <button onClick={() => removeMouse(mouse._id)} className="absolute top-2 right-2 text-black">
                    <X size={16} strokeWidth={2}/>
                  </button>

                  <img src={mouse.image} alt={`${mouse.brand} ${mouse.model}`} className="sm:h-[250px] h-[190px]  object-contain"/>
                </div>

                <div className="p-3 text-center">
                  <p className="text-sm text-white/60">{mouse.brand}</p>
                  <p className="font-semibold">{mouse.model}</p>
                </div>   
                </div>
            ))}

          

            <div onClick={openSearch} className="sm:min-h-[300px] min-h-[250px] sm:min-w-[300px] min-w-[250px] flex-shrink-0 p-8 bg-transparent flex items-center justify-center cursor-pointer transition">
              <div className="border rounded-lg border-white/30 border-dashed w-full h-full flex flex-col items-center justify-center">
                <Plus size={30} strokeWidth={2.5}/>
                <p>Compare</p>
              </div>
            </div>

          </div>

          {miceToCompare.length > 0 && (
            <div className="inline-block rounded-xl rounded-r-none overflow-hidden border border-r-0 border-white/10">
                    
              <Row
                label="Size Category"
                values={miceToCompare.map((m) => m.sizeCategory)}
                icon={<Maximize size={15} strokeWidth={2.5}/>}
              />

              <Row
                label="Length"
                metric="mm"
                values={miceToCompare.map((m) => m.dimensions.length)}
                icon={<Minimize2 size={15} strokeWidth={2.5}/>}
              />

              <Row
                label="Width"
                metric="mm"
                values={miceToCompare.map((m) => m.dimensions.width)}
                icon={<Minimize2 size={15} strokeWidth={2.5}/>}
              />

              <Row
                label="Height"
                metric="mm"
                values={miceToCompare.map((m) => m.dimensions.height)}
                icon={<Minimize2 size={15} strokeWidth={2.5}/>}
              />

              <Row
                label="Weight"
                metric="Grams"
                values={miceToCompare.map((m) => m.weight)}
                icon={<Weight size={15} strokeWidth={2.5} />}
              />

            
              <Row
                label="Shape"
                values={miceToCompare.map((m) => m.shapeCategory)}
                icon={<Egg size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Grip"
                values={miceToCompare.map((m) => m.gripStyles?.join(", ") || "-")}
                icon={<Hand size={15} strokeWidth={2.5} />}
              />

              <ColorRow
                label="Available Colors"
                values={miceToCompare.map((m) => m.colors)}
                icon={<Palette size={15} strokeWidth={2.5} />}
              />

              <Row
                label="MCU"
                values={miceToCompare.map((m) => m.mcu)}
                icon={<Cpu size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Sensor"
                values={miceToCompare.map((m) => m.sensor)}
                icon={<LocateFixed size={15} strokeWidth={2.5} />}
              />

              <Row
                label="DPI"
                values={miceToCompare.map((m) => m.performance.dpi)}
                icon={<Crosshair size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Polling Rate"
                metric="Hz"
                values={miceToCompare.map((m) => m.performance.pollingRate)}
                icon={<AudioWaveform size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Tracking Speed"
                metric="IPS"
                values={miceToCompare.map((m) => m.performance.trackingSpeed)}
                icon={<Zap size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Acceleration"
                metric="G"
                values={miceToCompare.map((m) => m.performance.acceleration)}
                icon={<Wind size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Connectivity"
                values={miceToCompare.map((m) => m.connectivity)}
                icon={<Wifi size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Battery"
                metric="mAh"
                values={miceToCompare.map((m) => m.batteryMah || "-")}
                icon={<Battery size={15} strokeWidth={2.5} />}
              />
              
              <Row
                label="Battery Life"
                metric="Hours"
                values={miceToCompare.map((m) => m.batteryLife || "-")}
                icon={<Battery size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Software"
                values={miceToCompare.map((m) => m.software)}
                icon={<Download size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Switches"
                values={miceToCompare.map((m) => m.switches)}
                icon={<MouseLeft size={15} strokeWidth={2.5} />}
              />

              <Row
                label="SWheel Encoder"
                values={miceToCompare.map((m) => m.scrollWheel)}
                icon={<GitCommitVertical size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Material"
                values={miceToCompare.map((m) => m.material || "-")}
                icon={<Squircle size={15} strokeWidth={2.5} />}
              />

              <Row
                label="Coating"
                values={miceToCompare.map((m) => (m.coating ? "Yes" : "No"))}
                icon={<Squircle size={15} strokeWidth={2.5} />}
              />

              {/* <LinkRow
                label="Where To Buy"
                values={miceToCompare.map((m) => m.affiliateLink || {})}
                icon={<ShoppingBag size={15} strokeWidth={2.5}/>}
              /> */}

            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Compare
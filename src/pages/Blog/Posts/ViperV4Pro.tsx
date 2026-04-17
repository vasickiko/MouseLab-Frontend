import heroImage from "../../../assets/posts/v4pro.png"
import comparisonImage from "../../../assets/posts/vv4provv3pro.png"

const ViperV4Pro = () => {
  return (
    <div className="flex flex-col items-center text-white container mx-auto px-6 py-8">

      {/* HERO */}
      <div className="max-w-4xl flex flex-col items-center justify-center">
        <div className="w-full p-4 flex flex-col gap-4">
          <span className="text-sm text-white/60">Published April 17, 2026</span>
          <h1 className="sm:text-6xl text-4xl font-bold">
            Taking A First Look At The All New Razer Viper V4 Pro
          </h1>
        </div>

        <img
          src={heroImage}
          alt="Viper V4 Pro"
          className="w-full"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl w-full mt-12 flex flex-col gap-12">

        {/* INTRO */}
        <section className="flex flex-col gap-4 flex-wrap bg-white/5 border border-white/10 rounded-2xl p-6 md:p-5">
          <p className="text-white/80 leading-8 text-lg">
            The Viper V4 Pro doesn’t try to reinvent the wheel — and that’s exactly
            why it stands out. Instead of chasing extreme weight or gimmicky features,
            it focuses on refining what already worked: shape, balance, and raw performance.
          </p>

          <p className="text-white/80 leading-8 text-lg">
            At around 49g, paired with a top-tier sensor and 8000Hz polling,
            this is clearly aimed at competitive players who care more about
            consistency than flashy features. :contentReference[oaicite:0]
          </p>
           <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">Razer</span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">Viper V4 Pro</span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">Wireless</span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">Lightweight</span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">Symmetrical</span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">Esports</span>
          </div>
        </section>

        {/* DESIGN */}
        <section className="flex flex-col items-center gap-10">
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-semibold">Design & Shape</h2>

                <p className="text-white/80 text-lg  leading-8">
                    If you’ve used previous Viper models, nothing here will surprise you.
                    The shape remains safe, symmetrical, and extremely familiar — which is
                    exactly why so many pros stick with it.
                </p>

                <p className="text-white/80 text-lg  leading-8">
                    What *has* improved is the balance and overall feel. The weight distribution
                    is more even, and despite being lighter, the shell feels solid with no flex
                    or creaking. :contentReference[oaicite:1]
                </p>

                <p className="text-white/80 text-lg  leading-8">
                    Coating is noticeably grippy — something even users on Reddit pointed out,
                    saying it’s easier to hold compared to competitors.
                </p>

                <blockquote className="border-l-2 border-white/20 pl-4 text-white/60 italic">
                    “Razer’s coating is even grippier somehow… I can confidently hold it with 3 fingers.”
                    :contentReference[oaicite:2]
                </blockquote>
            </div>
        
            <img src={comparisonImage} alt="Viper V4 Pro vs Viper V3 Pro" className="w-3/4 sm:w-1/2" />
        </section>

        {/* PERFORMANCE */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Performance</h2>

         <p className="text-white/80 text-lg  leading-8">
            This is where the V4 Pro really delivers. The Focus Pro 50K sensor,
            paired with 8000Hz polling, results in extremely low latency and
            near-perfect tracking.
          </p>

         <p className="text-white text-lg  leading-8">
            In real use, it feels instant — whether wired or wireless. Reviewers
            consistently mention that there’s no noticeable difference between
            the two modes. :contentReference[oaicite:3]
          </p>

          <p className="text-white/80 text-lg  leading-8">
            It’s not about “feeling faster” — it’s about consistency. No weird
            acceleration, no tracking issues, just reliable performance every time.
          </p>
        </section>

        {/* BATTERY & SOFTWARE */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Battery & Software</h2>

          <p className="text-white text-lg  leading-8">
            Battery life is one of the biggest improvements — up to around
            180 hours at 1000Hz, which is honestly insane for a mouse at this level. :contentReference[oaicite:4]
          </p>

          <p className="text-white text-lg  leading-8">  
            Another underrated upgrade is the web-based software. No installs,
            no heavy background apps — just open your browser and configure everything.
          </p>

          <p className="text-white text-lg  leading-8">
            That alone is a huge quality-of-life improvement, especially for people
            who switch systems or dual boot.
          </p>
        </section>

        {/* CONS */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Things To Keep In Mind</h2>

          <ul className="text-white/80 text-lg leading-8 list-disc pl-5">
            <li>No Bluetooth — strictly performance-focused</li>
            <li>Scroll wheel feel is decent but not the best</li>
            <li>Clicks can sound slightly hollow or loud</li>
            <li>Premium price for a “safe” design</li>
          </ul>
        </section>

        {/* VERDICT */}
        <section className="flex flex-col gap-4 flex-wrap bg-white/5 border border-white/10 rounded-2xl p-6 md:p-5">
          <h2 className="text-3xl font-semibold">Verdict</h2>

          <p className="text-white/80 leading-8 text-lg">
            The Viper V4 Pro is not trying to be revolutionary — it’s trying to be
            perfect at what matters. And for competitive players, it gets very close.
          </p>

          <p className="text-white/80 leading-8">
            If the shape works for you, this is easily one of the best mice available
            right now. Not because it does something crazy — but because it does
            everything *right*.
          </p>
        </section>

      </div>
    </div>
  )
}

export default ViperV4Pro
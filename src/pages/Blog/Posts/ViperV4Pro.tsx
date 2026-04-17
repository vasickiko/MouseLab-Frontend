import heroImage from "../../../assets/posts/v4pro.webp"
import comparisonImage from "../../../assets/posts/vv4provv3pro.png"

const ViperV4Pro = () => {
  return (
    <div className="flex flex-col items-center text-white container mx-auto px-6 py-8">

      {/* HERO */}
      <div className="max-w-4xl flex flex-col items-center justify-center">
        <div className="w-full p-4 flex flex-col gap-4">
          <span className="text-sm text-white/60">Published April 17, 2026</span>
          <h1 className="sm:text-6xl text-3xl font-bold">
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
        <section className="flex flex-col gap-4 flex-wrap bg-white/10 border border-white/10 rounded-2xl p-5 ">
          <p className="text-white/80 leading-8 text-lg">
            After spending some time with the Viper V4 Pro, the first thing that stood out to me is how familiar it feels — and I mean that in the best way possible. Razer didn’t try to completely change the formula here. Instead, they focused on refining what already worked, and that approach honestly makes a lot of sense for this type of mouse.
          </p>

          <p className="text-white/80 leading-8 text-lg">
            It’s extremely lightweight at around 49g, but it doesn’t feel fragile or “too light” like some mice do. Everything feels intentional — the weight, the balance, the way it moves on the pad. It’s clearly built for people who value consistency and control over flashy features.
          </p>

          <p className="text-white/80 leading-8 text-lg">
            This is not one of those products that tries to impress you in the first 5 minutes. It’s more the kind of mouse that grows on you the more you use it.
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

            <p className="text-white/80 text-lg leading-8">
              If you’ve ever used a Viper before, you’ll immediately feel at home. The shape hasn’t changed in any dramatic way — it’s still that safe, low-profile symmetrical design that works for a wide range of grip styles. Some people might call it boring, but honestly, that’s part of why it works so well.
            </p>

            <p className="text-white/80 text-lg leading-8">
              What I did notice is that the balance feels more dialed in compared to older versions. The weight distribution feels centered, and that makes a big difference during fast movements and micro-adjustments. It doesn’t feel front-heavy or awkward at any point.
            </p>

            <p className="text-white/80 text-lg leading-8">
              The build quality is also solid. Even though it’s lightweight, there’s no flex or creaking when you grip it tighter. That’s something I always look for with lighter mice, and this one handles it really well.
            </p>

            <p className="text-white/80 text-lg leading-8">
              The coating is another highlight. It has that slightly grippy feel without being sticky, which makes it easier to control over longer sessions. It’s the kind of coating you don’t really notice at first, but after a while you realize your grip feels more consistent.
            </p>

            <blockquote className="border-l-2 border-white/20 pl-4 text-white/60 italic">
              “Razer’s coating is even grippier somehow… I can confidently hold it with 3 fingers.”
            </blockquote>
          </div>

          <img src={comparisonImage} alt="Viper V4 Pro vs Viper V3 Pro" className="w-3/4 sm:w-1/2" />
        </section>

        {/* DONGLE */}
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">The New Dooongle</h2>

        <p className="text-white/80 text-lg leading-8">
          I didn’t expect to care about a dongle… but here we are.
        </p>

        <p className="text-white/80 text-lg leading-8">
          Razer updated it this time, and it’s honestly one of those small things that ends up making the whole setup feel cleaner. It looks better on the desk, feels more premium, and doesn’t have that cheap “USB stick” vibe anymore.
        </p>

        <p className="text-white/80 text-lg leading-8">
          It’s not something you buy the mouse for, obviously, but it’s one of those details that makes the whole experience feel more polished.
        </p>
      </section>

        {/* PERFORMANCE */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Performance</h2>

          <p className="text-white/80 text-lg leading-8">
            Performance-wise, this is exactly what you’d expect from a top-tier mouse. The Focus Pro 50K sensor combined with 8000Hz polling just makes everything feel extremely responsive and stable.
          </p>

          <p className="text-white/80 text-lg leading-8">
            What stood out to me is not that it feels “faster,” but that it feels consistent no matter what. There’s no weird tracking behavior, no random inconsistencies — just predictable movement every time.
          </p>

          <p className="text-white/80 text-lg leading-8">
            I also didn’t notice any meaningful difference between wired and wireless use, which is exactly what you want from a high-end wireless mouse. It just feels reliable.
          </p>

          <p className="text-white/80 text-lg leading-8">
            This is the kind of performance that doesn’t distract you. You don’t think about the mouse — you just play.
          </p>
        </section>

        {/* BATTERY & SOFTWARE */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Battery & Software</h2>

          <p className="text-white/80 text-lg leading-8">
            Battery life is honestly impressive. Getting up to around 180 hours at 1000Hz means you can go a long time without even thinking about charging it. For a mouse in this weight range, that’s a big plus.
          </p>

          <p className="text-white/80 text-lg leading-8">
            The web-based software is also something I really liked. No downloads, no background processes — you just open it in your browser and adjust what you need.
          </p>

          <p className="text-white/80 text-lg leading-8">
            It’s one of those small quality-of-life things that makes the overall experience feel cleaner and less cluttered, especially if you’re someone who switches between systems.
          </p>
        </section>

        {/* CONS */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Things To Keep In Mind</h2>

          <ul className="text-white/80 text-lg leading-8 list-disc pl-5">
            <li>No Bluetooth — this is clearly focused on performance use only</li>
            <li>The scroll wheel is fine, but nothing standout</li>
            <li>Clicks can sound a bit loud depending on your preference</li>
            <li>The price is definitely on the premium side</li>
          </ul>
        </section>

        {/* VERDICT */}
        <section className="flex flex-col gap-4 flex-wrap bg-white/10 border border-white/10 rounded-2xl p-5">
          <h2 className="text-3xl font-semibold">Verdict</h2>

          <p className="text-white/80 leading-8 text-lg">
            The Viper V4 Pro doesn’t try to reinvent anything, and that’s exactly why it works. It focuses on getting the fundamentals right — shape, balance, and performance — and it does that extremely well.
          </p>

          <p className="text-white/80 leading-8">
            If the Viper shape already works for you, this feels like a natural upgrade. It’s not flashy, it’s not experimental — it’s just a very refined version of something that was already good.
          </p>

          <p className="text-white/80 leading-8">
            After using it for a while, it’s one of those mice you stop thinking about completely, and that’s probably the biggest compliment you can give it.
          </p>
        </section>

      </div>
    </div>
  )
}

export default ViperV4Pro
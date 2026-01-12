export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Base background */}
      <div className="absolute inset-0 -z-20 bg-[#0B1220]" />

      {/* Red ambient glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Three simple steps to save a life
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20 grid grid-cols-1 gap-16 md:grid-cols-3">

          {/* Shuttle line (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-14 hidden md:block">
            <div className="relative h-px bg-white/10">
              <div className="absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-shuttle" />
            </div>
          </div>

          <Step
            number="1"
            title="Sign Up"
            desc="Create your account and complete your profile with blood group and location"
          />

          <Step
            number="2"
            title="Get Matched"
            desc="Our system automatically finds donors or recipients within 10km"
          />

          <Step
            number="3"
            title="Connect & Save"
            desc="Contact matched users directly and coordinate the donation"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- STEP ---------------- */

function Step({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative text-center">

      {/* Number circle */}
      <div
        className="
          mx-auto
          flex h-16 w-16 items-center justify-center
          rounded-full
          bg-red-600
          text-2xl font-bold text-white
          shadow-lg
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        {number}
      </div>

      {/* Text */}
      <h3 className="mt-6 text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="mx-auto mt-3 max-w-xs leading-relaxed text-slate-400">
        {desc}
      </p>
    </div>
  );
}
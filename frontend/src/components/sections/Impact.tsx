export default function Impact() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[#0B1220]" />

      {/* Red glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[200px]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white">
            Our Impact
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Every donation creates a ripple of hope. Here’s why blood donation
            matters — and how LifeLink is making a difference across India.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-4">

          <Stat
            value="3"
            suffix="Lives"
            label="Saved by one blood donation"
          />

          <Stat
            value="12"
            suffix="Sec"
            label="Someone in India needs blood"
          />

          <Stat
            value="10K+"
            label="Active donors connected"
          />

          <Stat
            value="5K+"
            label="Lives already saved"
          />
        </div>

        {/* Message */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="text-lg leading-relaxed text-slate-300">
            Blood cannot be manufactured — it can only come from generous donors.
            LifeLink bridges the gap between urgency and availability by
            connecting real people in real time. Together, we are building a
            faster, safer, and more human blood donation network.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STAT CARD ---------------- */

function Stat({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-8
        text-center
        backdrop-blur
        transition-all duration-300
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]
      "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/0 to-red-600/10 opacity-0 transition group-hover:opacity-100" />

      {/* Number */}
      <div className="relative text-5xl font-extrabold text-red-500">
        {value}
        {suffix && <span className="ml-1 text-xl font-semibold">{suffix}</span>}
      </div>

      {/* Label */}
      <p className="relative mt-4 text-sm uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}
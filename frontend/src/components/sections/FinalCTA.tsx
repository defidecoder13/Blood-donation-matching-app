import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Gradient background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-red-600 via-rose-500 to-pink-600" />

      {/* Dark top separator (matches site) */}
      <div className="absolute top-0 left-0 h-6 w-full bg-[#0B1220]" />

      {/* Soft glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[180px]" />

      <div className="mx-auto max-w-4xl px-6 text-center">

        <h2 className="text-4xl font-bold text-white">
          Ready to Save Lives?
        </h2>

        <p className="mt-4 text-lg text-white/90">
          Join thousands of donors making a difference every day
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/signup"
            className="
              inline-flex items-center justify-center
              rounded-xl
              bg-[#2D3748]
              px-10 py-4
              text-lg font-semibold text-white
              transition-all duration-300
              hover:bg-[#1F2937]
              hover:scale-105
              hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            "
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
}
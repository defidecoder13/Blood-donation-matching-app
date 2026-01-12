import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      
      {/* Base background */}
      <div className="absolute inset-0 -z-20 bg-[#0B1220]" />

      {/* Red radial glow (KEY PART) */}
      <div className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-red-600/30 blur-[160px] -z-10" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        
        {/* LEFT */}
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1 text-sm text-red-400">
            🩸 Connecting Lives Across India
          </span>

          {/* Heading */}
          <h1 className="mt-8 text-[42px] font-extrabold leading-tight text-white md:text-5xl">
            Save Lives with <br />
            <span className="text-red-500">LifeLink</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base text-slate-300">
            India&apos;s premier blood donation matching platform. Connect with
            nearby donors instantly and help those in urgent need.
            <span className="mt-2 block font-medium text-white">
              Every drop counts.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <Link href="/signup">
              <Button className="h-12 bg-red-600 px-6 text-base text-white hover:bg-red-700">
                Become a Donor →
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                variant="outline"
                className="h-12 border-red-500 px-6 text-base text-red-400 hover:bg-red-600 hover:text-white"
              >
                📍 Find Donors
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 flex gap-14">
            <Stat value="10K+" label="Active Donors" />
            <Stat value="5K+" label="Lives Saved" />
            <Stat value="50+" label="Cities" />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src="/images/hero.jpg"   // MUST exist in public/images
              alt="Blood Donation"
              width={720}
              height={520}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-red-500">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
import {
  MapPin,
  Bell,
  ShieldCheck,
  Heart,
  Users,
  Droplet,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Location-Based Matching",
    desc: "Find donors within 10km radius instantly using advanced geolocation technology",
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    desc: "Get instant notifications when someone nearby needs your blood group",
  },
  {
    icon: ShieldCheck,
    title: "Verified Donors",
    desc: "All donors are verified with contact details for secure communication",
  },
  {
    icon: Heart,
    title: "Easy to Use",
    desc: "Simple interface to request blood or mark yourself as available donor",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Join thousands of donors making a difference across India",
  },
  {
    icon: Droplet,
    title: "All Blood Groups",
    desc: "Support for all blood groups including rare types",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-28">
      
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[#0B1220]" />

      {/* Subtle red shuttle glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[200px]" />

      <div className="mx-auto max-w-7xl px-6">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Why Choose LifeLink?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            The most efficient way to connect blood donors and recipients
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-red-500/30
        hover:bg-white/[0.05]
      "
    >
      {/* Hover red glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div
        className="
          flex h-12 w-12 items-center justify-center rounded-xl
          bg-red-500/10 text-red-400
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        <Icon size={22} />
      </div>

      {/* Text */}
      <h3 className="mt-6 text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {desc}
      </p>
    </div>
  );
}
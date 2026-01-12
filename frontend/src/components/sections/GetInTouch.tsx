import { Mail, Phone } from "lucide-react";

export default function GetInTouch() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[#0B1220]" />

      {/* Red glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Have questions? We’re here to help!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Email */}
          <ContactCard
            icon={<Mail className="h-7 w-7 text-red-400" />}
            title="Email Us"
            value="support@lifelink.in"
          />

          {/* Call */}
          <ContactCard
            icon={<Phone className="h-7 w-7 text-red-400" />}
            title="Call Us"
            value="+91 1800-123-4567"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-10
        text-center
        backdrop-blur
        transition-all duration-300
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]
      "
    >
      {/* Icon box */}
      <div
        className="
          mx-auto
          flex h-14 w-14 items-center justify-center
          rounded-xl
          bg-red-500/10
          transition
          group-hover:scale-110
        "
      >
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-base text-slate-300">
        {value}
      </p>
    </div>
  );
}
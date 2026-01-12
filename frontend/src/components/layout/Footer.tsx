import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1220]">

      {/* Top border glow */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold text-white">
              <span className="text-red-500">🩸</span>
              LifeLink
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Connecting blood donors and recipients across India.
              Every drop counts. Every life matters.
            </p>
          </div>

          {/* Product */}
          <FooterColumn title="Product">
            <FooterLink href="/find-donors">Find Donors</FooterLink>
            <FooterLink href="/signup">Become a Donor</FooterLink>
            <FooterLink href="/how-it-works">How It Works</FooterLink>
            <FooterLink href="/impact">Our Impact</FooterLink>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
            <FooterLink href="/disclaimer">Disclaimer</FooterLink>
          </FooterColumn>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} LifeLink. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Facebook />} />
            <SocialIcon icon={<Twitter />} />
            <SocialIcon icon={<Instagram />} />
            <SocialIcon icon={<Linkedin />} />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- HELPERS ---------------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-400 transition hover:text-red-400"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      className="
        flex h-9 w-9 items-center justify-center
        rounded-full
        border border-white/10
        text-slate-400
        transition
        hover:border-red-500/50
        hover:text-red-400
        hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
      "
      aria-label="social"
    >
      {icon}
    </button>
  );
}
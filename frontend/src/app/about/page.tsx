import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About LifeLink</h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Connecting blood donors and recipients efficiently during emergencies using location, availability, and intelligent matching
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-300 mb-6">
              LifeLink is a real-time, intelligent blood donation matching system designed to connect patients 
              and donors efficiently during emergencies using location, availability, trust scoring, and AI-based prioritization.
            </p>
            <p className="text-slate-300 mb-6">
              Traditional blood donation apps rely on manual searching and static donor lists. LifeLink 
              automates donor matching based on urgency and proximity, ensuring faster response times.
            </p>
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Core Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-slate-300">Urgency - Fast response in critical situations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-slate-300">Proximity - Local matching for convenience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-slate-300">Trust - Verified donor profiles for safety</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-slate-300">Intelligence - AI-driven matching algorithm</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">How We Make a Difference</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 font-bold mr-4">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Real-time Matching</h3>
                    <p className="text-slate-400 mt-2">
                      Our intelligent system matches donors and recipients based on blood compatibility, 
                      proximity, availability, and response history.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 font-bold mr-4">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Emergency Prioritization</h3>
                    <p className="text-slate-400 mt-2">
                      Critical requests are prioritized using AI to ensure urgent cases get immediate attention.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 font-bold mr-4">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Trust & Verification</h3>
                    <p className="text-slate-400 mt-2">
                      All donors are verified with contact details and trust scores to ensure safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">The LifeLink Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <div className="text-red-500 text-3xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-white mb-3">Location-Based Matching</h3>
              <p className="text-slate-400">
                Find donors within 10km radius using advanced geolocation technology
              </p>
            </div>
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <div className="text-red-500 text-3xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Alerts</h3>
              <p className="text-slate-400">
                Get instant notifications when someone nearby needs your blood group
              </p>
            </div>
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <div className="text-red-500 text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-3">Verified Donors</h3>
              <p className="text-slate-400">
                All donors are verified with contact details for secure communication
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Join thousands of donors making a difference every day. Every drop counts. Every life matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 transition-colors">
                Become a Donor
              </Button>
            </Link>
            <Link href="/find-donors">
              <Button variant="outline" className="h-12 border-red-500 text-red-400 hover:bg-red-600 hover:text-white font-semibold rounded-lg px-8 transition-colors">
                Need Blood?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
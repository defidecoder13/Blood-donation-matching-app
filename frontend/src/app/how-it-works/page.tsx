import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">How LifeLink Works</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connecting blood donors and recipients in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">For Donors</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Sign Up & Verify</h3>
                  <p className="text-slate-400 mt-2">Create your profile with blood type, location, and verification details</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Get Notified</h3>
                  <p className="text-slate-400 mt-2">Receive alerts when someone in your area needs your blood type</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Connect & Donate</h3>
                  <p className="text-slate-400 mt-2">Contact recipients directly and coordinate safe donation arrangements</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-6">
              <span className="text-red-500 text-4xl">🩸</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Ready to Save Lives?</h3>
            <p className="text-slate-400 mb-6">
              Join thousands of donors making a difference every day
            </p>
            <Link href="/signup">
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 order-2 lg:order-1">
            <div className="text-center mb-6">
              <span className="text-red-500 text-4xl">🩸</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Need Blood?</h3>
            <p className="text-slate-400 mb-6">
              Register as a recipient and we'll connect you with compatible donors
            </p>
            <Link href="/signup">
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                Find Donors
              </Button>
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-white mb-6">For Recipients</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Register Request</h3>
                  <p className="text-slate-400 mt-2">Provide blood type needed and location details</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Find Matches</h3>
                  <p className="text-slate-400 mt-2">Our system locates nearby compatible donors</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Connect & Receive</h3>
                  <p className="text-slate-400 mt-2">Contact donors directly and coordinate safe donation arrangements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Safety First</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <div className="text-red-500 text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Verified Donors</h3>
              <p className="text-slate-400 text-sm">All donors are verified with contact details</p>
            </div>
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <div className="text-red-500 text-3xl mb-4">📍</div>
              <h3 className="text-lg font-semibold text-white mb-2">Location Based</h3>
              <p className="text-slate-400 text-sm">Find donors within 10km radius</p>
            </div>
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <div className="text-red-500 text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Communication</h3>
              <p className="text-slate-400 text-sm">Direct contact between donors and recipients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
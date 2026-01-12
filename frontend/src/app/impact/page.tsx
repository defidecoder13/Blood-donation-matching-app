import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Our Impact</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every donation creates a ripple of hope. Here's how LifeLink is making a difference across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">10K+</div>
            <div className="text-slate-400">Active Donors</div>
          </div>
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">5K+</div>
            <div className="text-slate-400">Lives Saved</div>
          </div>
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
            <div className="text-slate-400">Cities</div>
          </div>
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
            <div className="text-slate-400">Support</div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Blood Donation Matters</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">The Critical Need</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span className="text-slate-300">Someone in India needs blood every 12 seconds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span className="text-slate-300">A single blood donation can save up to 3 lives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span className="text-slate-300">Blood cannot be manufactured - it can only come from generous donors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span className="text-slate-300">Many patients face life-threatening situations due to blood shortages</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-bold text-white mb-4">The LifeLink Difference</h3>
              <p className="text-slate-300 mb-6">
                LifeLink bridges the gap between urgency and availability by connecting real people in real time. 
                Together, we are building a faster, safer, and more human blood donation network.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="text-red-500 mr-3">✓</div>
                  <span className="text-slate-300">Quick matching with compatible donors</span>
                </div>
                <div className="flex items-center">
                  <div className="text-red-500 mr-3">✓</div>
                  <span className="text-slate-300">Verified donor profiles for safety</span>
                </div>
                <div className="flex items-center">
                  <div className="text-red-500 mr-3">✓</div>
                  <span className="text-slate-300">Location-based search for convenience</span>
                </div>
                <div className="flex items-center">
                  <div className="text-red-500 mr-3">✓</div>
                  <span className="text-slate-300">Real-time notifications for urgent cases</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <div className="text-red-500 text-3xl mb-4">😊</div>
              <h3 className="text-lg font-bold text-white mb-3">Rahul's Story</h3>
              <p className="text-slate-300 text-sm mb-4">
                "I needed O- blood for my father's emergency surgery. LifeLink connected me with a donor within 2 hours. 
                My father is alive today because of the generosity of a stranger."
              </p>
              <div className="text-slate-500 text-xs">- Mumbai, Maharashtra</div>
            </div>
            
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <div className="text-red-500 text-3xl mb-4">😊</div>
              <h3 className="text-lg font-bold text-white mb-3">Priya's Story</h3>
              <p className="text-slate-300 text-sm mb-4">
                "As a regular donor, I love receiving notifications when someone needs my A+ blood. 
                It feels great to know that my donation makes a real difference."
              </p>
              <div className="text-slate-500 text-xs">- Bangalore, Karnataka</div>
            </div>
            
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
              <div className="text-red-500 text-3xl mb-4">😊</div>
              <h3 className="text-lg font-bold text-white mb-3">Amit's Story</h3>
              <p className="text-slate-300 text-sm mb-4">
                "During the pandemic, blood banks were running low. LifeLink helped me find donors 
                for my friend who needed platelets. This platform is a true lifesaver."
              </p>
              <div className="text-slate-500 text-xs">- Delhi, NCR</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Every drop counts. Every life matters. Join thousands of donors making a difference every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 transition-colors">
                Become a Donor
              </Button>
            </Link>
            <Link href="/find-donors">
              <Button variant="outline" className="h-12 border-red-500 text-red-400 hover:bg-red-600 hover:text-white font-semibold rounded-lg px-8 transition-colors">
                Find Donors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
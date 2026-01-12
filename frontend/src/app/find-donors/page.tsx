import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FindDonorsPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Find Blood Donors</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Locate compatible blood donors near you quickly and efficiently
          </p>
        </div>

        <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-slate-300 mb-2">
                Blood Type
              </label>
              <select
                id="bloodType"
                className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter city or pin code"
                className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
              Search Donors
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <div className="text-red-500 text-3xl mb-4">1</div>
              <h3 className="text-lg font-semibold text-white mb-2">Enter Details</h3>
              <p className="text-slate-400">Provide blood type and location details</p>
            </div>
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <div className="text-red-500 text-3xl mb-4">2</div>
              <h3 className="text-lg font-semibold text-white mb-2">Find Matches</h3>
              <p className="text-slate-400">Our system locates nearby compatible donors</p>
            </div>
            <div className="bg-[#1A1F2D] rounded-xl p-6 border border-white/10">
              <div className="text-red-500 text-3xl mb-4">3</div>
              <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
              <p className="text-slate-400">Contact donors directly for arrangements</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">
            Need blood urgently? Register as a recipient and we'll notify nearby donors
          </p>
          <Link href="/signup">
            <Button className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 transition-colors">
              Register as Recipient
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
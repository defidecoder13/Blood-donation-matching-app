import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-slate-400">Manage your donations, requests, and notifications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Your Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Donations</span>
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Requests Helped</span>
                  <span className="text-white font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Trust Score</span>
                  <span className="text-green-500 font-bold">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-green-500 font-bold">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <Link href="/profile">
                  <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 justify-start">
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/find-donors">
                  <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 justify-start">
                    Find Donors
                  </Button>
                </Link>
                <Link href="/emergency">
                  <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold">
                    Emergency Request
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <button className="text-red-400 hover:text-red-300 text-sm">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0B1220] rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Donation Request Accepted</h3>
                    <span className="text-slate-400 text-sm">2 hours ago</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Successfully donated A+ blood to Priya S. in Mumbai</p>
                </div>
                
                <div className="p-4 bg-[#0B1220] rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">New Match Found</h3>
                    <span className="text-slate-400 text-sm">1 day ago</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Found compatible recipient for your O+ blood donation</p>
                </div>
                
                <div className="p-4 bg-[#0B1220] rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Profile Updated</h3>
                    <span className="text-slate-400 text-sm">3 days ago</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Updated availability status to available</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Requests</h2>
                <button className="text-red-400 hover:text-red-300 text-sm">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0B1220] rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Blood Request</h3>
                    <span className="text-yellow-500 text-sm font-medium">PENDING</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">A+ blood needed in Mumbai for surgery</p>
                  <div className="flex justify-between mt-3">
                    <span className="text-slate-400 text-sm">Posted 4 hours ago</span>
                    <button className="text-red-400 hover:text-red-300 text-sm">Cancel</button>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0B1220] rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Donation Confirmation</h3>
                    <span className="text-green-500 text-sm font-medium">COMPLETED</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Donated O+ blood to emergency case</p>
                  <div className="flex justify-between mt-3">
                    <span className="text-slate-400 text-sm">Completed 2 days ago</span>
                    <button className="text-red-400 hover:text-red-300 text-sm">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">User Profile</h1>
          <p className="text-slate-400">Manage your account details and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-red-500">👤</span>
                </div>
                <h2 className="text-xl font-bold text-white">John Doe</h2>
                <p className="text-slate-400">john.doe@example.com</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="text-white font-medium">A+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white font-medium">Mumbai</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Role:</span>
                  <span className="text-white font-medium">Donor</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trust Score:</span>
                  <span className="text-white font-medium">95%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Blood Group
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue="Mumbai"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Availability Status
                </label>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 px-4 rounded-lg border border-green-500 bg-green-500/20 text-white">
                    Available to Donate
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-lg border border-white/20 text-white bg-[#0B1220]">
                    Not Available
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 transition-colors">
                  Save Changes
                </Button>
              </div>
            </div>
            
            <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Account Security</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-white">Change Password</h3>
                    <p className="text-sm text-slate-400">Update your account password</p>
                  </div>
                  <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white">
                    Change
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-400">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Setup
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-white">Notification Preferences</h3>
                    <p className="text-sm text-slate-400">Manage your notification settings</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Emergency Blood Request</h1>
          <p className="text-slate-400">Quickly create an urgent blood request for immediate attention</p>
        </div>

        <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Request Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter patient's name"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Blood Group Required
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="">Select Blood Group</option>
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
                    Urgency Level
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="critical"
                        name="urgency"
                        className="h-4 w-4 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="critical" className="ml-3 block text-sm text-slate-300">
                        <span className="text-red-500 font-medium">Critical</span> - Immediate surgery needed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="medium"
                        name="urgency"
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                      />
                      <label htmlFor="medium" className="ml-3 block text-sm text-slate-300">
                        <span className="text-yellow-500 font-medium">Medium</span> - Surgery in next 24 hours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="normal"
                        name="urgency"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="normal" className="ml-3 block text-sm text-slate-300">
                        <span className="text-green-500 font-medium">Normal</span> - Routine transfusion
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Hospital/Clinic Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter hospital name"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city or area"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Required Units
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="1">1 Unit</option>
                    <option value="2">2 Units</option>
                    <option value="3">3 Units</option>
                    <option value="4">4 Units</option>
                    <option value="5">5+ Units</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Any special requirements or medical notes"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                    Submit Emergency Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">How Emergency Requests Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-red-500 text-2xl mb-3">1</div>
                <h4 className="font-semibold text-white mb-2">Submit Request</h4>
                <p className="text-slate-400 text-sm">Provide all necessary details about the patient and blood requirement</p>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-2xl mb-3">2</div>
                <h4 className="font-semibold text-white mb-2">AI Prioritization</h4>
                <p className="text-slate-400 text-sm">Our system analyzes urgency and prioritizes critical cases</p>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-2xl mb-3">3</div>
                <h4 className="font-semibold text-white mb-2">Match Donors</h4>
                <p className="text-slate-400 text-sm">Compatible donors in your area receive immediate notifications</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            All emergency requests are verified by our admin team to ensure authenticity
          </p>
        </div>
      </div>
    </div>
  );
}
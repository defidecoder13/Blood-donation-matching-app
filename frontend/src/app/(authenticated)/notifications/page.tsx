import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";

interface Notification {
  id: string;
  type: 'emergency' | 'match' | 'profile' | 'availability' | 'verification';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actions?: {
    primary?: { label: string; action: () => void };
    secondary?: { label: string; action: () => void };
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { on, isConnected } = useSocket();

  // Mock notifications for now
  useEffect(() => {
    setNotifications([
      {
        id: '1',
        type: 'emergency',
        title: 'Emergency Request',
        message: 'A+ blood needed in Mumbai for emergency surgery. You\'re a match!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        actions: {
          primary: { label: 'Respond', action: () => console.log('Respond to emergency') },
          secondary: { label: 'Ignore', action: () => console.log('Ignore emergency') }
        }
      },
      {
        id: '2',
        type: 'match',
        title: 'Donation Match',
        message: 'Your donation request has been accepted by donor Priya S. Contact information provided.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        actions: {
          primary: { label: 'View Details', action: () => console.log('View details') },
          secondary: { label: 'Close', action: () => console.log('Close notification') }
        }
      },
      {
        id: '3',
        type: 'profile',
        title: 'Profile Update',
        message: 'Your trust score has increased to 95% based on your donation history.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true
      },
      {
        id: '4',
        type: 'availability',
        title: 'Availability Status',
        message: 'You have been marked as unavailable for the next 2 weeks. Update your status when available.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true,
        actions: {
          primary: { label: 'Update Status', action: () => console.log('Update status') }
        }
      },
      {
        id: '5',
        type: 'verification',
        title: 'Verification Status',
        message: 'Your profile has been verified. You now have access to all platform features.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        read: true
      }
    ]);
  }, []);

  // Listen for real-time notifications
  useEffect(() => {
    const handleNewNotification = (data: any) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: data.type || 'match',
        title: data.title || 'New Notification',
        message: data.message || '',
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    };

    on('new-match', handleNewNotification);
    on('emergency-request', handleNewNotification);
    on('profile-update', handleNewNotification);

    return () => {
      // Cleanup listeners if needed
    };
  }, [on]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-500';
      case 'match': return 'bg-green-500';
      case 'profile': return 'bg-blue-500';
      case 'availability': return 'bg-yellow-500';
      case 'verification': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Notifications</h1>
            <p className="text-slate-400">Manage your alerts and updates</p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-slate-400">
                {isConnected ? 'Real-time connected' : 'Real-time disconnected'}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Button>
        </div>

        <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 bg-[#0B1220] rounded-lg border border-white/10 flex items-start ${
                  !notification.read ? 'border-l-4 border-l-red-500' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="mr-4 mt-1">
                  <div className={`w-3 h-3 rounded-full ${getTypeColor(notification.type)}`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">{notification.title}</h3>
                    <span className="text-slate-400 text-sm">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1" dangerouslySetInnerHTML={{ __html: notification.message }} />
                  {notification.actions && (
                    <div className="flex mt-3 space-x-3">
                      {notification.actions.primary && (
                        <Button
                          className="h-9 bg-red-600 hover:bg-red-700 text-white text-sm px-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.actions!.primary!.action();
                          }}
                        >
                          {notification.actions.primary.label}
                        </Button>
                      )}
                      {notification.actions.secondary && (
                        <Button
                          variant="outline"
                          className="h-9 border-white/20 text-white hover:bg-white/10 text-sm px-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.actions!.secondary!.action();
                          }}
                        >
                          {notification.actions.secondary.label}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
          <div className="bg-[#1A1F2D] rounded-2xl border border-white/10 p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">Emergency Alerts</h3>
                  <p className="text-slate-400 text-sm">Receive notifications for urgent blood requests</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only" id="emergency" defaultChecked />
                  <label 
                    htmlFor="emergency" 
                    className="block w-12 h-6 rounded-full bg-red-600 cursor-pointer transition-colors"
                  ></label>
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">Match Notifications</h3>
                  <p className="text-slate-400 text-sm">Get alerts when you're matched with a recipient</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only" id="match" defaultChecked />
                  <label 
                    htmlFor="match" 
                    className="block w-12 h-6 rounded-full bg-red-600 cursor-pointer transition-colors"
                  ></label>
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">Promotional Updates</h3>
                  <p className="text-slate-400 text-sm">Receive updates about platform features</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only" id="promo" />
                  <label 
                    htmlFor="promo" 
                    className="block w-12 h-6 rounded-full bg-gray-600 cursor-pointer transition-colors"
                  ></label>
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 transition-colors">
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
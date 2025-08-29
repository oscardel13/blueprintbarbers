import { useState } from "react";
import PageHeader from "../components/page-header/page-header.component";

const tabs = [
  { id: "account", label: "Account" },
  { id: "availability", label: "Booking & Availability" },
  { id: "notifications", label: "Notifications" },
  { id: "rules", label: "Rules & Policies" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="container">
    <PageHeader title="Settings" />
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-50">
          <nav className="flex flex-col p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Account */}
          {activeTab === "account" && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="you@example.com"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
              </div>
            </div>
          )}

          {/* Availability */}
          {activeTab === "availability" && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Booking & Availability</h2>
              <div>
                <label className="block text-sm font-medium">Default Working Hours</label>
                <input type="text" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Mon–Fri 9am–6pm"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Vacation Days</label>
                <input type="date" className="mt-1 block rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Notifications</h2>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Email alerts for new bookings</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>SMS reminders to clients</span>
              </label>
            </div>
          )}

          {/* Rules */}
          {activeTab === "rules" && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Rules & Policies</h2>
              <div>
                <label className="block text-sm font-medium">Cancellation Window (hours)</label>
                <input type="number" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="24"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Late Policy</label>
                <textarea className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows={3} placeholder="Describe your policy"/>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Integrations</h2>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700">Connect Google Calendar</button>
              <button className="px-4 py-2 rounded-lg bg-gray-800 text-white shadow hover:bg-gray-900">Connect Instagram</button>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Security</h2>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Enable Two-Factor Authentication (2FA)</span>
              </label>
              <div>
                <label className="block text-sm font-medium">Change Password</label>
                <input type="password" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;

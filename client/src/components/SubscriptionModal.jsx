import React, { useState, useEffect } from "react";
import { serviceIcons } from "./ServiceIcons";
import calender_logo from "../assets/calender_icon.png";
import { gapi } from "gapi-script";

const SubscriptionModal = ({ isOpen, onClose, onSave, subToEdit }) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    monthlyCost: "",
    nextBillDate: "",
    iconId: "default",
    calendarEventId: null, // ✅ store Google event ID
  });
  const [calendarReminderSet, setCalendarReminderSet] = useState(false);
  const [isOtherService, setIsOtherService] = useState(false);

  const isEditMode = Boolean(subToEdit);

  useEffect(() => {
    if (isEditMode && subToEdit) {
      setFormData({
        serviceName: subToEdit.serviceName,
        monthlyCost: subToEdit.monthlyCost,
        nextBillDate: new Date(subToEdit.nextBillDate)
          .toISOString()
          .split("T")[0],
        iconId: subToEdit.iconId || "default",
      });
      setCalendarReminderSet(subToEdit.calendarReminderSet);
      setIsOtherService(
        !Object.values(serviceIcons).some(
          (s) => s.name === subToEdit.serviceName
        )
      );
    } else {
      setFormData({
        serviceName: "",
        monthlyCost: "",
        nextBillDate: "",
        iconId: "default",
      });
      setCalendarReminderSet(false);
      setIsOtherService(false);
    }
  }, [isOpen, subToEdit, isEditMode]);

  // Handle service name change
  const handleServiceChange = (e) => {
    const selectedService = e.target.value;

    if (selectedService === "Other") {
      setIsOtherService(true);
      setFormData({
        ...formData,
        serviceName: "",
        iconId: "default",
      });
    } else {
      setIsOtherService(false);

      const matchedEntry = Object.entries(serviceIcons).find(
        ([, { name }]) =>
          name.trim().toLowerCase() === selectedService.trim().toLowerCase()
      );

      setFormData({
        ...formData,
        serviceName: selectedService,
        iconId: matchedEntry ? matchedEntry[0] : "default",
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Create or Update Google Calendar event
  const handleAddToCalendar = () => {
    if (!formData.serviceName || !formData.nextBillDate) {
      alert("Please enter a service name and next bill date first.");
      return;
    }
    const title = encodeURIComponent(`${formData.serviceName} Bill Due`);
    const date = new Date(formData.nextBillDate)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}`;
    window.open(url, "_blank");
    setCalendarReminderSet(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      monthlyCost: parseFloat(formData.monthlyCost),
      calendarReminderSet,
    };
    onSave(dataToSave, subToEdit?._id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50 ">
      <div className="bg-[#1e2025] p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">
          {isEditMode ? "Edit" : "Add"} Subscription
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Service name dropdown */}
          <div className="mb-4">
            <label
              className="block text-slate-300 text-sm font-bold mb-2"
              htmlFor="serviceName"
            >
              Service
            </label>
            <select
              value={
                isOtherService ? "Other" : formData.serviceName || "" // Blank on add
              }
              onChange={handleServiceChange}
              required
              className="bg-slate-700 border border-slate-600 rounded-full w-full py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Select a Service --
              </option>

              {Object.values(serviceIcons)
                .filter(({ name }) => name.toLowerCase() !== "default")
                .map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Show text input if Other is selected */}
          {isOtherService && (
            <div className="mb-4">
              <label
                className="block text-slate-300 text-sm font-bold mb-2"
                htmlFor="customServiceName"
              >
                Enter Service Name
              </label>
              <input
                name="serviceName"
                type="text"
                value={formData.serviceName}
                onChange={handleInputChange}
                required
                className="bg-slate-700 border border-slate-600 rounded-full w-full py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-slate-300 text-sm font-bold mb-2"
              htmlFor="monthlyCost"
            >
              Monthly Cost (₹)
            </label>
            <input
              name="monthlyCost"
              type="number"
              value={formData.monthlyCost}
              onChange={handleInputChange}
              required
              className="bg-slate-700 border border-slate-600 rounded-full w-full py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-300 text-sm font-bold mb-2"
              htmlFor="nextBillDate"
            >
              Bill Date
            </label>
            <input
              name="nextBillDate"
              type="date"
              value={formData.nextBillDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleInputChange}
              required
              className="bg-slate-700 border border-slate-600 rounded-full w-full py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Google Calendar */}
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-bold mb-2">
              Create a Reminder
            </label>
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="w-full flex justify-center items-center space-x-2 bg-slate-700 text-white font-semibold py-3 px-4 rounded-full hover:bg-slate-600 transition-colors"
            >
              <img
                src={calender_logo}
                alt="Logo Illustration"
                className="w-10 h-10 rounded-lg"
              />
              <span>Add to Google Calendar</span>
              {calendarReminderSet && (
                <span className="text-green-400">✅</span>
              )}
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubscriptionModal from "../components/SubscriptionModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { getIconComponent } from "../components/ServiceIcons";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400 hover:text-blue-400 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400 hover:text-red-500 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const DashboardPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subToEdit, setSubToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subToDelete, setSubToDelete] = useState(null);

  const navigate = useNavigate();

  const createApiConfig = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  const processAndSetSubscriptions = async (subs, token) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let needsUpdate = false;
    const processedSubs = [...subs];

    for (let i = 0; i < processedSubs.length; i++) {
      let sub = processedSubs[i];
      let billDate = new Date(sub.nextBillDate);
      billDate.setUTCHours(0, 0, 0, 0);

      if (billDate < today) {
        needsUpdate = true;
        // Roll date to the next month
        const newDate = new Date(billDate.setMonth(billDate.getMonth() + 1));
        sub.nextBillDate = newDate.toISOString();

        // Update this single subscription on the backend
        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/subscriptions/${sub._id}`,
            { nextBillDate: sub.nextBillDate },
            createApiConfig(token)
          );
        } catch (err) {
          console.error(
            `Failed to update subscription date for ${sub.serviceName}`
          );
        }
      }
    }

    // Sort subscriptions by the nearest upcoming date
    processedSubs.sort(
      (a, b) => new Date(a.nextBillDate) - new Date(b.nextBillDate)
    );

    setSubscriptions(processedSubs);
  };

  const fetchSubscriptions = async (token) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/subscriptions`,
        createApiConfig(token)
      );
      // Process dates and sort before setting state
      await processAndSetSubscriptions(data, token);
    } catch (err) {
      setError("Failed to fetch subscriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
      fetchSubscriptions(storedUserInfo.token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSaveSubscription = async (subData, subId) => {
    const config = createApiConfig(userInfo.token);
    try {
      let response;
      if (subId) {
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/subscriptions/${subId}`,
          subData,
          config
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/subscriptions`,
          subData,
          config
        );
      }
      // Process and sort the updated list
      await processAndSetSubscriptions(response.data, userInfo.token);
    } catch (err) {
      setError(`Failed to save subscription.`);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const config = createApiConfig(userInfo.token);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/subscriptions/${subToDelete._id}`,
        config
      );
      // Process and sort the updated list
      await processAndSetSubscriptions(data.subscriptions, userInfo.token);
      setIsDeleteModalOpen(false);
      setSubToDelete(null);
    } catch (err) {
      setError("Failed to delete subscription.");
    }
  };

  const openEditModal = (sub) => {
    setSubToEdit(sub);
    setIsModalOpen(true);
  };
  const openAddModal = () => {
    setSubToEdit(null);
    setIsModalOpen(true);
  };
  const openDeleteConfirm = (sub) => {
    setSubToDelete(sub);
    setIsDeleteModalOpen(true);
  };

  const calculateCurrentMonthCost = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return subscriptions
      .filter((sub) => {
        const billDate = new Date(sub.nextBillDate);
        return (
          billDate.getMonth() === currentMonth &&
          billDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, sub) => acc + (sub.monthlyCost || 0), 0);
  };

  const calculateUpcomingBills = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    today.setHours(0, 0, 0, 0);

    return subscriptions.filter((sub) => {
      const billDate = new Date(sub.nextBillDate);
      billDate.setUTCHours(0, 0, 0, 0);
      return billDate >= today && billDate <= endOfMonth;
    }).length;
  };

  const totalMonthlyCost = calculateCurrentMonthCost();
  const upcomingBillsCount = calculateUpcomingBills();

  if (loading)
    return (
      <div className="text-center text-white py-10">Loading Dashboard...</div>
    );
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSubscription}
        subToEdit={subToEdit}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        subscriptionName={subToDelete?.serviceName}
      />

      <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-neutral-950/80 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] backdrop-blur-md rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">
          Welcome, {userInfo?.name}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1e2025] p-6 rounded-lg shadow-lg border border-blue-500">
            <h2 className="text-slate-400 text-lg mb-2">Monthly Expense</h2>
            <p className="text-4xl font-bold text-white">₹{totalMonthlyCost}</p>
          </div>
          <div className="bg-[#1e2025] p-6 rounded-lg shadow-lg border border-blue-500">
            <h2 className="text-slate-400 text-lg mb-2">
              Upcoming Bills (This Month)
            </h2>
            <p className="text-4xl font-bold text-white">
              {upcomingBillsCount}
            </p>
          </div>
        </div>
        <div className="bg-[#1e2025] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-4 text-slate-400">SERVICE</th>
                  <th className="p-4 text-slate-400">MONTHLY</th>
                  <th className="p-4 text-slate-400">NEXT BILLING DATE</th>
                  <th className="p-4 text-slate-400 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub._id} className="border-b border-slate-800">
                    <td className="p-4 text-white font-semibold">
                      <div className="flex items-center space-x-4">
                        {getIconComponent(sub.iconId)}
                        <span>{sub.serviceName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white">₹{sub.monthlyCost || 0}</td>
                    <td className="p-4 text-white">
                      {new Date(sub.nextBillDate).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-4">
                        <button onClick={() => openEditModal(sub)}>
                          <EditIcon />
                        </button>
                        <button onClick={() => openDeleteConfirm(sub)}>
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subscriptions.length === 0 && (
              <p className="text-center text-slate-400 py-8">
                You haven't added any subscriptions yet.
              </p>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusIcon />
              <span>Add Subscription</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

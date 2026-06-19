import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/dashboard"
      );

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Products</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.products}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">
            {currency}
            {stats.revenue}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Users</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.users}
          </h2>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
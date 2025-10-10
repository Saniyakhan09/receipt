


import React, { useEffect, useState } from "react";
import "./Totalexpense.css";
import { useNavigate } from "react-router-dom";

const Totalexpense = () => {
  const [paid, setPaid] = useState(0);
  const [unpaid, setUnpaid] = useState(0);
  const [pending, setPending] = useState(0);
  const [activeButton, setActiveButton] = useState("paid");

  const navigate = useNavigate();

  const fetchData = async (type) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    try {
      const res = await fetch(`https://receipt-6.onrender.com/receipt/${type}/${userId}`, {
        credentials: "include", 
      });

      const data = await res.json();

      // ✅ Handle each type properly
      if (type === "paid") setPaid(data.totalPaid || 0);
      if (type === "unpaid") setUnpaid(data.totalPaid || 0);
      if (type === "pending") setPending(data.totalPaid || 0);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // ✅ Fetch all totals when component loads
  useEffect(() => {
    fetchData("paid");
    fetchData("unpaid");
    fetchData("pending");
  }, []);

  return (
    <div className="all-receipts-container">
      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          className="tab"
          onClick={() => navigate("/AllReceipt")}
        >
          All Receipts
        </button>

        <button className="tab active">Total Expense</button>
      </div>

      {/* Expense Section */}
      <div className="expense">
        <h3 className="section-title">Expense Overview</h3>

        {/* Filter Buttons */}
        <div className="expense-buttons">
          <button
            className={activeButton === "paid" ? "active" : ""}
            onClick={() => setActiveButton("paid")}
          >
            Paid
          </button>
          <button
            className={activeButton === "unpaid" ? "active" : ""}
            onClick={() => setActiveButton("unpaid")}
          >
            Unpaid
          </button>
          <button
            className={activeButton === "pending" ? "active" : ""}
            onClick={() => setActiveButton("pending")}
          >
            Pending
          </button>
        </div>

        {/* Summary Display */}
        <div className="expense-summary">
          {activeButton === "paid" && (
            <div className="summary-card">
              <p>Total Paid Expense</p>
              <h2>₹{paid}</h2>
            </div>
          )}
          {activeButton === "unpaid" && (
            <div className="summary-card">
              <p>Total Unpaid Expense</p>
              <h2>₹{unpaid}</h2>
            </div>
          )}
          {activeButton === "pending" && (
            <div className="summary-card">
              <p>Total Pending Expense</p>
              <h2>₹{pending}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Totalexpense;

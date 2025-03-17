import React, { useState, useEffect } from "react";
import axios from "axios";
import { Order } from "../types";
import styles from "./Orders.module.scss";
import { jsPDF } from "jspdf";
// Import icons
import { FaFilter, FaDownload, FaTrash, FaClipboardList, FaCheckCircle, FaHourglassHalf, FaAngleDown } from "react-icons/fa";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://dakestel-sales-management-application.onrender.com/api/orders");
        // Sort orders by latest first
        const sortedOrders = response.data.sort(
          (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Apply filter when filterStatus changes
  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === filterStatus));
    }
  }, [filterStatus, orders]);

  // Handle status update
  const handleStatusUpdate = async (orderId: string, newStatus: "pending" | "completed") => {
    try {
      await axios.put(`https://dakestel-sales-management-application.onrender.com/api/orders/${orderId}`, { status: newStatus });

      alert("Order status updated successfully!");

      // Update the local state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          String(order._id) === String(orderId) ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status. Please try again.");
    }
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`https://dakestel-sales-management-application.onrender.com/api/orders/${orderId}`);

      alert("Order deleted successfully!");
      // Remove the order from local state
      setOrders((prevOrders) => prevOrders.filter((order) => String(order._id) !== String(orderId)));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order. Please try again.");
    }
  };

  // Generate PDF for an order
  const generatePDF = (order: Order) => {
    const doc = new jsPDF();
    doc.setFont("Courier");
    doc.setFontSize(14);
    doc.text("Order Receipt", 10, 10);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 10, 20);
    doc.text(`Customer: ${order.customerName}`, 10, 30);
    doc.text(`Email: ${order.customerEmail}`, 10, 40);
    doc.text(`Phone: ${order.customerPhone}`, 10, 50);
    doc.text(`Total Amount: ₦${Number(order.totalAmount).toFixed(2)}`, 10, 60);
    doc.text(`Status: ${order.status}`, 10, 70);
    doc.text("Products:", 10, 80);

    let y = 90;
    order.products.forEach((item, index) => {
      const product = typeof item.product === "string" ? { name: "Unknown Product", _id: item.product } : item.product;
      doc.text(`${index + 1}. ${product.name} - ${item.quantity}`, 10, y);
      y += 10;
    });

    doc.text("Thank you for your purchase!", 10, y + 10);
    doc.save(`Order_${order._id}.pdf`);
  };

  // Toggle filter dropdown
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle filter selection
  const handleFilterSelect = (status: "all" | "pending" | "completed") => {
    setFilterStatus(status);
    setIsFilterOpen(false);
  };

  return (
    <div className={styles.ordersContainer}>
      <h1><FaClipboardList className={styles.headerIcon} /> Orders</h1>

      <div className={styles.filterContainer}>
        <button 
          className={styles.filterButton} 
          onClick={toggleFilterDropdown}
          aria-expanded={isFilterOpen}
        >
          <FaFilter /> Filter Orders <FaAngleDown className={isFilterOpen ? styles.rotated : ''} />
        </button>
        
        {isFilterOpen && (
          <div className={styles.filterDropdown}>
            <button 
              className={`${styles.filterOption} ${filterStatus === "all" ? styles.active : ''}`} 
              onClick={() => handleFilterSelect("all")}
            >
              <FaClipboardList /> All Orders
            </button>
            <button 
              className={`${styles.filterOption} ${filterStatus === "pending" ? styles.active : ''}`} 
              onClick={() => handleFilterSelect("pending")}
            >
              <FaHourglassHalf /> Pending Orders
            </button>
            <button 
              className={`${styles.filterOption} ${filterStatus === "completed" ? styles.active : ''}`} 
              onClick={() => handleFilterSelect("completed")}
            >
              <FaCheckCircle /> Completed Orders
            </button>
          </div>
        )}
      </div>

      {loading && <p className={styles.loadingMessage}>Loading orders...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.ordersSummary}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Total Orders</span>
          <span className={styles.summaryValue}>{orders.length}</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Pending Orders</span>
          <span className={styles.summaryValue}>{orders.filter(order => order.status === "pending").length}</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Completed Orders</span>
          <span className={styles.summaryValue}>{orders.filter(order => order.status === "completed").length}</span>
        </div>
      </div>

      <ul className={styles.ordersList}>
        {filteredOrders.length === 0 && !loading && (
          <p className={styles.noOrders}>No {filterStatus !== "all" ? filterStatus : ""} orders found.</p>
        )}

        {filteredOrders.map((order) => (
          <li key={String(order._id)} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                {order.status === "pending" ? <FaHourglassHalf /> : <FaCheckCircle />}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString("en-GB")}</span>
            </div>
            
            <div className={styles.orderDetails}>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.customerEmail}</p>
              <p><strong>Phone:</strong> {order.customerPhone}</p>
              <p><strong>Total Amount:</strong> ₦{Number(order.totalAmount).toFixed(2)}</p>
              <div className={styles.statusSelectContainer}>
                <strong>Status:</strong>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(String(order._id), e.target.value as "pending" | "completed")
                  }
                  className={`${styles.statusSelect} ${styles[order.status]}`}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className={styles.productsSection}>
              <p><strong>Products:</strong></p>
              <ul className={styles.productList}>
                {order.products.map((item) => {
                  const product = typeof item.product === "string" ? { name: "Unknown Product", _id: item.product } : item.product;
                  return (
                    <li key={product._id}>
                      {product.name} - {item.quantity}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className={styles.orderButtons}>
              <button className={styles.downloadButton} onClick={() => generatePDF(order)}>
                <FaDownload /> Download PDF
              </button>
              <button className={styles.deleteButton} onClick={() => handleDeleteOrder(String(order._id))}>
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
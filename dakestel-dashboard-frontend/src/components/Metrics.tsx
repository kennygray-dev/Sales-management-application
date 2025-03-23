import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import styles from "./Metrics.module.scss"; 
import CountUp from "react-countup"; 
import { FaShoppingCart, FaCoins, FaUsers, FaChartLine } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

// Base API URL to avoid repetition
const API_BASE_URL = "https://dakestel-sales-management-application.onrender.com/api/orders";

// Types definitions for better type safety
interface WeeklySalesData {
  week: string;
  totalSales: number;
}

interface OrderStatusCounts {
  pending: number;
  completed: number;
}

interface PopularProduct {
  name: string;
  imageUrl: string;
  totalQuantity: number;
}

interface CustomerData {
  name: string;
  count: number;
}

// Component for displaying metric cards
const MetricCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  decimals?: number;
}> = ({ icon, value, label, prefix = "", decimals = 0 }) => (
  <div className={styles.metricBox}>
    {icon}
    <CountUp 
      end={value} 
      duration={1.5} 
      prefix={prefix} 
      separator="," 
      decimals={decimals} 
      className={styles.countUpNumber} 
    />
    <h3>{label}</h3>
  </div>
);

// Time utility functions
const timeUtils = {
  getGreeting: () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    return "Good Evening";
  },
  
  getCurrentDate: () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
  
  getCurrentTime: () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

// Chart components
const WeeklySalesChart: React.FC<{ data: WeeklySalesData[] }> = ({ data }) => (
  <div className={styles.chartContainer}>
    <h2>Weekly Sales</h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="week" tick={{ fontSize: 14, fill: "#666" }} />
        <YAxis tick={{ fontSize: 14, fill: "#666" }} />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          contentStyle={{
            backgroundColor: "#222",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            padding: "10px",
          }}
        />
        <Bar
          dataKey="totalSales"
          fill="url(#gradientSales)"
          barSize={35}
          radius={[8, 8, 0, 0]}
        />
        <defs>
          <linearGradient id="gradientSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a11cb" />
            <stop offset="100%" stopColor="#2575fc" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const OrderStatusChart: React.FC<{ data: OrderStatusCounts }> = ({ data }) => {
  const pieChartData = [
    { name: "Pending", value: data.pending },
    { name: "Completed", value: data.completed },
  ];
  const COLORS = ["#ED624E", "#95B8A4"];
  
  return (
    <div className={styles.chartContainer}>
      <h2>Pending vs Completed Orders</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomerChart: React.FC<{ data: CustomerData[] }> = ({ data }) => (
  <div className={styles.chartWrapper}>
    <div className={styles.chartHeader}>
      <h2>New vs Returning Customers</h2>
    </div>
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="90%" height={120}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis type="number" tick={{ fontSize: 14, fill: "#555" }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 14, fill: "#555" }} />
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Bar dataKey="count" fill="url(#gradient)" barSize={15} radius={[0, 8, 8, 0]} />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC2F1" />
              <stop offset="100%" stopColor="#BBB2EF" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const PopularProducts: React.FC<{ products: PopularProduct[] }> = ({ products }) => (
  <div className={styles.popularProductsContainer}>
    <h2>Popular Products</h2>
    <div className={styles.popularProductsList}>
      {products.map((product, index) => (
        <div key={index} className={styles.productItem}>
          <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          <div className={styles.productDetails}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productQuantity}>Total Ordered: {product.totalQuantity}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main component
const Metrics: React.FC = () => {
  // State definitions
  const [weeklySalesData, setWeeklySalesData] = useState<WeeklySalesData[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState<OrderStatusCounts>({
    pending: 0,
    completed: 0,
  });
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Use Promise.all for parallel requests
        const [
          weeklySalesResponse,
          totalSalesResponse,
          totalRevenueResponse,
          totalCustomersResponse,
          orderStatusResponse,
          popularProductsResponse,
          newReturningCustomersResponse
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/weekly-sales-data`),
          axios.get(`${API_BASE_URL}/total-sales`),
          axios.get(`${API_BASE_URL}/total-revenue`),
          axios.get(`${API_BASE_URL}/total-customers`),
          axios.get(`${API_BASE_URL}/order-status-summary`),
          axios.get(`${API_BASE_URL}/popular-orders`),
          axios.get(`${API_BASE_URL}/new-returning-customers`)
        ]);

        // Update state with fetched data
        setWeeklySalesData(weeklySalesResponse.data);
        setTotalSales(totalSalesResponse.data.totalSales);
        setTotalRevenue(totalRevenueResponse.data.totalRevenue);
        setTotalCustomers(totalCustomersResponse.data.totalCustomers);
        setOrderStatusCounts({
          pending: orderStatusResponse.data.pending || 0,
          completed: orderStatusResponse.data.completed || 0,
        });
        setPopularProducts(popularProductsResponse.data);
        setCustomerData([
          { name: "New Customers", count: newReturningCustomersResponse.data.newCustomers },
          { name: "Returning Customers", count: newReturningCustomersResponse.data.returningCustomers },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Calculate total weekly sales
  const totalWeeklySales = weeklySalesData.reduce((sum, week) => sum + week.totalSales, 0);

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#297e7c" size={50} />
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className={styles.metricsContainer}>
      {/* Left side */}
      <div className={styles.leftContainer}>
        {/* Greeting, Date, and Time */}
        <div className={styles.greetingContainer}>
          <h1>{timeUtils.getGreeting()}</h1>
          <p>{timeUtils.getCurrentDate()}</p>
          <p>{timeUtils.getCurrentTime()}</p>
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          <MetricCard 
            icon={<FaShoppingCart className={styles.metricIcon} />}
            value={totalSales}
            label="Orders completed"
          />
          <MetricCard 
            icon={<FaCoins className={styles.metricIcon} />}
            value={totalRevenue}
            label="Total Revenue"
            prefix="₦"
            decimals={2}
          />
          <MetricCard 
            icon={<FaUsers className={styles.metricIcon} />}
            value={totalCustomers}
            label="Total Customers"
          />
          <MetricCard 
            icon={<FaChartLine className={styles.metricIcon} />}
            value={totalWeeklySales}
            label="Weekly Sales"
            prefix="₦"
            decimals={2}
          />
        </div>

        <div className={styles.popularAndCustomers}>
          <PopularProducts products={popularProducts} />
          <CustomerChart data={customerData} />
        </div>
      </div>

      {/* Right side */}
      <div className={styles.rightContainer}>
        <WeeklySalesChart data={weeklySalesData} />
        <OrderStatusChart data={orderStatusCounts} />
      </div>
    </div>
  );
};

export default Metrics;
import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { Rating } from "primereact/rating";
import {
  MagnifyingGlass,
  Plus,
  DotsThreeVertical,
  ArrowUp,
  ArrowDown,
  Calendar,
  Package,
  ShoppingBag,
  CurrencyDollar,
  Star,
  Clock,
} from "@phosphor-icons/react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, userType } = useSelector((state) => state.auth);
  const [products] = useState([
    {
      id: "#326523",
      time: "14 Jan 2024, 11:14 PM",
      product: "RTX 4090 GPU",
      items: 2,
      total: "$1,599.00",
      rating: 4.5,
    },
    {
      id: "#436235",
      time: "12 Jan 2024, 11:14 PM",
      product: "Intel i9-14900K",
      items: 3,
      total: "$589.00",
      rating: 5.0,
    },
  ]);

  const availableProducts = [
    {
      name: "AMD Ryzen 9 7950X",
      available: 24,
      sold: 26,
      price: 699.0,
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      name: "RTX 4090 GPU",
      available: 28,
      sold: 172,
      price: 1599.0,
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      name: "32GB DDR5 RAM",
      available: 12,
      sold: 6,
      price: 165.0,
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      name: "2TB NVMe SSD",
      available: 28,
      sold: 76,
      price: 185.0,
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
    },
  ];

  const recentSalesData = [
    {
      id: 1,
      product: "Motherboard Z790",
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
      category: "Motherboards",
      amount: "459 USD",
      date: "15/03/2024",
      customer: "Alex Chen",
      status: "Processing",
    },
    {
      id: 2,
      product: "RTX 4080 GPU",
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
      category: "Graphics Cards",
      amount: "1,199 USD",
      date: "21/03/2024",
      customer: "Sarah Miller",
      status: "Shipped",
    },
    {
      id: 3,
      product: "Liquid Cooler",
      image:
        "https://m.media-amazon.com/images/I/81utBn59nCL._AC_UY436_FMwebp_QL65_.jpg",
      category: "Cooling",
      amount: "189 USD",
      date: "05/03/2024",
      customer: "Mike Johnson",
      status: "Done",
    },
  ];

  // Status styles configuration
  const statusStyles = {
    Processing: "bg-blue-100 text-blue-600",
    Shipped: "bg-yellow-100 text-yellow-600",
    Done: "bg-green-100 text-green-600",
  };

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Sales",
        data: [9000, 13000, 8000, 5000, 12000, 10000, 7000],
        fill: false,
        borderColor: "#2563eb",
        tension: 0.4,
      },
      {
        label: "Goals",
        data: [20500, 19000, 19000, 14000, 20500, 17000, 16000],
        fill: true,
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderColor: "rgba(37, 99, 235, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5000,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex gap-4 mb-6 justify-between">
        {/* header */}
        <div className="flex relative w-[20rem]">
          <MagnifyingGlass
            weight="regular"
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <InputText
            placeholder="Search Product"
            className="w-full p-2 pl-3 pr-10 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <Button
          label="Add New Product"
          icon={<Plus size={20} weight="bold" />}
          className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Left Column - Stats and Chart */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Total Sales Card */}
            <Card className="bg-white dark:bg-gray-800 rounded-xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Total Sales
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    325k
                  </div>
                  <div className="text-green-600 text-sm flex items-center gap-1">
                    <ArrowUp size={16} weight="bold" />
                    13.8% from last month
                  </div>
                </div>
                <Button
                  icon={<DotsThreeVertical size={24} />}
                  className="p-button-text p-button-rounded"
                />
              </div>
            </Card>

            {/* Monthly Growth Card */}
            <Card className="bg-white dark:bg-gray-800 rounded-xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Monthly Growth
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    241k
                  </div>
                  <div className="text-red-600 text-sm flex items-center gap-1">
                    <ArrowDown size={16} weight="bold" />
                    27.2% from last month
                  </div>
                </div>
                <Button
                  icon={<DotsThreeVertical size={24} />}
                  className="p-button-text p-button-rounded"
                />
              </div>
            </Card>
          </div>

          {/* Statistics Chart */}
          <Card className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-full">
            <div>
              <div className="text-xl font-medium text-gray-800 dark:text-white mb-1">
                Statistics
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Last update: 16 May 2024, 17:11
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
                <Button
                  key={period}
                  label={period}
                  className={`
          rounded-full px-4 py-2 text-sm font-medium transition-colors
          ${
            period === "Weekly"
              ? "bg-gray-900 text-white dark:bg-gray-700"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          }
        `}
                />
              ))}
            </div>

            <div className="relative">
              <div className="flex gap-6 mb-4 text-sm text-gray-600">
                <div>Goals : 20,500</div>
                <div>Sales : 13,535</div>
              </div>
              <div className="h-full">
                <Chart type="line" data={chartData} options={chartOptions} />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Available Products */}
        <div className="md:col-span-1">
          <Card className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div>
              <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Available Products
              </div>
              <div className="grid grid-cols-2 gap-4">
                {availableProducts.map((product, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="font-medium text-gray-900 dark:text-white mt-2">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product.available} Available | {product.sold} Sold
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800 dark:text-white">
            Recent Sold
          </div>
          <Button
            label="Last 7 Days"
            icon="pi pi-chevron-down"
            className="p-button-text text-gray-600"
          />
        </div>
        <DataTable
          value={recentSalesData}
          className="border-none dark:border-gray-700"
          showGridlines={false}
        >
          <Column
            header="Product"
            body={(rowData) => (
              <div className="flex items-center gap-3">
                <img
                  src={rowData.image}
                  alt={rowData.product}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="text-sm font-medium">{rowData.product}</span>
              </div>
            )}
          />
          <Column
            field="category"
            header="Category"
            body={(rowData) => (
              <span className="text-sm text-gray-600">{rowData.category}</span>
            )}
          />
          <Column
            field="amount"
            header="Amount"
            body={(rowData) => (
              <span className="text-sm font-semibold">{rowData.amount}</span>
            )}
          />
          <Column
            field="date"
            header="Date"
            body={(rowData) => (
              <span className="text-sm text-gray-600">{rowData.date}</span>
            )}
          />
          <Column
            field="customer"
            header="Customer"
            body={(rowData) => (
              <span className="text-sm">{rowData.customer}</span>
            )}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => (
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  statusStyles[rowData.status]
                }`}
              >
                {rowData.status}
              </span>
            )}
          />
          <Column
            body={() => (
              <Button
                icon={<DotsThreeVertical size={20} />}
                className="p-button-text p-button-rounded"
              />
            )}
          />
        </DataTable>
      </Card>
    </div>
  );
}

export default Dashboard;

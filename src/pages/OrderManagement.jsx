import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import {
  Package,
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  User,
  Clock,
  Truck,
} from "@phosphor-icons/react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  const fetchOrders = async () => {
    try {
      const userId = "your-user-id"; // Replace with actual user ID
      const response = await fetch(
        `http://localhost:3001/api/v1/order/user/${userId}`
      );
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Items</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {data.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.productId.title}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount:</span>
              <span>₹{data.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {data.shippingAddress.fullName}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {data.shippingAddress.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {data.shippingAddress.streetAddress}
              </p>
              <p>
                <span className="font-medium">City:</span>{" "}
                {data.shippingAddress.city}
              </p>
              <p>
                <span className="font-medium">State:</span>{" "}
                {data.shippingAddress.state}
              </p>
              <p>
                <span className="font-medium">ZIP:</span>{" "}
                {data.shippingAddress.zipCode}
              </p>
              <p>
                <span className="font-medium">Country:</span>{" "}
                {data.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Timeline</h3>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <CalendarBlank size={16} className="text-gray-500" />
              <span className="text-sm">
                Placed: {new Date(data.placedAt).toLocaleDateString()}
              </span>
            </div>
            {data.shippedAt && (
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-gray-500" />
                <span className="text-sm">
                  Shipped: {new Date(data.shippedAt).toLocaleDateString()}
                </span>
              </div>
            )}
            {data.deliveredAt && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-sm">
                  Delivered: {new Date(data.deliveredAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      Returned: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const orderIdTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Package size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm font-medium">#{rowData._id.slice(-6)}</span>
    </div>
  );

  const customerTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <User size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.shippingAddress.fullName}</span>
    </div>
  );

  const dateTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Clock size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">
        {new Date(rowData.placedAt).toLocaleDateString()}
      </span>
    </div>
  );

  const statusTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
          rowData.status
        )}`}
      >
        {rowData.status}
      </span>
    </div>
  );

  const statusBodyTemplate = (rowData) => (
    <Dropdown
      value={rowData.status}
      options={statusOptions}
      onChange={(e) => updateOrderStatus(rowData._id, e.value)}
      className="w-full"
    />
  );

  const header = (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Order Management
      </h2>
      <div className="relative">
        <InputText
          value={globalFilterValue}
          onChange={(e) => {
            setGlobalFilterValue(e.target.value);
            setFilters({
              ...filters,
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
          placeholder="Search orders..."
          className="text-sm p-2 pl-3 pr-10 border rounded-lg w-80"
        />
        <MagnifyingGlass
          size={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <DataTable
          value={orders}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          header={header}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={["_id", "shippingAddress.fullName", "status"]}
          paginator
          rows={10}
          loading={loading}
          rowsPerPageOptions={[5, 10, 25]}
          className="border-none"
        >
          <Column expander style={{ width: "3rem" }} />
          <Column
            field="_id"
            header="Order ID"
            body={orderIdTemplate}
            sortable
          />
          <Column
            field="shippingAddress.fullName"
            header="Customer"
            body={customerTemplate}
            sortable
          />
          <Column
            field="totalAmount"
            header="Total Amount"
            body={(row) => <span>₹{row.totalAmount.toLocaleString()}</span>}
            sortable
          />
          <Column
            field="status"
            header="Status"
            body={statusTemplate}
            sortable
            filter
            filterElement={statusBodyTemplate}
          />
          <Column
            field="placedAt"
            header="Order Date"
            body={dateTemplate}
            sortable
          />
          <Column
            field="status"
            header="Update Status"
            body={statusBodyTemplate}
            style={{ width: "200px" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default OrderManagement;

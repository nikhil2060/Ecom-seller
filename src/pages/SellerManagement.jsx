import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import {
  Buildings,
  User,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  CalendarBlank,
  Phone,
  Envelope,
  MapPin,
  ShieldCheck,
  ShieldWarning,
} from "@phosphor-icons/react";

const VerificationIcon = ({ isVerified }) =>
  isVerified ? (
    <ShieldCheck weight="fill" size={14} className="text-green-500 ml-2" />
  ) : (
    <ShieldWarning weight="fill" size={14} className="text-red-500 ml-2" />
  );

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/users/sellers"
      );
      const data = await response.json();
      const formattedSellers = data.sellers.map((seller) => ({
        id: seller._id,
        businessName: seller.businessProfile?.name || "Not Provided",
        ownerName: seller.name,
        email: seller.email,
        phone: seller.phone,
        status: seller.status,
        address: seller.address?.[0] || "Not Provided",
        registrationDate: seller.createdAt,
        emailVerified: seller.emailVerified,
        phoneVerified: seller.phoneVerified,
      }));
      setSellers(formattedSellers);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    businessName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ownerName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [expandedRows, setExpandedRows] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const handleAccept = async (sellerId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/users/${sellerId}/accept`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to accept seller");

      setSellers(
        sellers.map((seller) =>
          seller.id === sellerId ? { ...seller, status: "APPROVED" } : seller
        )
      );
    } catch (error) {
      console.error("Error accepting seller:", error);
    }
  };

  const handleReject = async (sellerId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/users/${sellerId}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to reject seller");

      setSellers(
        sellers.map((seller) =>
          seller.id === sellerId ? { ...seller, status: "REJECTED" } : seller
        )
      );
    } catch (error) {
      console.error("Error rejecting seller:", error);
    }
  };

  const businessNameTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Buildings size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.businessName}</span>
    </div>
  );

  const ownerNameTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <User size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.ownerName}</span>
    </div>
  );

  const dateTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <CalendarBlank size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">
        {new Date(rowData.registrationDate).toLocaleDateString()}
      </span>
    </div>
  );

  const statusTemplate = (rowData) => (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-medium
      ${
        rowData.status === "APPROVED"
          ? "bg-green-100 text-green-800"
          : rowData.status === "REJECTED"
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {rowData.status}
    </span>
  );

  const actionTemplate = (rowData) => {
    if (rowData.status !== "PENDING") {
      return null;
    }

    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleAccept(rowData.id)}
          className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                   bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          <CheckCircle weight="fill" size={16} />
          Accept
        </button>
        <button
          onClick={() => handleReject(rowData.id)}
          className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                   bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <XCircle weight="fill" size={16} />
          Reject
        </button>
      </div>
    );
  };

  const rowExpansionTemplate = (data) => (
    <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2 dark:text-white">
          <User
            weight="fill"
            size={16}
            className="text-gray-500 dark:text-gray-400"
          />
          Contact Information
        </h3>
        <div className="space-y-3 text-sm dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Envelope weight="fill" size={14} className="text-gray-500" />
            <span className="font-medium">Email:</span>
            <span className="flex items-center">
              {data.email}
              <VerificationIcon isVerified={data.emailVerified} />
              <span
                className={`ml-1 text-xs ${
                  data.emailVerified ? "text-green-600" : "text-red-600"
                }`}
              >
                {data.emailVerified ? "Verified" : "Not Verified"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone weight="fill" size={14} className="text-gray-500" />
            <span className="font-medium">Phone:</span>
            <span className="flex items-center">
              {data.phone}
              <VerificationIcon isVerified={data.phoneVerified} />
              <span
                className={`ml-1 text-xs ${
                  data.phoneVerified ? "text-green-600" : "text-red-600"
                }`}
              >
                {data.phoneVerified ? "Verified" : "Not Verified"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin weight="fill" size={14} className="text-gray-500" />
            <span className="font-medium">Address:</span> {data.address}
          </div>
        </div>
      </div>
    </div>
  );

  const header = (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Seller Join Requests
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
          placeholder="Search sellers..."
          className="text-sm p-2 pl-3 pr-10 border rounded-lg w-80 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <MagnifyingGlass
          size={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <DataTable
          value={sellers}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          header={header}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={["businessName", "ownerName", "email"]}
          paginator
          rows={10}
          loading={loading}
          rowsPerPageOptions={[5, 10, 25]}
          className="border-none dark:border-gray-700 rounded-xl"
        >
          <Column expander style={{ width: "3rem" }} />
          <Column
            field="businessName"
            header="Business Name"
            body={businessNameTemplate}
            sortable
            filter
          />
          <Column
            field="ownerName"
            header="Owner Name"
            body={ownerNameTemplate}
            sortable
            filter
          />
          <Column
            field="registrationDate"
            header="Registration Date"
            body={dateTemplate}
            sortable
          />
          <Column
            field="status"
            header="Status"
            body={statusTemplate}
            sortable
            filter
          />
          <Column
            body={actionTemplate}
            header="Actions"
            style={{ width: "250px" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default SellerManagement;

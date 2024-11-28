import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import {
  ShoppingCart,
  Storefront,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  CalendarBlank,
  Tag,
} from "@phosphor-icons/react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sellerName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/products");
      const data = await response.json();
      const formattedProducts = data.products.map((product) => ({
        id: product._id,
        productName: product.title,
        sellerName: product.seller.name,
        category: product.category,
        requestDate: product.createdAt,
        status: product.status,
        description: product.description,
        image: product.images?.[0],
        price: product.variants[0]?.price || 0,
        stock: product.variants[0]?.stock || 0,
        brand: product.brand,
        specifications: product.specifications,
        variants: product.variants,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAccept = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/products/${productId}/accept`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to accept product");
      setProducts(
        products.map((product) =>
          product.id === productId ? { ...product, status: "active" } : product
        )
      );
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };

  const handleReject = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/products/${productId}/reject`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to reject product");
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, status: "rejected" }
            : product
        )
      );
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  const rowExpansionTemplate = (data) => (
    <div className="p-4 space-y-6 bg-gray-50 border-t">
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Product Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            {data.image ? (
              <img
                src={data.image}
                alt={data.productName}
                className="w-32 h-32 rounded-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                <ShoppingCart size={32} className="text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold">
                {data.brand} - {data.productName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{data.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Technical Specs */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Technical Specifications</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Clock Speed</p>
              <p>
                {data.specifications?.clockSpeed?.speed}{" "}
                {data.specifications?.clockSpeed?.unit}
              </p>
            </div>
            <div>
              <p className="font-medium">Memory Type</p>
              <p>{data.specifications?.memoryType}</p>
            </div>
            <div>
              <p className="font-medium">Hash Rate</p>
              <p>
                {data.specifications?.hashRate?.rate}{" "}
                {data.specifications?.hashRate?.unit}
              </p>
            </div>
            <div>
              <p className="font-medium">Power Consumption</p>
              <p>
                {data.specifications?.powerConsumption?.watts}W (
                {data.specifications?.powerConsumption?.efficiency * 100}%
                efficient)
              </p>
            </div>
          </div>

          {/* Variants Section */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Available Variants</h3>
            <div className="space-y-2">
              {data.variants?.map((variant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-2 rounded-lg"
                >
                  <span>
                    {variant.memorySize.size}
                    {variant.memorySize.unit}
                  </span>
                  <div>
                    <span className="text-green-600 font-medium">
                      ₹{variant.price}
                    </span>
                    {variant.discount.percentage > 0 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {variant.discount.percentage}% off
                      </span>
                    )}
                  </div>
                  <span className="text-gray-600">Stock: {variant.stock}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const imageTemplate = (rowData) =>
    rowData.image ? (
      <img
        src={rowData.image}
        alt={rowData.productName}
        className="w-16 h-16 rounded-lg object-cover"
      />
    ) : (
      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
        <ShoppingCart size={24} className="text-gray-400" />
      </div>
    );

  const productTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <ShoppingCart size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.productName}</span>
    </div>
  );

  const sellerTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Storefront size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.sellerName}</span>
    </div>
  );

  const categoryTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Tag size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.category}</span>
    </div>
  );

  const dateTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <CalendarBlank size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">
        {new Date(rowData.requestDate).toLocaleDateString()}
      </span>
    </div>
  );

  const statusTemplate = (rowData) => (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-medium
      ${
        rowData.status === "active"
          ? "bg-green-100 text-green-800"
          : rowData.status === "rejected"
          ? "bg-red-100 text-red-800"
          : rowData.status === "abandoned"
          ? "bg-gray-100 text-gray-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
    </span>
  );

  const actionTemplate = (rowData) => {
    if (rowData.status !== "pending" && rowData.status !== "inactive")
      return null;

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

  const header = (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Product Approval Requests
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
          placeholder="Search products..."
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <DataTable
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          header={header}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={["productName", "sellerName", "category"]}
          paginator
          rows={10}
          loading={loading}
          rowsPerPageOptions={[5, 10, 25]}
          className="border-none"
        >
          <Column expander style={{ width: "3rem" }} />
          <Column
            field="image"
            header="Image"
            body={imageTemplate}
            style={{ width: "100px" }}
          />
          <Column
            field="productName"
            header="Product"
            body={productTemplate}
            sortable
            filter
          />
          <Column
            field="sellerName"
            header="Seller"
            body={sellerTemplate}
            sortable
            filter
          />
          <Column
            field="category"
            header="Category"
            body={categoryTemplate}
            sortable
            filter
          />
          <Column
            field="price"
            header="Price"
            body={(row) => <span>₹{row.price.toLocaleString()}</span>}
            sortable
          />
          <Column
            field="requestDate"
            header="Request Date"
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

export default ProductApproval;

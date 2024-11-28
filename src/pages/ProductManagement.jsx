import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  ShoppingCart,
  MagnifyingGlass,
  Tag,
  CalendarBlank,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { AddProductModal } from "../components/AddProductModal";
import { EditProductModal } from "../components/EditProductModal";
import { rowExpansionTemplate } from "../components/rowExpansionTemplate";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/products");
      const data = await response.json();
      const formattedProducts = data.products.map((product) => ({
        id: product._id,
        name: product.title,
        category: product.category,
        createdAt: product.createdAt,
        description: product.description,
        image: product.images,
        price: product.variants[0]?.price || 0,
        stock: product.variants[0]?.stock || 0,
        brand: product.brand,
        specifications: product.specifications,
        variants: product.variants,
      }));

      //   console.log(data);
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

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  // Row expansion template for product details

  // Table templates
  const imageTemplate = (rowData) => {
    return rowData.image ? (
      <img
        src={rowData?.image?.[0]?.url}
        alt={rowData.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
    ) : (
      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
        <ShoppingCart size={24} className="text-gray-400" />
      </div>
    );
  };

  const nameTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <ShoppingCart size={16} weight="fill" className="text-gray-500" />
      <span className="text-sm">{rowData.name}</span>
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
        {new Date(rowData.createdAt).toLocaleDateString()}
      </span>
    </div>
  );

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/products/${productId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Failed to delete product");
        fetchProducts(); // Refresh the products list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Then update the actionTemplate with both edit and delete buttons:

  const actionTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Button
        icon={<PencilSimple size={16} />}
        label="Edit"
        className="p-2 px-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm flex items-center gap-2"
        onClick={() => handleEdit(rowData)}
      />
      <Button
        icon={<Trash size={16} />}
        label="Delete"
        className="p-2 px-3 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors text-sm flex items-center gap-2"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  const header = (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Product Management
        </h2>
        <Button
          icon={<Plus size={16} />}
          label="Add Product"
          className="p-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        />
      </div>
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
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          header={header}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={["name", "category"]}
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
            field="name"
            header="Product"
            body={nameTemplate}
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
          <Column field="stock" header="Stock" sortable />
          <Column
            field="createdAt"
            header="Created Date"
            body={dateTemplate}
            sortable
          />
          <Column
            body={actionTemplate}
            header="Actions"
            style={{ width: "250px" }}
          />
        </DataTable>
      </div>

      <AddProductModal
        visible={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={() => {
          setShowAddModal(false);
          fetchProducts();
        }}
      />

      <EditProductModal
        visible={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSave={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
          fetchProducts();
        }}
      />
    </div>
  );
};

export default ProductManagement;

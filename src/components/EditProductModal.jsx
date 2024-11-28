import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Trash, Plus } from "@phosphor-icons/react";

export const EditProductModal = ({ visible, onHide, product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  if (!editedProduct) return null;

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/products/${editedProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedProduct),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      onSave();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog
      header={
        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Product
          </h2>
        </div>
      }
      visible={visible}
      onHide={onHide}
      className="w-11/12 max-w-7xl"
      modal
      headerClassName="dark:bg-gray-800 dark:text-white"
      contentClassName="dark:bg-gray-800"
      footer={
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-600 dark:bg-gray-800 w-full p-4">
          <Button
            label="Cancel"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={onHide}
          />
          <Button
            label="Save Changes"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
          />
        </div>
      }
    >
      <div className="p-4 bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product Name
                  </label>
                  <InputText
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <Dropdown
                    value={editedProduct.category}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, category: e.value })
                    }
                    options={["GPU", "CPU", "RAM", "Storage"]}
                    placeholder="Select Category"
                    className="w-full dark:bg-gray-800 dark:border-gray-600 border-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <InputTextarea
                    value={editedProduct.description}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2"
                  />
                </div>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Price & Stock
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <InputNumber
                    value={editedProduct.price}
                    onValueChange={(e) =>
                      setEditedProduct({ ...editedProduct, price: e.value })
                    }
                    mode="currency"
                    currency="INR"
                    className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock
                  </label>
                  <InputNumber
                    value={editedProduct.stock}
                    onValueChange={(e) =>
                      setEditedProduct({ ...editedProduct, stock: e.value })
                    }
                    className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Specifications */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Technical Specifications
                </h3>
                <Button
                  icon={<Plus size={16} />}
                  label="Add"
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 flex items-center gap-2"
                  onClick={() => {
                    setEditedProduct({
                      ...editedProduct,
                      specifications: {
                        ...editedProduct.specifications,
                        "": "",
                      },
                    });
                  }}
                />
              </div>
              <div className="space-y-4">
                {editedProduct.specifications &&
                  Object.entries(editedProduct.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-[1fr,1fr,auto] gap-4 items-start border-b dark:border-gray-600 pb-4 last:border-0"
                      >
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Name
                          </label>
                          <InputText
                            value={key}
                            placeholder="Specification name"
                            className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2"
                            onChange={(e) => {
                              const newSpecs = {
                                ...editedProduct.specifications,
                              };
                              delete newSpecs[key];
                              newSpecs[e.target.value] = value;
                              setEditedProduct({
                                ...editedProduct,
                                specifications: newSpecs,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Value
                          </label>
                          <InputText
                            value={
                              typeof value === "object"
                                ? JSON.stringify(value)
                                : value
                            }
                            placeholder="Value"
                            className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2"
                            onChange={(e) => {
                              setEditedProduct({
                                ...editedProduct,
                                specifications: {
                                  ...editedProduct.specifications,
                                  [key]: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                        <Button
                          icon={<Trash size={16} />}
                          className="mt-6 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          onClick={() => {
                            const newSpecs = {
                              ...editedProduct.specifications,
                            };
                            delete newSpecs[key];
                            setEditedProduct({
                              ...editedProduct,
                              specifications: newSpecs,
                            });
                          }}
                        />
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Variants
                </h3>
                <Button
                  icon={<Plus size={16} />}
                  label="Add Variant"
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 flex items-center gap-2"
                  onClick={() => {
                    setEditedProduct({
                      ...editedProduct,
                      variants: [
                        ...(editedProduct.variants || []),
                        {
                          memorySize: { size: "", unit: "GB" },
                          price: 0,
                          stock: 0,
                          discount: { percentage: 0 },
                        },
                      ],
                    });
                  }}
                />
              </div>
              <div className="space-y-4">
                {editedProduct.variants?.map((variant, index) => (
                  <div
                    key={index}
                    className="border dark:border-gray-600 p-4 rounded-lg dark:bg-gray-800"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Memory Size
                          </label>
                          <div className="flex gap-2">
                            <InputNumber
                              value={variant.memorySize?.size}
                              onValueChange={(e) => {
                                const newVariants = [...editedProduct.variants];
                                newVariants[index] = {
                                  ...variant,
                                  memorySize: {
                                    ...variant.memorySize,
                                    size: e.value,
                                  },
                                };
                                setEditedProduct({
                                  ...editedProduct,
                                  variants: newVariants,
                                });
                              }}
                              className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                            <InputText
                              value={variant.memorySize?.unit}
                              onChange={(e) => {
                                const newVariants = [...editedProduct.variants];
                                newVariants[index] = {
                                  ...variant,
                                  memorySize: {
                                    ...variant.memorySize,
                                    unit: e.target.value,
                                  },
                                };
                                setEditedProduct({
                                  ...editedProduct,
                                  variants: newVariants,
                                });
                              }}
                              className="w-24 dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Price
                          </label>
                          <InputNumber
                            value={variant.price}
                            onValueChange={(e) => {
                              const newVariants = [...editedProduct.variants];
                              newVariants[index] = {
                                ...variant,
                                price: e.value,
                              };
                              setEditedProduct({
                                ...editedProduct,
                                variants: newVariants,
                              });
                            }}
                            mode="currency"
                            currency="INR"
                            className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Stock
                          </label>
                          <InputNumber
                            value={variant.stock}
                            onValueChange={(e) => {
                              const newVariants = [...editedProduct.variants];
                              newVariants[index] = {
                                ...variant,
                                stock: e.value,
                              };
                              setEditedProduct({
                                ...editedProduct,
                                variants: newVariants,
                              });
                            }}
                            className="w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white border-2 p-2 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        icon={<Trash size={16} />}
                        severity="danger"
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        onClick={() => {
                          const newVariants = editedProduct.variants.filter(
                            (_, i) => i !== index
                          );
                          setEditedProduct({
                            ...editedProduct,
                            variants: newVariants,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProductModal;

import { ShoppingCart } from "@phosphor-icons/react";
import { useState } from "react";

export const rowExpansionTemplate = (data) => {
  console.log(data);
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {data.brand} {data.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Category: {data.category}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Product Gallery */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            {data.image?.[0] ? (
              <img
                src={data.image[0].url}
                alt={data.image[0].alt}
                className="w-full h-[300px] rounded-lg object-contain bg-gray-100 dark:bg-gray-800"
              />
            ) : (
              <div className="w-full h-[300px] rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <ShoppingCart
                  size={64}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* Right Column - Product Information */}
        <div className="space-y-6">
          {/* Price & Stock Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{data.price.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Stock: {data.stock} units
              </div>
            </div>
            {data.variants?.[0]?.discount?.percentage > 0 && (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm inline-block">
                {data.variants[0].discount.percentage}% off until{" "}
                {new Date(
                  data.variants[0].discount.validUntil
                ).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Specifications Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(data.specifications).map(([key, value]) => {
                if (typeof value === "object" && !Array.isArray(value)) {
                  return (
                    <div
                      key={key}
                      className="border-b dark:border-gray-600 pb-3 last:border-0"
                    >
                      <div className="font-medium text-gray-700 dark:text-gray-200 capitalize mb-1">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <span key={subKey} className="mr-2">
                            {subValue}{" "}
                            {subKey === "unit" ? "" : value.unit || ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (Array.isArray(value)) {
                  return (
                    <div
                      key={key}
                      className="border-b dark:border-gray-600 pb-3 last:border-0"
                    >
                      <div className="font-medium text-gray-700 dark:text-gray-200 capitalize mb-1">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {value.map((item, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={key}
                    className="border-b dark:border-gray-600 pb-3 last:border-0"
                  >
                    <div className="font-medium text-gray-700 dark:text-gray-200 capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Variants Section */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Available Variants
            </h3>
            <div className="space-y-3">
              {data.variants.map((variant, index) => (
                <div
                  key={index}
                  className="border dark:border-gray-600 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-gray-900 dark:text-white font-medium">
                      {variant.memorySize.size} {variant.memorySize.unit}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-green-600 dark:text-green-400 font-semibold">
                        ₹{variant.price.toLocaleString()}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Stock: {variant.stock}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

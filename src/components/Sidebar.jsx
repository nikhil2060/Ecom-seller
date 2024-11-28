import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  ChartBar,
  ShoppingCart,
  Heart,
  Package,
  Storefront,
  Users,
  User,
  ClipboardText,
  Gear,
  SignOut,
  FileCsv,
  Bell,
  ShieldCheck,
  CurrencyDollar,
  ChatCircle,
  Clipboard,
  Truck,
  Question,
} from "@phosphor-icons/react";

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    {
      section: "Dashboard",
      items: [
        {
          to: "/dashboard",
          icon: <House weight="regular" size={22} />,
          text: "Overview",
        },
        {
          to: "/dashboard/analytics",
          icon: <ChartBar weight="regular" size={22} />,
          text: "Analytics",
        },
      ],
    },
    {
      section: "Product Management",
      items: [
        {
          to: "/products/add",
          icon: <Clipboard weight="regular" size={22} />,
          text: "Add/Edit Products",
        },
        {
          to: "/manage-products",
          icon: <Package weight="regular" size={22} />,
          text: "Product List",
        },
        {
          to: "/products/bulk-upload",
          icon: <FileCsv weight="regular" size={22} />,
          text: "Bulk Upload",
        },
        {
          to: "/products/categories",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Categories & Tags",
        },
      ],
    },
    {
      section: "Order Management",
      items: [
        {
          to: "/orders/list",
          icon: <ShoppingCart weight="regular" size={22} />,
          text: "Order List",
        },
        {
          to: "/orders/status-updates",
          icon: <ShieldCheck weight="regular" size={22} />,
          text: "Order Status Updates",
        },
        {
          to: "/orders/invoices",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Invoice Generation",
        },
        {
          to: "/orders/returns-refunds",
          icon: <Package weight="regular" size={22} />,
          text: "Returns & Refunds",
        },
      ],
    },
    {
      section: "Inventory Management",
      items: [
        {
          to: "/inventory/stock-levels",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Stock Levels",
        },
        {
          to: "/inventory/alerts",
          icon: <Bell weight="regular" size={22} />,
          text: "Low Stock Alerts",
        },
        {
          to: "/inventory/update-stock",
          icon: <Clipboard weight="regular" size={22} />,
          text: "Update Stock",
        },
      ],
    },
    {
      section: "Earnings & Payments",
      items: [
        {
          to: "/earnings/summary",
          icon: <CurrencyDollar weight="regular" size={22} />,
          text: "Earnings Summary",
        },
        {
          to: "/earnings/transactions",
          icon: <Clipboard weight="regular" size={22} />,
          text: "Transaction Details",
        },
        {
          to: "/earnings/export",
          icon: <FileCsv weight="regular" size={22} />,
          text: "Export Data",
        },
      ],
    },
    {
      section: "Reviews & Feedback",
      items: [
        {
          to: "/reviews",
          icon: <Heart weight="regular" size={22} />,
          text: "Customer Reviews",
        },
        {
          to: "/feedback",
          icon: <ChatCircle weight="regular" size={22} />,
          text: "Respond to Feedback",
        },
      ],
    },
    {
      section: "Discounts & Offers",
      items: [
        {
          to: "/discounts",
          icon: <Clipboard weight="regular" size={22} />,
          text: "Manage Discounts",
        },
        {
          to: "/offers",
          icon: <ChartBar weight="regular" size={22} />,
          text: "Offers Performance",
        },
      ],
    },
    {
      section: "Reports & Analytics",
      items: [
        {
          to: "/reports/sales",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Sales Reports",
        },
        {
          to: "/reports/customers",
          icon: <Users weight="regular" size={22} />,
          text: "Customer Insights",
        },
        {
          to: "/reports/performance",
          icon: <ChartBar weight="regular" size={22} />,
          text: "Product Performance",
        },
      ],
    },
    {
      section: "Shipping & Delivery",
      items: [
        {
          to: "/shipping/providers",
          icon: <Truck weight="regular" size={22} />,
          text: "Shipping Providers",
        },
        {
          to: "/shipping/rates",
          icon: <Clipboard weight="regular" size={22} />,
          text: "Manage Rates",
        },
        {
          to: "/shipping/labels",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Generate Labels",
        },
      ],
    },
    {
      section: "Profile Management",
      items: [
        {
          to: "/profile",
          icon: <User weight="regular" size={22} />,
          text: "Update Profile",
        },
        {
          to: "/profile/settings",
          icon: <Gear weight="regular" size={22} />,
          text: "Account Settings",
        },
      ],
    },
    {
      section: "Notifications",
      items: [
        {
          to: "/notifications",
          icon: <Bell weight="regular" size={22} />,
          text: "Manage Notifications",
        },
      ],
    },
    {
      section: "Customer Support",
      items: [
        {
          to: "/support",
          icon: <ChatCircle weight="regular" size={22} />,
          text: "Customer Inquiries",
        },
        {
          to: "/support/tickets",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Ticket System",
        },
      ],
    },
    {
      section: "Help & Documentation",
      items: [
        {
          to: "/help",
          icon: <Question weight="regular" size={22} />,
          text: "Guides & Tutorials",
        },
        {
          to: "/faq",
          icon: <Question weight="regular" size={22} />,
          text: "FAQs",
        },
      ],
    },
    {
      section: "Logout",
      items: [
        {
          to: "/logout",
          icon: <SignOut weight="regular" size={22} />,
          text: "Logout",
        },
      ],
    },
  ];

  return (
    <>
      <aside
        className={`fixed top-16 bottom-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-sm transform transition-transform duration-300 ease-in-out z-30 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4">
          {navigationItems.map((section, index) => (
            <div
              key={section.section}
              className={`mb-8 ${
                index !== 0 &&
                "border-t border-gray-100 dark:border-gray-700 pt-8"
              }`}
            >
              <h2 className="text-xs font-medium text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4 px-4">
                {section.section}
              </h2>
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700/50 transition-colors duration-200"
                    onClick={() => window.innerWidth < 768 && onClose?.()}
                  >
                    {item.icon}
                    <span className="font-medium text-sm">{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;

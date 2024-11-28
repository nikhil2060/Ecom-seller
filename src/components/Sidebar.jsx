import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  Package,
  Storefront,
  Users,
  ChartLine,
  Gear,
  Tag,
  Cube,
  ClipboardText,
  ShoppingCart,
  ChartBar,
  CurrencyCircleDollar,
  Heart,
  User,
  SignOut,
} from "@phosphor-icons/react";

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    {
      section: "Overview",
      items: [
        {
          to: "/dashboard",
          icon: <House weight="regular" size={22} />,
          text: "Home",
        },
        {
          to: "/analytics",
          icon: <ChartBar weight="regular" size={22} />,
          text: "Analytics",
        },
        {
          to: "/cart",
          icon: <ShoppingCart weight="regular" size={22} />,
          text: "Cart",
        },
        {
          to: "/wishlist",
          icon: <Heart weight="regular" size={22} />,
          text: "Wishlist",
        },
      ],
    },
    {
      section: "Store Management",
      items: [
        {
          to: "/product-approval-requests",
          icon: <Package weight="regular" size={22} />,
          text: "Products requests",
        },
        {
          to: "/manage-products",
          icon: <ShoppingCart weight="regular" size={22} />,
          text: "Manage Products",
        },
      ],
    },
    {
      section: "User Management",
      items: [
        {
          to: "/seller-requests",
          icon: <Storefront weight="regular" size={22} />,
          text: "Sellers requests",
        },
        {
          to: "/customers",
          icon: <Users weight="regular" size={22} />,
          text: "Customers",
        },
      ],
    },
    {
      section: "Administration",
      items: [
        {
          to: "/profile",
          icon: <User weight="regular" size={22} />,
          text: "Profile",
        },
        {
          to: "/reports",
          icon: <ClipboardText weight="regular" size={22} />,
          text: "Reports",
        },
        {
          to: "/settings",
          icon: <Gear weight="regular" size={22} />,
          text: "Settings",
        },

        {
          to: "/logout",
          icon: <SignOut weight="regular" size={22} />, // Added logout icon
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

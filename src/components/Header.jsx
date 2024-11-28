import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  House,
  ShoppingCart,
  SignIn,
  UserCirclePlus,
  List,
  X,
  CaretDown,
  SignOut,
  UserCircle,
  Bell,
  Storefront,
  Package,
} from "@phosphor-icons/react";
import { useLayout } from "../context/layoutContext";
import { useSocket } from "../context/socketContext";
import toast from "react-hot-toast";

function Header() {
  const {
    darkMode,
    toggleTheme,
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
  } = useLayout();
  const socket = useSocket();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    if (socket) {
      // Listen for new notifications
      socket.on("newNotification", (notification) => {
        const newNotification = {
          id: Date.now(),
          type: notification.type,
          title: notification.title,
          message: notification.message,
          requestId: notification.requestId,
          productId: notification.productId,
          timestamp: notification.timestamp,
          read: false,
        };
        setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
        setUnreadCount((prev) => prev + 1);
      });
    }
    return () => {
      if (socket) {
        socket.off("newNotification");
      }
    };
  }, [socket]);

  const navigationLinks = [
    { to: "/", icon: <House weight="bold" size={20} />, text: "Home" },
    {
      to: "/shop",
      icon: <ShoppingCart weight="bold" size={20} />,
      text: "Shop",
    },
    { to: "/login", icon: <SignIn weight="bold" size={20} />, text: "Login" },
    {
      to: "/register",
      icon: <UserCirclePlus weight="bold" size={20} />,
      text: "Register",
    },
  ];

  // Test functions for different notification types
  const handleTestSellerRequest = () => {
    if (socket) {
      socket.emit("becomeSellerRequest", {
        customerName: "John Doe",
        requestId: Date.now().toString(),
      });
    }
  };

  const handleTestProductRequest = () => {
    if (socket) {
      socket.emit("productApprovalRequest", {
        businessName: "Tech Store",
        requestId: Date.now().toString(),
        productId: `PROD-${Date.now()}`,
      });
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (unreadCount > 0) {
      setUnreadCount(0);
      socket?.emit("markNotificationsAsRead");
    }
  };

  // Function to get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "SELLER_REQUEST":
        return (
          <Storefront weight="regular" size={20} className="text-blue-500" />
        );
      case "PRODUCT_REQUEST":
        return (
          <Package weight="regular" size={20} className="text-green-500" />
        );
      default:
        return <Bell weight="regular" size={20} className="text-gray-500" />;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 w-full px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <X
                weight="regular"
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
            ) : (
              <List
                weight="regular"
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Technology Heaven
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          {/* Notification Icon and Dropdown */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              aria-label="Notifications"
            >
              <Bell
                weight="regular"
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(
                                notification.timestamp
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <UserCircle
                weight="regular"
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
              <CaretDown
                weight="bold"
                className="text-gray-600 dark:text-gray-300"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                ))}
                <button
                  className="w-full flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <SignOut weight="bold" size={20} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun
                weight="fill"
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
            ) : (
              <Moon
                weight="fill"
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "72px" }}
      >
        <div className="p-6">
          <nav className="flex flex-col space-y-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={toggleSidebar}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
            <button
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={toggleSidebar}
            >
              <SignOut weight="bold" size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {(isSidebarOpen || isDropdownOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-20"
          style={{ top: "72px" }}
          onClick={() => {
            setIsSidebarOpen(false);
            setIsDropdownOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
}

export default Header;

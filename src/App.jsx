import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "./context/layoutContext";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./components/Dashboard";
import SellerManagement from "./pages/SellerManagement";
import ProductApproval from "./pages/ProductApproval";
import ManageProduct from "./pages/ManageProdcuts";
import ProductManagement from "./pages/ProductManagement";

function App() {
  return (
    <LayoutProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

            {/* User Management */}
            <Route path="/seller-requests" element={<SellerManagement />} />

            <Route path="/manage-products" element={<ProductManagement />} />

            <Route
              path="/product-approval-requests"
              element={<ProductApproval />}
            />
          </Routes>
        </AppLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            success: { style: { background: "#22c55e", color: "white" } },
            error: { style: { background: "#ef4444", color: "white" } },
          }}
        />
      </Router>
    </LayoutProvider>
  );
}

export default App;

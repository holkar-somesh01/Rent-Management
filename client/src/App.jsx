import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner'
import Protected from "./share/Protected";
import Unauthorized from "./components/Unauthorized";
import SuperAdmin from "./components/admin/SuperAdmin";
import Login from "./authentication/Login";
import RegisterUsers from "./pages/Admin/RegisterUsers";
import AdminLayout from "./components/admin/AdminLayout";
import Tenants from "./pages/Admin/Tenants";
import LandLords from "./pages/Admin/LandLords";
import Payment from "./pages/Admin/Payment";
import Properties from "./pages/Admin/Properties";
import LandlordLayout from "./components/landlord/LandlordLayout";
import LandlordDashboard from "./pages/landlord/LandlordDashboard";
import LandlordPayment from "./pages/landlord/LandlordPayment";
import LandlordProfile from "./pages/landlord/LandlordProfile";
import LandlordProperties from "./pages/landlord/LandlordProperties";
import LandlordTenants from "./pages/landlord/LandlordTenants";
import EditTenants from "./edit-components/landlord/EditTenants";
import AddProperties from "./edit-components/Admin/AddProperties";
import AddPayment from "./edit-components/Admin/AddPayment";
import LandlordAddTenant from "./pages/landlord/LandlordAddTenant";
import EditLandlordProfile from "./components/landlord/EditLandlordProfile";
import TenantDetails from "./components/landlord/TenantDetails";
import AddTenantPayment from "./pages/landlord/AddTenantPayment";
import UpdateTenantPayment from "./edit-components/landlord/EditPayment";
import HomePage from "./pages/User/HomePage";
import PremiumUser from "./pages/Admin/PremiumUser";
import Register from "./authentication/Register";
import Plans from "./pages/premium/Plans";
import PremiumPayment from "./pages/premium/PremiumPayment";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/premium-payment" element={<PremiumPayment />} />
          <Route path="/landlord" element={<Protected allowedRoles={["Landlord"]} />}>
            <Route element={<LandlordLayout />}>
              <Route index element={<LandlordDashboard />} />
              <Route path="update-property/:id" element={<AddProperties />} />
              <Route path="payments" element={<LandlordPayment />} />
              <Route path="profile" element={<LandlordProfile />} />
              <Route path="edit-profile" element={<EditLandlordProfile />} />
              <Route path="properties" element={<LandlordProperties />} />
              <Route path="add-tenants" element={<LandlordAddTenant />} />
              <Route path="add-property" element={<AddProperties />} />
              <Route path="add-payment/:id" element={<AddTenantPayment />} />
              <Route path="update-payment/:id" element={<UpdateTenantPayment />} />
              <Route path="tenants" element={<LandlordTenants />} />
              <Route path="tenant-details/:id" element={<TenantDetails />} />
              <Route path="edit-tenants" element={<EditTenants />} />
            </Route>
          </Route>
          <Route path="/superAdmin" element={<Protected allowedRoles={["SuperAdmin"]} />}>
            <Route element={<AdminLayout />}>
              <Route index element={<SuperAdmin />} />
              <Route path="dashboard" element={<SuperAdmin />} />
              <Route path="add-property" element={<AddProperties />} />
              <Route path="add-payment" element={<AddPayment />} />
              <Route path="update-property/:id" element={<AddProperties />} />
              <Route path="update-payment/:id" element={<AddPayment />} />
              <Route path="superAdmin-register" element={<RegisterUsers />} />
              <Route path="all-tenants" element={<Tenants />} />
              <Route path="all-landlords" element={<LandLords />} />
              <Route path="payment" element={<Payment />} />
              <Route path="premium" element={<PremiumUser />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

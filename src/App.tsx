import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import DashboardLayout from "@/pages/DashboardLayout"
import DashboardPage from "@/pages/Dashboard/Dashboard"
import InventoryPage from "@/pages/Inventory/InventoryPage"
import CategoriesPage from "@/pages/Categories/CategoriesPage"
import ReportsPage from "@/pages/Reports/ReportsPage"
import UsersPage from "@/pages/Users/UsersPage"
import AlertsPage from "@/pages/Alerts/AlertsPage"
import SettingsPage from "@/pages/Settings/SettingsPage"
import SupportPage from "@/pages/Support/SupportPage"
import LoginPage from "@/pages/login/login"
import ActivityFeed from "@/pages/ActivityFeed/ActivityFeed"
import "./App.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
            
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              
            }
          />

          <Route
            path="/dashboard/inventory"
            element={
            
                <DashboardLayout>
                  <InventoryPage />
                </DashboardLayout>
              
            }
          />

          <Route
            path="/dashboard/categories"
            element={
            
                <DashboardLayout>
                  <CategoriesPage />
                </DashboardLayout>
              
            }
          />


          <Route
            path="/dashboard/reports"
            element={
            
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              
            }
          />

                    <Route
            path="/dashboard/activity"
            element={
            
                <DashboardLayout>
                  <ActivityFeed />
                </DashboardLayout>
              
            }
          />

          <Route
            path="/dashboard/users"
            element={
             
                <DashboardLayout>
                  <UsersPage />
                </DashboardLayout>
   
            }
          />

          <Route
            path="/dashboard/alerts"
            element={
            
                <DashboardLayout>
                  <AlertsPage />
                </DashboardLayout>
              
            }
          />

          <Route
            path="/dashboard/settings"
            element={
            
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              
            }
          />

          <Route
            path="/dashboard/support"
            element={
            
                <DashboardLayout>
                  <SupportPage />
                </DashboardLayout>
              
            }
          />
        </Routes>

        {/* Global toast notifications */}
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

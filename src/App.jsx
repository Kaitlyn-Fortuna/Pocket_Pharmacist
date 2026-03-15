import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import BottomNav from "./components/shared/BottomNav";

import Capture from "./pages/Capture";
import Medications from "./pages/Medications";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

const HIDE_NAV_ON = ["/SignIn"];

function AppShell() {
  const location = useLocation();
  const showNav = !HIDE_NAV_ON.includes(location.pathname);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div style={{ maxWidth: "448px", margin: "0 auto", paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/SignIn" replace />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Capture" element={<Capture />} />
          <Route path="/Medications" element={<Medications />} />
          <Route path="/Results" element={<Results />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppShell />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home/Home";
// import Programs from "./pages/Programs/Programs";
// // import Trainers from "./pages/Trainers/Trainers";
// // import Pricing from "./pages/Pricing/Pricing";
// import { useState } from "react";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route path="/programs" element={<Programs />} />
//         {/*
//         <Route path="/trainers" element={<Trainers />} />

//         <Route path="/pricing" element={<Pricing />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/Home";
import Programs from "./pages/Programs/Programs";
import Trainers from "./pages/Trainers/Trainers";
import Pricing from "./pages/Pricing/Pricing";
import Footer from "./components/Footer/Footer";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Navbar from "./components/Navbar/Navbar";
import Programdetails from "./pages/Programdetails/Programdetails";
import Exercisedetails from "./pages/Exercisedetails/Exercisedetails";
import Checkout from "./pages/Checkout/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Contact from "./components/Contact/Contact";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import WorkoutHistory from "./pages/WorkoutHistory/WorkoutHistory";
import Profile from "./pages/Profile/Profile";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {/* Splash screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Navbar stays on every page */}
      <Navbar />
      <ScrollToTop />
      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:programId" element={<Programdetails />} />
        <Route path="/exercises/:exerciseId" element={<Exercisedetails />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/Checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout-history" element={<WorkoutHistory />} />

        {/* Add later */}
        {/* <Route path="/trainers" element={<Trainers />} /> */}
        {/* <Route path="/pricing" element={<Pricing />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

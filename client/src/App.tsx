import { Routes, Route, MemoryRouter } from "react-router-dom";
import "./App.css";
import MainRoot from "./pages/MainRoot";
import { useEffect, useState } from "react";
import LoginApiKey from "./components/LoginApiKey";
import RegistrationPage from "./pages/RegistrationPage";
import GuestInfoRegistrationPage from "./pages/GuestInfoRegistrationPage";
import GuestSearchPage from "./pages/GuestSearchPage";
import BarcodeScannerPage from "./pages/BarcodeScannerPage";
import NameScannerPage from "./pages/NameScannerPage";
import Error404 from "./components/Error404";
import SessiondetailsPage from "./pages/SessiondetailsPage";

function App() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const apiKeyData = localStorage.getItem("apiKey");
    if (apiKeyData) {
      setApiKey(apiKeyData);
    }
  }, [setApiKey]);

  return (
    <MemoryRouter>
      <Routes>
        {apiKey === "" ? (
          <>
            <Route path="/" element={<LoginApiKey />} />
            <Route path="*" element={<Error404 />} />
          </>
        ) : (
          <>
            <Route path="/" element={<MainRoot />} />
            <Route path="/Sessiondetails" element={<SessiondetailsPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/Registration" element={<RegistrationPage />} />
            <Route
              path="/GuestInfoRegistrationPage"
              element={<GuestInfoRegistrationPage />}
            />
            <Route path="/GuestSearch" element={<GuestSearchPage />} />
            <Route
              path="/GuestSearch/BarcodeScanner"
              element={<BarcodeScannerPage />}
            />
            <Route
              path="/GuestSearch/NameScanner"
              element={<NameScannerPage />}
            />
          </>
        )}
      </Routes>
    </MemoryRouter>
  );
}

export default App;

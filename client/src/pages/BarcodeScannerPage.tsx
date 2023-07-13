import React from "react";
import NavBar from "../components/NavBar";
import BarcodeScanner from "../components/BarcodeScanner";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const BarcodeScannerPage: React.FC<Props> = () => {
  return (
    <>
      <NavBar />
      <BarcodeScanner />
    </>
  );
};
export default BarcodeScannerPage;

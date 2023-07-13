import React from "react";
import NavBar from "../components/NavBar";
import NameScanner from "../components/NameScanner";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const NameScannerPage: React.FC<Props> = () => {
  return (
    <>
      <NavBar />
      <NameScanner />
    </>
  );
};
export default NameScannerPage;

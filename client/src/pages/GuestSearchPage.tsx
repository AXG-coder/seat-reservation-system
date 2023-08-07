import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const GuestSearchPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-12 justify-center place-items-center pt-16">
        <Link to="BarcodeScanner" className="Link">
          Barcode Scanner
        </Link>
        <Link to="NameScanner" className="Link">
          Name Scanner
        </Link>
        <Link to="SeqScanner" className="Link">
          Seq Scanner
        </Link>
      </div>
    </>
  );
};
export default GuestSearchPage;

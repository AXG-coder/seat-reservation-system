import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Error404 = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col place-items-center justify-center py-24 gap-6">
        <h2 className="text-3xl text-center">
          Error 404 page not found or not login
        </h2>
        <Link to="/" className="Link">
          back to Home page
        </Link>
      </div>
    </>
  );
};
export default Error404;

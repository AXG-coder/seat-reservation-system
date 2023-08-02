import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState<boolean>(false);
  const Links = [
    { name: "session", link: "/" },
    { name: "Registration", link: "/Registration" },
    { name: "GuestInfo", link: "/GuestInfoRegistrationPage" },
    { name: "Guest Search", link: "/GuestSearch" },
    { name: "Session Details", link: "/Sessiondetails" },
  ];
  const deletKey = () => {
    localStorage.removeItem("apiKey");
    window.location.reload();
  };
  return (
    <nav className="w-screen shadow-md left-0 bg-Secondary flex place-content-center ">
      <div className="justify-between px-6 py-3 md:flex h-16">
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-3 cursor-pointer md:hidden "
        >
          <img src={open ? "/close.svg" : "/menu.svg"} className="w-8 h-12" />
        </div>
        <ul
          className={`md:flex md:items-center md:flex-row flex flex-col md:pb-0 pb-5 absolute md:static
         bg-Secondary w-full md:z-auto  left-0 md:w-auto duration-700 ease-in-out 
         md:opacity-100
          ${open ? "opacity-100" : "left-[-780px] opacity-0"}`}
        >
          {Links.map((iteam) => (
            <Link
              key={iteam.name}
              to={iteam.link}
              onClick={() => setOpen(false)}
              className="text-color hover:text-gray-400 duration-500 md:ml-8 text-x1 md:my-0 my-5 px-3"
            >
              {iteam.name}
            </Link>
          ))}
          <button onClick={deletKey} className="mx-4">
            remove Key
          </button>
        </ul>
      </div>
    </nav>
  );
}

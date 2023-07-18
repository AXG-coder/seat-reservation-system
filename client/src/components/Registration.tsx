import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Registration: React.FC<Props> = () => {
  const [guestName, setguestName] = useState<string>("");
  const [guestGender, setGuestGender] = useState<string>("");

  const postRegistration = async () => {
    if (guestName === "" || guestGender === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Out the Form",
      });
      return;
    }
    try {
      const res = await axios.post(
        "api/NameRegistration",
        {
          name: guestName,
          gender: guestGender,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        Swal.fire("done", "guest has been registered", "success");
        setguestName("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You don't have permission or guest has been registered",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col py-32 place-items-center justify-center gap-6">
        <div className="text-4xl">Register a new guest</div>
        <input
          type="text"
          id="apiKey"
          value={guestName}
          onChange={(e) => setguestName(e.target.value)}
          className="rounded-xl h-12 text-center"
        />
        <select
          onChange={(e) => setGuestGender(e.target.value)}
          name="plane"
          className="rounded text-2xl"
        >
          <option value="">Select Gender</option>
          <option value="adult">adult</option>
          <option value="child">child</option>
          <option value="infant">infant</option>
        </select>
        <button className="text-1xl" onClick={postRegistration}>
          Register
        </button>
      </div>
    </>
  );
};
export default Registration;

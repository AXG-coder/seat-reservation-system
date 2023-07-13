import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import GuestInfoRegistration from "./GuestInfoRegistration";

interface guestInfoiteIteam {
  _id: string;
  name: string;
  seatLocation: string;
  size: number;
  barcode: number;
}

const GuestInfo = () => {
  const [guestName, setguestName] = useState("");

  const [viewInfo, setViewInfo] = useState(false);

  const [guestInfo, setGuestInfo] = useState<guestInfoiteIteam | undefined>();

  const getOneOfGuest = async () => {
    if (guestName === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Out the Form",
      });
      setViewInfo(false);
      return;
    }
    if (guestInfo?.name) {
      setViewInfo(false);
    }
    try {
      const res = await axios.post(
        "api/getOneOfAudience",
        {
          name: guestName,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        setGuestInfo(res.data);
        setViewInfo(true);
        setguestName("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No guest has been registered in this name",
      });
      setViewInfo(false);
    }
  };
  return (
    <>
      <div className="flex flex-col py-12 place-items-center justify-center gap-6">
        <div className="text-4xl">enter guest name</div>
        <input
          type="text"
          id="apiKey"
          value={guestName}
          onChange={(e) => setguestName(e.target.value)}
          className="rounded-xl h-12 text-center"
        />
        <button className="text-1xl" onClick={getOneOfGuest}>
          research
        </button>
      </div>
      {guestInfo !== undefined && viewInfo ? (
        <GuestInfoRegistration
          _id={guestInfo._id}
          name={guestInfo.name}
          seatLocation={guestInfo.seatLocation}
          size={guestInfo.size}
          barcode={guestInfo.barcode}
        />
      ) : null}
    </>
  );
};
export default GuestInfo;

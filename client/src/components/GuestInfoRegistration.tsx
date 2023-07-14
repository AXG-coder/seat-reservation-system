import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import PrintGuestInfo from "./PrintGuestInfo";
import ReactToPrint from "react-to-print";

interface Props {
  _id: string;
  name: string;
  seatLocation: string;
  size: number;
  barcode: number;
}

const GuestInfoRegistration: React.FC<Props> = (props) => {
  const [guestInfo, setGuestInfo] = useState<Props>(props);

  const [redayToPrint, setredayToPrint] = useState(false);

  const [sessionName, setsessionName] = useState<string | null>("");

  const [date, setDate] = useState<string>("");

  const componentRef = useRef<HTMLDivElement>(null);

  const handleSeatLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setGuestInfo((prevGuestInfo) => ({
      ...prevGuestInfo,
      seatLocation: newValue,
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setGuestInfo((prevGuestInfo) => ({
      ...prevGuestInfo,
      size: newValue,
    }));
  };

  const postGuestInfo = async () => {
    if (guestInfo.seatLocation.includes("N/A")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Choose a seat",
      });
      return;
    }
    try {
      const res = await axios.post(
        "api/editInfo",
        {
          _id: guestInfo._id,
          seatLocation: guestInfo.seatLocation,
          size: guestInfo.size,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        setredayToPrint(true);
        setsessionName(localStorage.getItem("sessionName"));
        const formatDate = () => {
          const date = new Date();
          return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        };
        setDate(formatDate);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The seat is reserved",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex gap-12 place-items-center justify-center duration-700 ease-in-out">
      <div className="flex flex-col gap-12 place-items-center justify-center bg-Secondary w-fit p-6 rounded-xl duration-700 ease-in-out">
        <div className="flex flex-col md:flex-row gap-12 place-items-center justify-center">
          <h2>Name: {guestInfo.name}</h2>
          <div className="flex gap-2">
            <h2>Seat: </h2>
            <input
              value={guestInfo.seatLocation.split(" ")[0]}
              className="rounded-xl text-center w-16"
              onChange={handleSeatLocationChange}
            />
          </div>
          <div className="flex gap-2">
            <h2>Size: </h2>
            <input
              value={guestInfo.size}
              className="rounded-xl text-center w-16"
              onChange={handleSizeChange}
            />
          </div>
          <button onClick={postGuestInfo}>register</button>
        </div>
        {redayToPrint ? (
          <>
            <ReactToPrint
              trigger={() => {
                return <button>Print</button>;
              }}
              content={() => componentRef.current}
            />
            <div ref={componentRef} className="flex gap-[320px] bg-white">
              <PrintGuestInfo
                name={guestInfo.name}
                seatLocation={guestInfo.seatLocation}
                size={guestInfo.size}
                barcode={guestInfo.barcode}
                sessionName={sessionName}
                date={date}
              />
              <PrintGuestInfo
                name={guestInfo.name}
                seatLocation={guestInfo.seatLocation}
                size={guestInfo.size}
                sessionName={sessionName}
                date={date}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GuestInfoRegistration;

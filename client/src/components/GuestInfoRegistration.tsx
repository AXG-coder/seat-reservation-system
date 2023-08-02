import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import PrintGuestInfo from "./PrintGuestInfo";
import ReactToPrint from "react-to-print";

interface Props {
  _id: string;
  name: string;
  seatLocation: string;
  PCS: number;
  size: number;
  barcode: number;
  Seq: number;
}

const GuestInfoRegistration: React.FC<Props> = (props) => {
  const [guestInfo, setGuestInfo] = useState<Props>(props);

  const [redayToPrint, setredayToPrint] = useState(false);

  const [sessionName, setsessionName] = useState<string | null>("");

  const [fromTO, setfromTO] = useState<string | null>("");

  const [date, setDate] = useState<string>("");

  const [confirm, setConfirm] = useState<boolean>(false);

  const componentRef = useRef<HTMLDivElement>(null);

  const luggageBarcodeRef = useRef<HTMLDivElement>(null);

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
  const handlePCSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setGuestInfo((prevGuestInfo) => ({
      ...prevGuestInfo,
      PCS: newValue,
    }));
  };

  const handleprintCounter = async () => {
    if (guestInfo.Seq === 0) {
      const res = await axios.post(
        "api/printConter",
        {
          sessionType: localStorage.getItem("sessionName"),
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        setGuestInfo((prevGuestInfo) => ({
          ...prevGuestInfo,
          Seq: res.data.printCounter,
        }));
        setsessionName(res.data.sessionType);
      }
    }
  };

  const postGuestInfo = async () => {
    try {
      const res = await axios.post(
        "api/editInfo",
        {
          _id: guestInfo._id,
          seatLocation: guestInfo.seatLocation,
          size: guestInfo.size,
          PCS: guestInfo.PCS,
          Seq: guestInfo.Seq,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        setredayToPrint(true);
        setfromTO(localStorage.getItem("fromTo"));
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

  const deleteAudience = async () => {
    try {
      const res = await axios.delete("api/deleteAudience", {
        headers: {
          key: localStorage.getItem("apiKey"),
          _id: guestInfo._id,
        },
      });

      if (res.status === 200) {
        Swal.fire("done", "guest has been deleted", "success");
        location.reload();
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
            <h2>PCS: </h2>
            <input
              value={guestInfo.PCS}
              className="rounded-xl text-center w-16"
              onChange={handlePCSChange}
            />
          </div>
          <div className="flex gap-2">
            <h2>WT: </h2>
            <input
              value={guestInfo.size}
              className="rounded-xl text-center w-16"
              onChange={handleSizeChange}
            />
          </div>
          {!confirm ? (
            <button
              onClick={() => {
                handleprintCounter(); // Wait for handleprintCounter() to finish
                setConfirm(true);
              }}
            >
              Register
            </button>
          ) : (
            <button
              onClick={() => {
                postGuestInfo(); // Wait for postGuestInfo() to finish
              }}
            >
              Confirm
            </button>
          )}

          <button className="bg-red-600" onClick={deleteAudience}>
            Delete
          </button>
        </div>
        {redayToPrint ? (
          <>
            <ReactToPrint
              trigger={() => {
                return <button>Print</button>;
              }}
              content={() => componentRef.current}
            />
            <div
              ref={componentRef}
              className="flex w-[755.91PX] justify-between bg-white"
            >
              <PrintGuestInfo
                name={guestInfo.name}
                seatLocation={guestInfo.seatLocation}
                size={guestInfo.size}
                barcode={guestInfo.barcode}
                sessionName={sessionName}
                date={date}
                PCS={guestInfo.PCS}
                fromTO={fromTO}
                BOARDINGPASS={"BOARDING PASS"}
                printCounter={guestInfo.Seq}
              />
              <PrintGuestInfo
                name={guestInfo.name}
                seatLocation={guestInfo.seatLocation}
                size={guestInfo.size}
                sessionName={sessionName}
                date={date}
                PCS={guestInfo.PCS}
                fromTO={fromTO}
                BOARDINGPASS={"BOARDING PASS"}
                printCounter={null}
              />
            </div>
            <ReactToPrint
              trigger={() => {
                return <button>Print</button>;
              }}
              content={() => luggageBarcodeRef.current}
            />
            <div
              ref={luggageBarcodeRef}
              className="bg-white flex flex-col justify-center "
            >
              <img
                src={`http://localhost:5000/barcode/${guestInfo.barcode}.png`}
                className="p-1 w-[188.98px] h-[75.59px]"
              />
              <img
                src={`http://localhost:5000/barcode/${guestInfo.barcode}.png`}
                className="p-1 w-[188.98px] h-[75.59px]"
              />
              <img
                src={`http://localhost:5000/barcode/${guestInfo.barcode}.png`}
                className="p-1 w-[188.98px] h-[75.59px]"
              />
              <div className="h-[1476.38px] flex place-items-center justify-center">
                <p className="text-black text-center rotate-90 text-4xl">
                  {fromTO}
                </p>
              </div>
              <PrintGuestInfo
                name={guestInfo.name}
                seatLocation={null}
                size={guestInfo.size}
                sessionName={sessionName}
                date={date}
                PCS={null}
                fromTO={fromTO}
                BOARDINGPASS={null}
                printCounter={guestInfo.Seq}
              />
              <div className="w-[100%] flex justify-center">
                <img
                  src={`http://localhost:5000/barcode/${guestInfo.barcode}.png`}
                  className=" w-[100.98px] h-[40.59px]"
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GuestInfoRegistration;

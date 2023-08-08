import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import GuestInfoRegistration from "./GuestInfoRegistration";
import PlaneSeat from "./PlaneSeat";

interface guestInfoiteIteam {
  _id: string;
  name: string;
  seatLocation: string;
  size: number;
  PCS: number;
  barcode: number;
  Seq: number;
}

interface Seat {
  location: string;
  reserved: boolean;
}

const GuestInfo = () => {
  const [guestName, setguestName] = useState("");

  const [guestSeq, setguestSeq] = useState("");

  const [viewInfo, setViewInfo] = useState(false);

  const [guestInfo, setGuestInfo] = useState<guestInfoiteIteam | undefined>();

  const [seats, setSeats] = useState<Seat[]>([]);

  const [openSeat, setOpenSeat] = useState<boolean>(false);

  const [namesSearch, setNameSearch] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("api/getAllAudienceForSearchEngine", {
        headers: {
          key: localStorage.getItem("apiKey"),
        },
      })
      .then((res) => {
        const names = res.data.map((item: { name: string }) => item.name);
        setNameSearch(names);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterName = namesSearch.filter((name) => {
    return name.toLocaleLowerCase().includes(guestName.toLocaleLowerCase());
  });

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
        "api/getOneOfAudienceForEditInfo",
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
        getSeat();
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

  const getSeat = async () => {
    try {
      const res = await axios.get("api/getSeatState", {
        headers: {
          key: localStorage.getItem("apiKey") || "",
        },
      });
      if (res.status === 200) {
        setSeats(res.data);
        setOpenSeat(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOneOfGuestBySeq = async () => {
    try {
      const res = await axios.post(
        "api/getOneOfAudienceForEditInfobySeq",
        {
          Seq: guestSeq,
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
        setguestSeq("");
        getSeat();
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
        <div className="flex justify-center place-items-center gap-10">
          <div className="flex flex-col  place-items-center justify-center">
            <div className="flex flex-col py-12 place-items-center justify-center gap-6">
              <div className="text-4xl">Enter PAX Name</div>
              <input
                type="text"
                id="apiKey"
                value={guestName}
                onChange={(e) => setguestName(e.target.value)}
                className="rounded-xl h-12 text-center"
              />
            </div>
            {guestName === "" ? null : (
              <div className="max-h-[300px] overflow-y-auto bg-Secondary p-2 rounded-lg ">
                {filterName.map((name) => (
                  <h2
                    key={name}
                    onClick={() => setguestName(name)}
                    className="text-end cursor-pointer mb-2"
                  >
                    {name}
                  </h2>
                ))}
              </div>
            )}
          </div>
          <h1>OR</h1>
          <div className="flex flex-col py-12 place-items-center justify-center gap-6">
            <div className="text-4xl">Enter Seq</div>
            <input
              type="text"
              id="apiKey"
              value={guestSeq}
              onChange={(e) => setguestSeq(e.target.value)}
              className="rounded-xl h-12 text-center"
            />
          </div>
        </div>
        <div className="flex gap-32">
          <button className="text-1xl" onClick={getOneOfGuest}>
            research
          </button>
          <h1>|</h1>
          <button className="text-1xl" onClick={getOneOfGuestBySeq}>
            research
          </button>
        </div>
      </div>
      {guestInfo !== undefined && viewInfo ? (
        <GuestInfoRegistration
          _id={guestInfo._id}
          name={guestInfo.name}
          seatLocation={guestInfo.seatLocation}
          size={guestInfo.size}
          barcode={guestInfo.barcode}
          PCS={guestInfo.PCS}
          Seq={guestInfo.Seq}
        />
      ) : null}
      {openSeat ? <PlaneSeat seats={seats} /> : null}
    </>
  );
};
export default GuestInfo;

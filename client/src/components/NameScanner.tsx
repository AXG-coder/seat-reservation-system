import axios from "axios";
import { useState, useEffect } from "react";
import GuestSearchViweBox from "./GuestSearchViweBox";

interface GuestInfo {
  name: string;
  seatLocation: string;
  gender: string;
  PCS: number;
  size: number;
  barcode: number;
}

const NameScanner = () => {
  const [sandName, setsandName] = useState<string>("");
  const [guestInfoArray, setGuestInfoArray] = useState<GuestInfo[]>([]);
  const [numberOfGuest, setNumberOfGuest] = useState<number>();
  const [numberOfGuestAccept, setNumberOfGuestAccept] = useState<number>();
  const [namesSearch, setNameSearch] = useState<string[]>([]);

  useEffect(() => {
    const savedGuestInfo = localStorage.getItem("guestInfoArray");
    if (savedGuestInfo) {
      setGuestInfoArray(JSON.parse(savedGuestInfo));
    }
  }, []);

  const postNameScanner = async () => {
    try {
      const res = await axios.post(
        "../api/getOneOfAudience",
        { name: sandName },
        { headers: { key: localStorage.getItem("apiKey") } }
      );

      if (res.status === 200) {
        const newGuestInfo = res.data;
        const updatedGuestInfoArray = [...guestInfoArray, newGuestInfo];
        setGuestInfoArray(updatedGuestInfoArray);
        localStorage.setItem(
          "guestInfoArray",
          JSON.stringify(updatedGuestInfoArray)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDetails = async (): Promise<void> => {
    try {
      const res = await axios.get("../api/getAllAudience", {
        headers: {
          key: localStorage.getItem("apiKey") || "",
        },
      });
      if (res.status === 200) {
        const data = res.data;
        const numberOfGuest =
          (data[0]?.[1]?.length || 0) +
          (data[1]?.[1]?.length || 0) +
          (data[2]?.[1]?.length || 0);
        setNumberOfGuest(numberOfGuest);
        setNumberOfGuestAccept(data[0]?.[1]?.length || 0);
      }
      console.log(numberOfGuest);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    axios
      .get("../api/getAllAudienceForSearchEngine", {
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
    return name.toLocaleLowerCase().includes(sandName.toLocaleLowerCase());
  });

  return (
    <div className="flex flex-col py-32 place-items-center justify-center gap-6">
      <div className="text-4xl">Enter guest name</div>
      <input
        type="text"
        id="apiKey"
        value={sandName}
        onChange={(e) => setsandName(e.target.value)}
        className="rounded-xl h-12 text-center"
      />
      {sandName === "" ? null : (
        <div className="max-h-[300px] overflow-y-auto bg-Secondary p-2 rounded-lg ">
          {filterName.map((name) => (
            <h2
              key={name}
              onClick={() => setsandName(name)}
              className="text-end cursor-pointer mb-2"
            >
              {name}
            </h2>
          ))}
        </div>
      )}
      <button
        className="text-1xl"
        onClick={() => {
          postNameScanner();
          getDetails();
        }}
      >
        Search
      </button>

      <h2 className="text-center p-6 text-2xl">
        Accept: {numberOfGuestAccept} Of {numberOfGuest}
      </h2>
      {guestInfoArray
        .slice()
        .reverse()
        .map((guestInfo, index) => (
          <GuestSearchViweBox
            key={index}
            name={guestInfo.name}
            gender={guestInfo.gender}
            seatLocation={guestInfo.seatLocation}
            size={guestInfo.size}
            barcode={guestInfo.barcode}
            PCS={guestInfo.PCS}
          />
        ))}
    </div>
  );
};

export default NameScanner;

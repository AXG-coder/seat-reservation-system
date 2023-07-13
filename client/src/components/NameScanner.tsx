import axios from "axios";
import { useState } from "react";
import GuestSearchViweBox from "./GuestSearchViweBox";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  name: string;
  seatLocation: string;
  size: number;
  barcode: number;
}

const NameScanner = () => {
  const [sandName, setsandName] = useState<string>("");
  const [guestInfo, setguestInfo] = useState<Props>();

  const postNameScanner = async () => {
    try {
      console.log(sandName);
      const res = await axios.post(
        "../api/getOneOfAudience",
        { name: sandName },
        { headers: { key: localStorage.getItem("apiKey") } }
      );
      if (res.status === 200) {
        setguestInfo(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col py-32 place-items-center justify-center gap-6">
        <div className="text-4xl">enter guset name</div>
        <input
          type="text"
          id="apiKey"
          value={sandName}
          onChange={(e) => setsandName(e.target.value)}
          className="rounded-xl h-12 text-center"
        />
        <button className="text-1xl" onClick={postNameScanner}>
          Search
        </button>
        {guestInfo ? (
          <GuestSearchViweBox
            name={guestInfo.name}
            seatLocation={guestInfo.seatLocation}
            size={guestInfo.size}
            barcode={guestInfo.barcode}
          />
        ) : null}
      </div>
    </>
  );
};
export default NameScanner;

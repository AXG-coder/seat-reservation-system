import axios from "axios";
import { useEffect, useState } from "react";
import useScanDetection from "use-scan-detection";
import GuestSearchViweBox from "./GuestSearchViweBox";

interface GuestInfo {
  name: string;
  seatLocation: string;
  PCS: number;
  size: number;
  barcode: number;
}

const BarcodeScanner = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [barcodescan, setBarcodescan] = useState<any>("");
  const [manualbarcode, setManualBarcode] = useState<string>("");
  const [guestInfoArray, setGuestInfoArray] = useState<GuestInfo[]>([]);
  const [numberOfGuest, setNumberOfGuest] = useState<number>();
  const [numberOfGuestAccept, setNumberOfGuestAccept] = useState<number>();

  useScanDetection({
    onComplete: setBarcodescan,
  });

  useEffect(() => {
    const savedGuestInfo = localStorage.getItem("guestInfoArray");
    if (savedGuestInfo) {
      setGuestInfoArray(JSON.parse(savedGuestInfo));
    }
  }, []);

  useEffect(() => {
    const getByBarcode = async () => {
      try {
        if (barcodescan) {
          const res = await axios.post(
            "../api/getOneOfAudienceByBarcode",
            {
              barcode: barcodescan,
            },
            {
              headers: {
                key: localStorage.getItem("apiKey"),
              },
            }
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    getByBarcode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodescan]);

  const postManualBarcode = async () => {
    try {
      const res = await axios.post(
        "../api/getOneOfAudienceByBarcode",
        { barcode: manualbarcode },
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

  return (
    <>
      <div className="flex flex-col pt-32 place-items-center justify-center gap-6">
        <div className="text-4xl">Enter guest barcode</div>
        <input
          type="text"
          id="apiKey"
          value={manualbarcode}
          onChange={(e) => setManualBarcode(e.target.value)}
          className="rounded-xl h-12 text-center"
        />
        <button
          className="text-1xl"
          onClick={() => {
            postManualBarcode();
            getDetails();
          }}
        >
          Search
        </button>
      </div>
      <h2 className="text-center p-6 text-2xl">
        Accept: {numberOfGuestAccept} Of {numberOfGuest}
      </h2>
      {guestInfoArray
        .slice()
        .reverse()
        .map((guestInfo, index) => (
          <div className="pt-6">
            <GuestSearchViweBox
              key={index}
              name={guestInfo.name}
              seatLocation={guestInfo.seatLocation}
              size={guestInfo.size}
              PCS={guestInfo.PCS}
              barcode={guestInfo.barcode}
            />
          </div>
        ))}
    </>
  );
};

export default BarcodeScanner;

import axios from "axios";
import { useEffect, useState } from "react";
import useScanDetection from "use-scan-detection";
import GuestSearchViweBox from "./GuestSearchViweBox";

interface Props {
  name: string;
  seatLocation: string;
  size: number;
  barcode: number;
}

const BarcodeScanner = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [barcodescan, setbarcodescan] = useState<any>();
  const [guestInfo, setguestInfo] = useState<Props>();
  useScanDetection({
    onComplete: setbarcodescan,
  });
  useEffect(() => {
    const getByBarcode = async () => {
      try {
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
          setguestInfo(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getByBarcode();
  }, [barcodescan, setbarcodescan]);

  return (
    <div className="p-16">
      {guestInfo ? (
        <GuestSearchViweBox
          name={guestInfo.name}
          seatLocation={guestInfo.seatLocation}
          size={guestInfo.size}
          barcode={guestInfo.barcode}
        />
      ) : null}
    </div>
  );
};
export default BarcodeScanner;

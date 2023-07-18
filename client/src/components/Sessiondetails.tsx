import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

interface Guest {
  name: string;
  seatLocation: string;
  PCS: number;
  size: number;
  barcode: number;
  state: string;
  gender: string;
}

interface Details {
  state: [string, Guest[]][];
}

const SessionDetails = () => {
  const [details, setDetails] = useState<Details>({ state: [] });
  const [totalPCS, setTotalPCS] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get("api/getAllAudience", {
          headers: {
            key: localStorage.getItem("apiKey") || "",
          },
        });
        if (res.status === 200) {
          setDetails({ state: res.data });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    };

    getDetails();
  }, []);

  useEffect(() => {
    let totalPCSCount = 0;
    let totalSizeCount = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    details.state.forEach(([_, guests]) => {
      guests.forEach((item) => {
        if (item.state === "Accept") {
          totalPCSCount += item.PCS;
          totalSizeCount += item.size;
        }
      });
    });

    setTotalPCS(totalPCSCount);
    setTotalSize(totalSizeCount);
  }, [details]);

  return (
    <div className="flex flex-col place-items-center justify-center pt-12 gap-8">
      <ReactToPrint
        trigger={() => {
          return <button>Print</button>;
        }}
        content={() => componentRef.current}
      />
      <div className="w-fit px-4 pb-4 bg-white" ref={componentRef}>
        <div className="flex gap-12">
          <h2 className="text-center text-2xl  text-black">
            {localStorage.getItem("sessionType")}
          </h2>
          <h2 className="text-center text-2xl  text-black">
            {localStorage.getItem("fromTo")}
          </h2>
          <h2 className="text-center text-2xl  text-black">
            {localStorage.getItem("sessionDate")}
          </h2>
        </div>
        {details.state.map(([state, guests]) => (
          <div key={state} className=" justify-center fle">
            <div className="flex flex-col">
              <h2 className="text-center text-2xl p-4 text-black">{state}</h2>
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>SeatLocation</th>
                    <th>PCS</th>
                    <th>WT</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((item, index) => (
                    <tr key={item.name} className="text-center">
                      <td>{index + 1}:</td>
                      <td>{item.name}</td>
                      <td>{item.gender}</td>
                      <td>{item.seatLocation}</td>
                      <td>{item.PCS}</td>
                      <td>{item.size} KG</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {state === "Accept" && (
                <div className="text-center flex justify-center gap-10 pt-5">
                  <p className="text-black">Total PCS: {totalPCS}</p>
                  <p className="text-black">Total WT: {totalSize} KG</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionDetails;

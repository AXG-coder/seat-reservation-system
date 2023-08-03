/* eslint-disable react-hooks/exhaustive-deps */
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

interface Gender {
  child: number;
  adult: number;
  infant: number;
}

const SessionDetails = () => {
  const [details, setDetails] = useState<Details>({ state: [] });
  const [totalPCS, setTotalPCS] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [missingtotalPCS, setMissingTotalPCS] = useState<number>(0);
  const [missingtotalSize, setMissingTotalSize] = useState<number>(0);
  const [AcceptGenderCounter, setAcceptGenderCounter] = useState<Gender>({
    child: 0,
    adult: 0,
    infant: 0,
  });
  const [MissingGenderCounter, setMissingGenderCounter] = useState<Gender>({
    child: 0,
    adult: 0,
    infant: 0,
  });

  const componentRef = useRef<HTMLDivElement>(null);

  const calculateChildrenCounts = (
    guests: Guest[],
    gender: string,
    state: string
  ): number => {
    let acceptedCount = 0;

    guests.forEach((guest) => {
      if (guest.gender === gender) {
        if (guest.state === state) {
          acceptedCount++;
        }
      }
    });

    return acceptedCount;
  };

  useEffect(() => {
    // Assuming 'details.state' contains the list of guests
    const guests = details.state.flatMap(([, guestArray]) => guestArray);

    // Calculate counts for 'Accept' and 'Missing' genders separately
    const acceptedChildCount = calculateChildrenCounts(
      guests,
      "child",
      "ACCEPTED"
    );
    const missingChildCount = calculateChildrenCounts(
      guests,
      "child",
      "NO SHOW ON THE GATE"
    );
    const acceptedAdultCount = calculateChildrenCounts(
      guests,
      "adult",
      "ACCEPTED"
    );
    const missingAdultCount = calculateChildrenCounts(
      guests,
      "adult",
      "NO SHOW ON THE GATE"
    );
    const acceptedInfantCount = calculateChildrenCounts(
      guests,
      "infant",
      "ACCEPTED"
    );
    const missingInfantCount = calculateChildrenCounts(
      guests,
      "infant",
      "NO SHOW ON THE GATE"
    );

    // Update the state variables accordingly
    setAcceptGenderCounter({
      child: acceptedChildCount,
      adult: acceptedAdultCount,
      infant: acceptedInfantCount,
    });

    setMissingGenderCounter({
      child: missingChildCount,
      adult: missingAdultCount,
      infant: missingInfantCount,
    });
  }, [details.state]);
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
    let missingtotalPCSCount = 0;
    let missingtotalSizeCount = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    details.state.forEach(([_, guests]) => {
      guests.forEach((item) => {
        if (item.state === "ACCEPTED") {
          totalPCSCount += item.PCS;
          totalSizeCount += item.size;
        }
        if (item.state === "NO SHOW ON THE GATE") {
          missingtotalPCSCount += item.PCS;
          missingtotalSizeCount += item.size;
        }
      });
    });

    setTotalPCS(totalPCSCount);
    setTotalSize(totalSizeCount);
    setMissingTotalPCS(missingtotalPCSCount);
    setMissingTotalSize(missingtotalSizeCount);
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
        <div className="flex gap-12 justify-between">
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
              {state === "NO SHOW ON THE GATE" && (
                <>
                  <div className="text-center flex justify-center gap-10 pt-5">
                    <p className="text-black">Total PCS: {missingtotalPCS}</p>
                    <p className="text-black">
                      Total WT: {missingtotalSize} KG
                    </p>
                    <p className="text-black">
                      Adult: {MissingGenderCounter.adult}
                    </p>
                    <p className="text-black">
                      Child: {MissingGenderCounter.child}
                    </p>

                    <p className="text-black">
                      Infant: {MissingGenderCounter.infant}
                    </p>
                  </div>
                </>
              )}
              {state === "ACCEPTED" && (
                <>
                  <div className="text-center flex justify-center gap-10 pt-5">
                    <p className="text-black">Total PCS: {totalPCS}</p>
                    <p className="text-black">Total WT: {totalSize} KG</p>

                    <p className="text-black">
                      Adult: {AcceptGenderCounter.adult}
                    </p>

                    <p className="text-black">
                      Child: {AcceptGenderCounter.child}
                    </p>

                    <p className="text-black">
                      Infant: {AcceptGenderCounter.infant}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionDetails;

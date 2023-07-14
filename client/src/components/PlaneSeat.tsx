import axios from "axios";
import React, { useEffect, useState } from "react";

interface Seat {
  location: string;
  reserved: boolean;
}

const PlaneSeat: React.FC<{ seats: Seat[] }> = ({ seats }) => {
  const [planeName, setPlaneName] = useState<string | undefined>();
  const [showSeat, setShowSeat] = useState<boolean>(false);

  useEffect(() => {
    const getSession = async () => {
      try {
        const apiKey = localStorage.getItem("apiKey") || "";
        const res = await axios.get<{ planeType: string }>(
          "api/IsThereASession",
          {
            headers: {
              key: apiKey,
            },
          }
        );

        setPlaneName(res.data.planeType);
      } catch (error) {
        console.error(error);
      }
    };

    getSession();
  }, []);

  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(http://localhost:5000/plane/img/${planeName}.png)`,
  };

  return (
    <div className="flex flex-col gap-12 place-items-center justify-center duration-700 ease-in-out m-7 bg-Secondary p-8 rounded-2xl">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div
          onClick={() => setShowSeat(!showSeat)}
          className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:main rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Show seat
        </span>
      </label>

      <div className="bg-gray-200 bg-cover w-[850px]" style={containerStyle}>
        <div className="plane-seat-grid pl-10 pt-10 pb-10">
          {seats.map((seat) => (
            <p key={seat.location} className="ml-[0.7px] mt-2 text-cyan-800">
              {seat.reserved ? (
                <img src="/closeRed.svg" alt="Reserved Seat" />
              ) : (
                <p
                  className={`${
                    showSeat ? "opacity-1" : "opacity-0"
                  } text-primary`}
                  key={seat.location}
                >
                  {seat.location}
                </p>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaneSeat;

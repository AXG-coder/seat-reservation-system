import axios from "axios";
import React, { useEffect, useState } from "react";

interface Seat {
  location: string;
  reserved: boolean;
}

const PlaneSeat: React.FC<{ seats: Seat[] }> = ({ seats }) => {
  const [planeName, setPlaneName] = useState<string>();

  useEffect(() => {
    const getSession = async () => {
      try {
        const apiKey = localStorage.getItem("apiKey");
        const res = await axios.get("api/IsThereASession", {
          headers: {
            key: apiKey || "",
          },
        });

        setPlaneName(res.data.planeType);
      } catch (error) {
        console.error(error);
      }
    };

    getSession();
  }, []);

  return (
    <>
      <div
        className={`bg-[url(http://localhost:5000/plane/img/${planeName}.png)]`}
      >
        <div className="grid grid-cols-12">
          {seats.map((seat) => (
            <p key={seat.location} className="">
              {seat.location}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlaneSeat;

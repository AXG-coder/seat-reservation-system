import React from "react";

interface Props {
  name: string;
  seatLocation: string;
  gender: string;
  PCS: number;
  size: number;
  barcode: number;
}

const GuestSearchViweBox: React.FC<Props> = (Props) => {
  return (
    <div className="flex gap-12 place-items-center justify-center duration-700 ease-in-out">
      <div className="flex flex-col gap-12 place-items-center justify-center bg-Secondary w-fit p-6 rounded-xl duration-700 ease-in-out">
        <div className="flex flex-col md:flex-row gap-12 place-items-center justify-center">
          <h2>Name: {Props.name}</h2>
          <h2>Seat: {Props.seatLocation}</h2>
          <h2>Gender: {Props.gender}</h2>
          <h2>PCS: {Props.PCS}</h2>
          <h2>WT: {Props.size}KG</h2>
          <h2>Barcode: {Props.barcode}</h2>
        </div>
      </div>
    </div>
  );
};
export default GuestSearchViweBox;

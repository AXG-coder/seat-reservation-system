interface Props {
  name: string;
  fromTO: string | null;
  seatLocation: string;
  size: number;
  PCS: number;
  barcode?: number;
  sessionName: string | null;
  date: string;
}

const PrintGuestInfo: React.FC<Props> = (Props) => {
  return (
    <div className="bg-white p-2 ">
      <h1 className="text-black text-2xl pb-2">BOARDING PASS</h1>
      <h2 className="text-black">AIRLINE: {Props.sessionName}</h2>
      <h2 className="text-black">FROM-TO: {Props.fromTO}</h2>
      <h2 className="text-black">NAME: {Props.name}</h2>
      <h2 className="text-black">SEAT: {Props.seatLocation}</h2>
      <h2 className="text-black">PCS: {Props.PCS}</h2>
      <h2 className="text-black">WT: {Props.size}KG</h2>
      <h2 className="text-black">DATE: {Props.date}</h2>
      {Props.barcode ? (
        <img
          src={`http://localhost:5000/barcode/${Props?.barcode}.png`}
          className="pt-5 pl-32"
        />
      ) : null}
    </div>
  );
};
export default PrintGuestInfo;

interface Props {
  name: string;
  seatLocation: string;
  size: number;
  barcode?: number;
  sessionName: string | null;
  date: string;
}

const PrintGuestInfo: React.FC<Props> = (Props) => {
  return (
    <div className="bg-white p-2 ">
      <h2 className="text-black">{Props.sessionName}</h2>
      <h2 className="text-black">Name: {Props.name}</h2>
      <h2 className="text-black">Seat: {Props.seatLocation}</h2>
      <h2 className="text-black">Size: {Props.size}KG</h2>
      <h2 className="text-black">date: {Props.date}</h2>
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

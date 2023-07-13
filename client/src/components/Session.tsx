import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type Props = {
  sessionType: string;
  date: string; //* we save as string because the date format is like this: 2023/7/10
  planeType: string;
};

const Session = (props: Props) => {
  const deleteSession = async () => {
    const apiKey = localStorage.getItem("apiKey");
    try {
      const res = await axios.delete("api/deleteSessionAndAudience", {
        headers: {
          key: apiKey,
        },
      });
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You don't have permission",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40 gap-5">
      <div className="text-4xl">Session Type: {props.sessionType}</div>
      <div className="text-2xl">{props.date}</div>
      <div className="text-2xl">{props.planeType}</div>
      <Link to="/Sessiondetails" className="Link  mt-12">
        Session Details
      </Link>
      <button className="text-2xl mt-12" onClick={deleteSession}>
        Delete Session
      </button>
    </div>
  );
};

export default Session;

import axios from "axios";
import { SetStateAction, useState } from "react";
import Swal from "sweetalert2";

const SesiionRegistration = () => {
  const [sessionName, setSessionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [planeType, setPlaneType] = useState("");

  const handleStartDateChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setStartDate(event.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ChangePlane = (e: any) => {
    setPlaneType(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (startDate === "" || sessionName === "" || planeType === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Out the Form",
      });
      return;
    }
    try {
      const res = await axios.post(
        "api/sessionRegistration",
        {
          sessionType: sessionName,
          date: formatDate(startDate) as string,
          planeType: planeType,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("sessionName", sessionName);
        window.location.reload();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You don't have permission",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center py-28">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 items-center justify-center"
      >
        <div className="text-3xl text-center">Session Type</div>
        <input
          type="text"
          onChange={(e) => setSessionName(e.target.value)}
          className="text-3xl rounded-xl h-12 text-center"
        />
        <div className="text-3xl text-center">Date</div>
        <input
          type="date"
          min={new Date().toISOString()}
          onChange={handleStartDateChange}
          className="text-center text-2xl rounded-xl h-10"
        />
        <select
          onChange={ChangePlane}
          name="plane"
          className="rounded text-2xl"
        >
          <option value="">select</option>
          <option value="plane737">plane737</option>
        </select>
        <button type="submit" className="Link ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SesiionRegistration;

import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const Registration = () => {
  const [guestName, setguestName] = useState<string>("");
  const [guestGender, setGuestGender] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Exceldata, setExceldata] = useState<any[] | null>(null);

  const postRegistration = async () => {
    if (guestName === "" || guestGender === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Out the Form",
      });
      return;
    }
    try {
      const res = await axios.post(
        "api/NameRegistration",
        {
          name: guestName,
          gender: guestGender,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        Swal.fire("done", "PAX has been registered", "success");
        setguestName("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You don't have permission or guest has been registered",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        setExceldata(parsedData.slice(1));
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const postRegistrationExcelData = async () => {
    if (!Exceldata) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Choose File",
      });
      return;
    }
    try {
      const res = await axios.post(
        "api/NameRegistrationUsingExcel",
        {
          excelData: Exceldata,
        },
        {
          headers: {
            key: localStorage.getItem("apiKey"),
          },
        }
      );
      if (res.status === 200) {
        Swal.fire("done", "PAXS has been registered", "success");
        setguestName("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
      });
    }
  };

  return (
    <div className="flex flex-col  place-items-center justify-center ">
      <div className="flex flex-col py-32 place-items-center justify-center gap-6">
        <div className="text-4xl">Register new PAX</div>
        <input
          type="text"
          id="apiKey"
          value={guestName}
          onChange={(e) => setguestName(e.target.value)}
          className="rounded-xl h-12 text-center"
        />
        <select
          onChange={(e) => setGuestGender(e.target.value)}
          name="plane"
          className="rounded text-2xl"
        >
          <option value="">Select Gender</option>
          <option value="adult">adult</option>
          <option value="child">child</option>
          <option value="infant">infant</option>
        </select>
        <button className="text-1xl" onClick={postRegistration}>
          Register
        </button>
      </div>
      <div className="felx flex-col  text-center ">
        <div className="text-4xl">Ecvel file</div>
        <input
          type="file"
          className="m-12"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        ></input>
        <button className="text-1xl" onClick={postRegistrationExcelData}>
          Register
        </button>
      </div>
    </div>
  );
};
export default Registration;

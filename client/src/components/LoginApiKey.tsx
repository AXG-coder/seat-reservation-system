import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const LoginApiKey: React.FC<Props> = () => {
  const [apiKey, setApiKey] = useState("");

  const saveApiKey = async () => {
    try {
      const res = await axios.get("api/validKey", {
        headers: {
          key: apiKey,
        },
      });
      if (res.status === 200) {
        localStorage.setItem("apiKey", apiKey);
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Not valid key",
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen place-items-center justify-center gap-6">
        <div className="text-4xl">Login API Key</div>
        <input
          type="password"
          id="apiKey"
          onChange={(e) => setApiKey(e.target.value)}
          className="rounded-xl h-12 text-center"
        />
        <button
          className="text-1xl"
          onClick={() => {
            saveApiKey();
          }}
        >
          Save API Key
        </button>
      </div>
    </>
  );
};

export default LoginApiKey;

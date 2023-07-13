import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import SesiionRegistration from "../components/SesiionRegistration";
import Session from "../components/Session";
import PropagateLoader from "react-spinners/PropagateLoader";
interface SessionData {
  sessionType: string;
  date: string;
  planeType: string;
}

const MainRoot = () => {
  const [session, setSession] = useState<SessionData | null>();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getSession = async () => {
      try {
        const apiKey = localStorage.getItem("apiKey");
        const res = await axios.get("api/IsThereASession", {
          headers: {
            key: apiKey,
          },
        });
        const json = res.data;
        localStorage.setItem("sessionType", res.data.sessionType);
        localStorage.setItem("sessionDate", res.data.date);
        setSession(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className=" flex h-[600px] place-items-center justify-center  ">
          <PropagateLoader size={40} color="#646cff" />
        </div>
      ) : session ? (
        <Session
          sessionType={session.sessionType}
          date={session.date}
          planeType={session.planeType}
        />
      ) : (
        <SesiionRegistration />
      )}
    </>
  );
};

export default MainRoot;

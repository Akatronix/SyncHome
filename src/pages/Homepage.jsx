import React, { useEffect, useState } from "react";
import DataBox from "../components/DataBox";
import ControlBox from "../components/ControlBox";
import SensorBox from "../components/SensorBox";
import getData from "@/utils/getData";
import validateToken from "@/utils/isTokenExpired";
import { useNavigate } from "react-router";

const Homepage = () => {
  const [sensor, setSonsor] = useState([]);
  const [control, setControl] = useState([
    [
      {
        _id: "67d4adea225dc98d78fae180",
        hour: "0",
        second: "0",
        mins: "0",
        current: "OFF",
        placeholder: "OFF",
        createdAt: "2025-03-14T22:30:02.980Z",
        updatedAt: "2025-03-14T23:39:07.555Z",
        __v: 0,
      },
      {
        _id: "67d4ae08283cfcc21015db7c",
        hour: "0",
        second: "0",
        mins: "0",
        current: "OFF",
        placeholder: "0",
        createdAt: "2025-03-14T22:30:32.794Z",
        updatedAt: "2025-03-14T22:30:32.794Z",
        __v: 0,
      },
      {
        _id: "67d4ae10283cfcc21015db7f",
        hour: "0",
        second: "0",
        mins: "0",
        current: "OFF",
        placeholder: "OFF",
        createdAt: "2025-03-14T22:30:40.653Z",
        updatedAt: "2025-03-14T22:30:40.653Z",
        __v: 0,
      },
      {
        _id: "67d4ae11283cfcc21015db82",
        hour: "0",
        second: "0",
        mins: "0",
        current: "OFF",
        placeholder: "OFF",
        createdAt: "2025-03-14T22:30:41.843Z",
        updatedAt: "2025-03-14T22:30:41.843Z",
        __v: 0,
      },
    ],
  ]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(async () => {
      const isValid = validateToken();
      if (!isValid) {
        navigate("/auth/login", { replace: true });
        return;
      }

      const data = await getData();
      if (!data) {
        setError("Error: failed to fetch data");
        return;
      }
      setSonsor(data.sensor[0]);
      setControl(data.control);

      error &&
        setTimeout(() => {
          setError("");
        }, 1000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className=" w-full h-[90vh] overflow-y-scroll custom-scrollbar pb-3">
        <p className="mb-3 text-red-500">{error}</p>
        <div className="md:flex items-start justify-between gap-2 w-full flex-wrap ">
          <DataBox data={sensor} />
          <SensorBox data={sensor} />
        </div>
        <div className="mt-3 flex items-start justify-start gap-2  flex-wrap">
          {control.map((item, index) => (
            <ControlBox key={index} item={item} uid={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;

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
      "_id": "67d9bfdf28f3b0912ba7c766",
      "hour": "100",
      "second": "35",
      "mins": "10",
      "current": "ON",
      "placeholder": "0",
      "createdAt": "2025-03-18T18:47:59.946Z",
      "updatedAt": "2025-03-18T19:11:18.001Z",
      "__v": 0
    },
    {
      "_id": "67d9c00228f3b0912ba7c769",
      "hour": "100",
      "second": "35",
      "mins": "10",
      "current": "ON",
      "placeholder": "0",
      "createdAt": "2025-03-18T18:48:34.671Z",
      "updatedAt": "2025-03-18T19:11:13.176Z",
      "__v": 0
    },
    {
      "_id": "67d9c00428f3b0912ba7c76c",
      "hour": "100",
      "second": "35",
      "mins": "10",
      "current": "ON",
      "placeholder": "0",
      "createdAt": "2025-03-18T18:48:36.843Z",
      "updatedAt": "2025-03-18T19:11:15.583Z",
      "__v": 0
    }
  ]
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

import React, { useState } from "react";
import { toast } from "sonner";

const Timmer = ({ setIsOpen, _myID }) => {
  const [timeValue, setTimeValue] = useState({
    hour: "",
    second: "",
    mins: "",
    current: "OFF",
    placeholder: "",
    peroid: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  async function handleControl() {
    const { hour, mins, placeholder, peroid } = timeValue;
    if (hour == "" || mins == "" || placeholder == "" || peroid == "") {
      toast("please make sure all the fields are not empty!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/socket/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: _myID, ...timeValue }),
        }
      );

      if (!response.ok) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTimeValue({
        hour: "",
        second: "",
        mins: "",
        current: "OFF",
        placeholder: "",
        peroid: "",
      });
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
        toast("Timer set successfully...");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log("Error updating data:", error);
      return null;
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full p-4  items-center  justify-between flex-wrap">
        <div className="w-full flex items-start gap-1">
          <div className="w-full">
            <p>H</p>
            <select
              className="py-2 px-4 flex-1 border-2 w-full  border-gray-200"
              value={timeValue.hour}
              onChange={(e) =>
                setTimeValue((prevalue) => ({
                  ...prevalue,
                  hour: e.target.value,
                }))
              }
            >
              <option></option>
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p>M</p>
            <select
              className="py-2 px-4 flex-1 w-full border-2 border-gray-200"
              value={timeValue.mins}
              onChange={(e) =>
                setTimeValue((prevalue) => ({
                  ...prevalue,
                  mins: e.target.value,
                }))
              }
            >
              <option></option>
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p>Period</p>
            <select
              className="py-2 px-4 flex-1 border-2 w-full  border-gray-200"
              value={timeValue.peroid}
              onChange={(e) =>
                setTimeValue((prevalue) => ({
                  ...prevalue,
                  peroid: e.target.value,
                }))
              }
            >
              <option></option>
              <option value="PM">PM</option>
              <option value="AM">AM</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <p>Action</p>
          <select
            value={timeValue.placeholder}
            onChange={(e) =>
              setTimeValue((prevalue) => ({
                ...prevalue,
                placeholder: e.target.value,
              }))
            }
            className="py-2 px-4 flex-1 border-2 w-full  border-gray-200"
          >
            <option></option>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>
        <button
          onClick={() => handleControl()}
          className="w-full md:flex-1 py-3 px-6 border-none md:ml-2  outline-none rounded-md my-3
          bg-[#44821b] hover:bg-lime-600
             hover:cursor-pointer text-white"
        >
          Set
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Timmer;

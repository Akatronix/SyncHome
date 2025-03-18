import { FaTemperatureLow } from "react-icons/fa";
import { PiFanFill } from "react-icons/pi";

const DataBox = ({ data }) => {
  const { fan, temp } = data;

  return (
    <div className="flex-1 rounded-md  px-6 my-3 md:my-0 text-white w-full h-full py-7 md:py-[50px] bg-teal-900">
      <div className="flex items-center justify-between gap-4 md:gap-0  flex-wrap md:pr-[100px] pr-0 md:pl-[20px] pl-0">
        <div>
          <p>
            <FaTemperatureLow
              className={`${
                Number(temp) > 36 ? "text-red-400 " : "text-blue-400"
              } text-3xl mb-1.5`}
            />
            <span className="text-gray-400">Temperature</span>
          </p>
          <p className="md:text-4xl text-lg font-bold">{temp} °C</p>
        </div>
        <div>
          <div>
            <PiFanFill className="text-3xl text-teal-300" />
            <p className="text-gray-400">Fan: {fan}</p>
            <p className="font-bold md:text-xl text-lg">
              {Number(fan) == 1 ? "ON" : "OFF"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBox;

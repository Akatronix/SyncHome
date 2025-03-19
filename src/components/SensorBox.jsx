import { IoSunny } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { BsFillCloudMoonFill } from "react-icons/bs";

const SensorBox = ({ data }) => {
  const { dayAndNight, flame } = data;
  return (
    <div className="flex-1 rounded-md py-7 md:py-[50px] px-6 my-3 md:my-0 text-white w-full h-full bg-teal-900">
      <div className="flex items-center justify-between gap-4 flex-wrap md:pr-[100px] pr-0 md:pl-[20px] pl-0">
        <div>
          <p>
            {Number(dayAndNight) == 1 ? (
              <BsFillCloudMoonFill className="text-zinc-400 text-4xl" />
            ) : (
              
              <IoSunny className="text-yellow-400 text-4xl" />
            )}

            <span className="text-gray-400 mt-1.5">value: {Number(dayAndNight) == 1 ? "0"  :  "1"}</span>
          </p>
          <p className="md:text-xl text-lg font-bold">
            {Number(dayAndNight) == 1 ? "Night" :  "Day"}
          </p>
        </div>
        <div>
          <p>
            <BsFire
              className={`${
                Number(flame) == 1 ? "text-gray-400": "text-red-500"
              } text-4xl`}
            />
            <span className="text-gray-400 mt-1.5">value: {Number(flame) == 1 ? "0"  :  "1"}</span>
          </p>
          <p className="md:text-xl text-lg font-bold">
            {Number(flame) == 1 ? "No flame"  :  "Flame"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorBox;

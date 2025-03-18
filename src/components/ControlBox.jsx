import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import updateData from "@/utils/postData";
import { toast } from "sonner";
import Timmer from "./Timmer";

const ControlBox = ({ item, uid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const names = ["Light", "Main Switch", "Door"];

  const handleControl = () => {
    setIsLoading(true);
    updateData({
      id: item._id,
      current: item.current == "ON" ? "OFF" : "ON",
    })
      .then((result) => {
        if (result) {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          toast(result.message);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="lg:w-[200px] ">
      <div className="md:w-[348px] w-full h-[200px] bg-teal-900 rounded-md p-2 text-white text-center relative">
        <div>
          <p className="text-xl my-2">{names[uid]}</p>
          {isLoading && (
            <p className="text-sm absolute top-1.5 left-1 pl-2">Loading...</p>
          )}
          <div>
            <button
              onClick={handleControl}
              className={`md:w-flex-1 w-[80%] py-3 px-6 border-none outline-none rounded-md my-3 ${
                item.current == "ON"
                  ? " bg-[#44821b] hover:bg-lime-600"
                  : " bg-[#18181b] hover:bg-[#27272b]"
              } hover:cursor-pointer text-white`}
            >
              {uid === 2
                ? item.current === "ON"
                  ? "OPEN"
                  : "CLOSED"
                : item.current}
            </button>

            <DialogTrigger asChild>
              <button
                onClick={() => setIsOpen(true)}
                className="md:flex-1 w-[80%] py-3 px-6 border-none outline-none rounded-md my-3 bg-[#44821b] hover:bg-lime-600 hover:cursor-pointer text-white"
              >
                Schedule
              </button>
            </DialogTrigger>
          </div>
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set the time</DialogTitle>
          <DialogDescription asChild>
            <span>
              <Timmer setIsOpen={setIsOpen} _myID={item._id} />
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ControlBox;

import { FaServer } from "react-icons/fa6";

export default function ServerLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-main">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0">
          <FaServer className={`w-full h-full  text-secondary animate-pulse`} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-secondary rounded-full animate-ping"></div>
        </div>
      </div>
      <p className={`text-sm font-medium  text-back`}>
        Checking server data...
      </p>
    </div>
  );
}

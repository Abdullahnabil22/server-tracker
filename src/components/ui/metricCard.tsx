import { CgCheck } from "react-icons/cg";
import { CiWarning } from "react-icons/ci";
import { FaX } from "react-icons/fa6";

interface MetricCardProps {
  label: string;
  value: number;
  unit?: string;
  showProgress?: boolean;
  icon?: React.ReactNode;
}

export function MetricCard({
  label,
  value,
  unit = "%",
  showProgress = true,
  icon,
}: MetricCardProps) {
  const getColorClass = (val: number) => {
    if (val >= 80) return "text-red-500";
    if (val >= 60) return "text-yellow-500";
    return "text-green-500";
  };

  const getProgressColor = (val: number) => {
    if (val >= 80) return "from-red-500 to-red-600";
    if (val >= 60) return "from-yellow-500 to-yellow-600";
    return "from-green-500 to-green-600";
  };

  const getBackgroundColor = (val: number) => {
    if (val >= 80) return "bg-red-50 border-red-200";
    if (val >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  const getStatusText = (val: number) => {
    if (val >= 80) return "Critical";
    if (val >= 60) return "Warning";
    return "Normal";
  };

  const getStatusIcon = (val: number) => {
    if (val >= 80) {
      return <FaX className="w-5 h-5 text-down" />;
    }
    if (val >= 60) {
      return <CiWarning className="w-5 h-5 text-degraded" />;
    }
    return <CgCheck className="w-5 h-5 text-up" />;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300  ${getBackgroundColor(
        value
      )}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>

      <div className="relative p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                  {icon}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-500">{getStatusText(value)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(value)}
            </div>
          </div>

          <div className="text-center">
            <p
              className={`text-4xl font-bold ${getColorClass(
                value
              )} transition-colors duration-300`}
            >
              {value.toFixed(1)}
              <span className="text-lg font-medium text-gray-600 ml-1">
                {unit}
              </span>
            </p>
          </div>

          {showProgress && (
            <div className="space-y-2">
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor(
                      value
                    )} rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${Math.min(value, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div
                  className="absolute top-0 h-3 w-0.5 bg-white shadow-sm"
                  style={{ left: `${Math.min(value, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">0{unit}</span>
                <span
                  className={`font-medium px-2 py-1 rounded-full text-xs ${getBackgroundColor(
                    value
                  )} ${getColorClass(value)}`}
                >
                  {getStatusText(value)}
                </span>
                <span className="text-gray-500">100{unit}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 w-16 h-16 ${getProgressColor(
          value
        )} opacity-10 rounded-bl-full`}
      ></div>
    </div>
  );
}

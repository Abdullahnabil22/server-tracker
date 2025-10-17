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
    if (val >= 80) return "text-down-dark";
    if (val >= 60) return "text-degraded-dark";
    return "text-up-dark";
  };

  const getProgressColor = (val: number) => {
    if (val >= 80) return "from-down to-down-dark";
    if (val >= 60) return "from-degraded to-degraded-dark";
    return "from-up to-up-dark";
  };

  const getBackgroundColor = (val: number) => {
    if (val >= 80) return "bg-down-light border-border";
    if (val >= 60) return "bg-degraded-light border-border";
    return "bg-up-light border-border";
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
                <p className="text-sm font-semibold text-card-foreground">
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getStatusText(value)}
                </p>
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
              <span className="text-lg font-medium text-muted-foreground ml-1">
                {unit}
              </span>
            </p>
          </div>

          {showProgress && (
            <div className="space-y-2">
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
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
                <span className="text-muted-foreground">0{unit}</span>
                <span
                  className={`font-medium px-2 py-1 rounded-full text-xs ${getBackgroundColor(
                    value
                  )} ${getColorClass(value)}`}
                >
                  {getStatusText(value)}
                </span>
                <span className="text-muted-foreground">100{unit}</span>
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

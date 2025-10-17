export default function Card({
  title,
  number,
  bgColor,
  icon,
  subTitle,
}: {
  title: string;
  number: number;
  bgColor: string;
  icon?: React.ReactNode;
  subTitle?: string;
}) {
  return (
    <div className="relative text-text-main flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-overlay backdrop-blur-sm border-border">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{Math.round(number || 0)}</p>
            <p className="text-xs mt-1">{subTitle}</p>
          </div>
          {icon && (
            <div
              className={`h-12 w-12 rounded-full ${bgColor} flex items-center justify-center`}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

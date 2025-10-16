export default function SkeletonLoader({ num = 12 }: { num?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-main min-h-screen p-10">
      {[...Array(num)].map((_, i) => (
        <div
          key={i}
          className={` bg-slate-900 border-slate-800  border rounded-xl p-4 h-50`}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className={`h-4  bg-slate-800 rounded animate-pulse w-1/3`}
            ></div>
            <div
              className={`h-6 bg-slate-800 rounded-full animate-pulse w-16`}
            ></div>
          </div>
          <div className="space-y-2">
            <div
              className={`h-3 bg-slate-800 rounded animate-pulse w-full`}
            ></div>
            <div
              className={`h-3 bg-slate-800 rounded animate-pulse w-2/3`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const CouponModalSkeleton = () => {
  return (
    <div className="animate-pulse px-4">
      <div className="flex gap-2">
        <div className="h-16 w-16 rounded-full bg-gray-300"></div>
        <div>
          <div className="mb-[11px] flex gap-2">
            <div className="h-6 w-12 rounded bg-gray-300"></div>
            <div className="h-6 w-12 rounded bg-gray-300"></div>
          </div>
          <div className="h-5 w-48 rounded bg-gray-300"></div>
        </div>
      </div>

      <div className="mt-8 mb-10 flex h-[50px] w-full">
        <div className="flex-1 rounded-l-full bg-gray-300"></div>
        <div className="w-[105px] rounded-r-full bg-gray-400"></div>
      </div>

      <div className="bg-loyal-gray-5 h-[170px] p-4">
        <div className="mb-[11px] h-4 w-24 rounded bg-gray-300"></div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-300"></div>
          <div className="h-3 w-5/6 rounded bg-gray-300"></div>
          <div className="h-3 w-4/5 rounded bg-gray-300"></div>
          <div className="h-3 w-full rounded bg-gray-300"></div>
          <div className="h-3 w-3/4 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

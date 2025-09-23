export const CouponCardSkeleton = () => {
  return (
    <div className="h-(--loyal-card-height) w-(--loyal-card-width) animate-pulse overflow-hidden rounded-2xl bg-white p-6 shadow-(--loyal-shadow-card)">
      <div className="flex items-center gap-2">
        <div className="bg-loyal-gray-2 h-12 w-12 rounded-full"></div>
        <div className="flex flex-col gap-1">
          <div className="bg-loyal-gray-2 h-6 w-16 rounded"></div>
          <div className="bg-loyal-gray-2 h-6 w-14 rounded"></div>
        </div>
      </div>

      <hr className="my-4 border-2 border-dashed border-gray-300" />

      <div>
        <div className="bg-loyal-gray-2 h-5 w-full rounded"></div>
      </div>
    </div>
  )
}

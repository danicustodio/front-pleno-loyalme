interface CouponBadgeProps {
  value: string
}

export const CouponBadge = ({ value }: CouponBadgeProps) => {
  return (
    <span className="border-loyal-red text-loyal-red inline-block w-fit rounded-[14px] border px-3 py-2 text-xs leading-[11px] font-bold">
      {value}
    </span>
  )
}

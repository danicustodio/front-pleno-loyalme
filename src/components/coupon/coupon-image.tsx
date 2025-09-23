import Image, { ImageProps } from 'next/image'

export const CouponImage = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      width={80}
      height={80}
      className="border-loyal-gray-2 h-20 w-20 rounded-full border-[0.5px] object-cover shadow-(--loyal-shadow-image)"
      {...props}
    />
  )
}

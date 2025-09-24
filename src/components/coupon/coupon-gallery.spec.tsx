import { describe, vi, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { CouponGallery } from './coupon-gallery'
import { Coupon } from '@/types/coupon'
import { type CouponModalProps } from './coupon-modal'

const mockUseGetCoupons = vi.fn()
vi.mock('@/hooks/use-get-coupons', () => ({
  useGetCoupons: () => mockUseGetCoupons(),
}))

vi.mock('./coupon-card', () => ({
  CouponCard: ({
    coupon,
    onClick,
  }: {
    coupon: Coupon
    onClick: () => void
  }) => (
    <div data-testid={`coupon-card-${coupon.id}`} onClick={onClick}>
      {coupon.title}
    </div>
  ),
}))

vi.mock('./coupon-card-skeleton', () => ({
  CouponCardSkeleton: () => <div data-testid="coupon-skeleton">Loading...</div>,
}))

vi.mock('./coupon-modal', () => ({
  CouponModal: ({ isOpen, onClose, coupon }: CouponModalProps) =>
    isOpen ? (
      <div data-testid="coupon-modal">
        <div>Modal for {coupon.title}</div>
        <button onClick={onClose} data-testid="close-modal">
          Close
        </button>
      </div>
    ) : null,
}))

describe('CouponGallery', () => {
  const mockCoupons: Coupon[] = [
    {
      id: 1,
      slug: 'coupon-1',
      title: 'Test Coupon 1',
      image: 'https://example.com/coupon1.jpg',
      rules: 'Test rules 1',
      cashback: '5% cashback',
      discount: null,
    },
    {
      id: 2,
      slug: 'coupon-2',
      title: 'Test Coupon 2',
      image: 'https://example.com/coupon2.jpg',
      rules: 'Test rules 2',
      cashback: null,
      discount: '10% off',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders coupon cards when data is loaded successfully', () => {
    mockUseGetCoupons.mockReturnValue({
      data: mockCoupons,
      isLoading: false,
      error: null,
    })

    render(<CouponGallery />)

    expect(screen.getByTestId('coupon-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('coupon-card-2')).toBeInTheDocument()
    expect(screen.getByText('Test Coupon 1')).toBeInTheDocument()
    expect(screen.getByText('Test Coupon 2')).toBeInTheDocument()
  })

  it('renders loading skeleton when data is loading', () => {
    mockUseGetCoupons.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    })

    render(<CouponGallery />)

    const skeletons = screen.getAllByTestId('coupon-skeleton')
    expect(skeletons).toHaveLength(4)
  })

  it('renders error message when there is an error', () => {
    const errorMessage = 'Failed to load coupons'
    mockUseGetCoupons.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error(errorMessage),
    })

    render(<CouponGallery />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500')
  })

  it('opens modal when coupon card is clicked', () => {
    mockUseGetCoupons.mockReturnValue({
      data: mockCoupons,
      isLoading: false,
      error: null,
    })

    render(<CouponGallery />)

    fireEvent.click(screen.getByTestId('coupon-card-1'))

    expect(screen.getByTestId('coupon-modal')).toBeInTheDocument()
    expect(screen.getByText('Modal for Test Coupon 1')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', () => {
    mockUseGetCoupons.mockReturnValue({
      data: mockCoupons,
      isLoading: false,
      error: null,
    })

    render(<CouponGallery />)

    fireEvent.click(screen.getByTestId('coupon-card-1'))
    expect(screen.getByTestId('coupon-modal')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('close-modal'))
    expect(screen.queryByTestId('coupon-modal')).not.toBeInTheDocument()
  })
})

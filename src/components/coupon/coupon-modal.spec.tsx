import { describe, vi, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { CouponModal } from './coupon-modal'
import { Coupon, CouponDetails } from '@/types/coupon'
import { ModalProps } from '../ui/modal'

const mockUseGetCouponDetails = vi.fn()
vi.mock('@/hooks/use-get-coupon-details', () => ({
  useGetCouponDetails: () => mockUseGetCouponDetails(),
}))

vi.mock('./coupon-image', () => ({
  CouponImage: ({ alt, src }: { alt: string; src: string }) => (
    <img data-testid="coupon-image" alt={alt} src={src} />
  ),
}))

vi.mock('./coupon-badge', () => ({
  CouponBadge: ({ value }: { value: string }) => (
    <div data-testid="coupon-badge">{value}</div>
  ),
}))

vi.mock('./coupon-modal-skeleton', () => ({
  CouponModalSkeleton: () => (
    <div data-testid="coupon-modal-skeleton">Loading...</div>
  ),
}))

vi.mock('@/components/ui/modal', () => ({
  Modal: ({ isOpen, onClose, children }: ModalProps) => (
    <div data-testid="modal" data-is-open={isOpen}>
      <button data-testid="modal-close" onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  ),
}))

vi.mock('@/components/ui/modal-error', () => ({
  ModalError: ({ message }: { message: string }) => (
    <div data-testid="modal-error">{message}</div>
  ),
}))

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

describe('CouponModal', () => {
  const mockCoupon: Coupon = {
    id: 1,
    slug: 'test-coupon',
    title: 'Test Coupon',
    image: 'https://example.com/coupon.jpg',
    rules: 'Test rules',
    cashback: '5% cashback',
    discount: null,
  }

  const mockCouponDetails: CouponDetails = {
    id: 1,
    slug: 'test-coupon',
    title: 'Test Coupon Details',
    image: 'https://example.com/coupon-details.jpg',
    rules: 'Detailed test rules',
    cashback: '5% cashback',
    discount: null,
    code: 'TESTCODE123',
  }

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    coupon: mockCoupon,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders loading skeleton when data is loading', () => {
    mockUseGetCouponDetails.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    render(<CouponModal {...defaultProps} />)

    expect(screen.getByTestId('coupon-modal-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-error')).not.toBeInTheDocument()
  })

  it('renders error message when there is an error', () => {
    const errorMessage = 'Failed to load coupon details'
    mockUseGetCouponDetails.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
    })

    render(<CouponModal {...defaultProps} />)

    expect(screen.getByTestId('modal-error')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(
      screen.queryByTestId('coupon-modal-skeleton')
    ).not.toBeInTheDocument()
  })

  it('renders coupon details when data loads successfully', () => {
    mockUseGetCouponDetails.mockReturnValue({
      data: mockCouponDetails,
      isLoading: false,
      error: null,
    })

    render(<CouponModal {...defaultProps} />)

    expect(screen.getByTestId('coupon-image')).toBeInTheDocument()
    expect(screen.getByText(mockCouponDetails.title)).toBeInTheDocument()
    expect(screen.getByText(mockCouponDetails.code)).toBeInTheDocument()
    expect(screen.getByText(mockCouponDetails.rules)).toBeInTheDocument()
    expect(
      screen.queryByTestId('coupon-modal-skeleton')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('modal-error')).not.toBeInTheDocument()
  })

  it('copies coupon code to clipboard when copy button is clicked', () => {
    mockUseGetCouponDetails.mockReturnValue({
      data: mockCouponDetails,
      isLoading: false,
      error: null,
    })

    render(<CouponModal {...defaultProps} />)

    const copyButton = screen.getByText('copiar e ir para a loja')
    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockCouponDetails.code
    )
  })
})

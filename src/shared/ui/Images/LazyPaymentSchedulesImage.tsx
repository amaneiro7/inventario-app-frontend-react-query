import { memo } from 'react'
// 2025
import ImgMobileWebp2025 from '@/shared/assets/payment-schedules-2025-movil.webp'
import ImgMobileJpg2025 from '@/shared/assets/payment-schedules-2025-movil.jpg'
import ImgTabletWebp2025 from '@/shared/assets/payment-schedules-2025-tablet.webp'
import ImgTabletJpg2025 from '@/shared/assets/payment-schedules-2025-tablet.jpg'
import ImgLaptopWebp2025 from '@/shared/assets/payment-schedules-2025-laptops.webp'
import ImgLaptopJpg2025 from '@/shared/assets/payment-schedules-2025-laptops.jpg'
import ImgDesktopWebp2025 from '@/shared/assets/payment-schedules-2025-desktop.webp'
import ImgDesktopJpg2025 from '@/shared/assets/payment-schedules-2025-desktop.jpg'
// 2026
import ImgMobileWebp2026 from '@/shared/assets/payment-schedules-2026-movil.webp'
import ImgMobileJpg2026 from '@/shared/assets/payment-schedules-2026-movil.jpg'
import ImgTabletWebp2026 from '@/shared/assets/payment-schedules-2026-tablet.webp'
import ImgTabletJpg2026 from '@/shared/assets/payment-schedules-2026-tablet.jpg'
import ImgLaptopWebp2026 from '@/shared/assets/payment-schedules-2026-laptops.webp'
import ImgLaptopJpg2026 from '@/shared/assets/payment-schedules-2026-laptops.jpg'
import ImgDesktopWebp2026 from '@/shared/assets/payment-schedules-2026-desktop.webp'
import ImgDesktopJpg2026 from '@/shared/assets/payment-schedules-2026-desktop.jpg'

type Props = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
> & {
	year?: number
}

const SCHEDULES: Record<number, any> = {
	2025: {
		mobileWebp: ImgMobileWebp2025,
		mobileJpg: ImgMobileJpg2025,
		tabletWebp: ImgTabletWebp2025,
		tabletJpg: ImgTabletJpg2025,
		laptopWebp: ImgLaptopWebp2025,
		laptopJpg: ImgLaptopJpg2025,
		desktopWebp: ImgDesktopWebp2025,
		desktopJpg: ImgDesktopJpg2025
	},
	2026: {
		mobileWebp: ImgMobileWebp2026,
		mobileJpg: ImgMobileJpg2026,
		tabletWebp: ImgTabletWebp2026,
		tabletJpg: ImgTabletJpg2026,
		laptopWebp: ImgLaptopWebp2026,
		laptopJpg: ImgLaptopJpg2026,
		desktopWebp: ImgDesktopWebp2026,
		desktopJpg: ImgDesktopJpg2026
	}
}

export const LazyPaymentSchedulesImage = memo(({ year, ...props }: Props) => {
	const targetYear = year ?? new Date().getFullYear()
	const images = SCHEDULES[targetYear] ?? SCHEDULES[2024]

	return (
		<figure>
			<picture>
				{/* Mobile */}
				<source media="(max-width: 600px)" srcSet={images.mobileWebp} type="image/webp" />
				<source media="(max-width: 600px)" srcSet={images.mobileJpg} type="image/jpeg" />
				<source media="(max-width: 960px)" srcSet={images.tabletWebp} type="image/webp" />
				<source media="(max-width: 960px)" srcSet={images.tabletJpg} type="image/jpeg" />
				<source media="(max-width: 1024px)" srcSet={images.laptopWebp} type="image/webp" />
				<source media="(max-width: 1024px)" srcSet={images.laptopJpg} type="image/jpeg" />
				<source srcSet={images.desktopWebp} type="image/webp" />
				<img
					{...props}
					src={images.desktopJpg}
					className="mx-auto aspect-video object-center"
					alt="Calendarios de pagos, dias de fiestas y bancarios"
					loading="lazy"
				/>
			</picture>
		</figure>
	)
})

LazyPaymentSchedulesImage.displayName = 'LazyPaymentSchedulesImage'

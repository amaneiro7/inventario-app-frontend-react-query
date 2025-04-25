import { memo } from 'react'
import ImgMobileWebp from '@/assets/payment-schedules-movil.webp'
import ImgMobileJpg from '@/assets/payment-schedules-movil.jpg'
import ImgTabletWebp from '@/assets/payment-schedules-tablet.webp'
import ImgTabletJpg from '@/assets/payment-schedules-tablet.jpg'
import ImgLaptopWebp from '@/assets/payment-schedules-laptops.webp'
import ImgLaptopJpg from '@/assets/payment-schedules-laptops.jpg'
import ImgDesktopWebp from '@/assets/payment-schedules-desktop.webp'
import ImgDesktopJpg from '@/assets/payment-schedules-desktop.jpg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const LazyPaymentSchedulesImage = memo(({ ...props }: Props) => {
	return (
		<figure>
			<picture>
				{/* Mobile */}
				<source media="(max-width: 600px)" srcSet={ImgMobileWebp} type="image/webp" />
				<source media="(max-width: 600px)" srcSet={ImgMobileJpg} type="image/jpeg" />
				<source media="(max-width: 960px)" srcSet={ImgTabletWebp} type="image/webp" />
				<source media="(max-width: 960px)" srcSet={ImgTabletJpg} type="image/jpeg" />
				<source media="(max-width: 1024px)" srcSet={ImgLaptopWebp} type="image/webp" />
				<source media="(max-width: 1024px)" srcSet={ImgLaptopJpg} type="image/jpeg" />
				<source srcSet={ImgDesktopWebp} type="image/webp" />
				<img
					{...props}
					src={ImgDesktopJpg}
					className="mx-auto aspect-video object-center"
					alt="Calendarios de pagos, dias de fiestas y bancarios"
					loading="lazy"
				/>
			</picture>
		</figure>
	)
})

LazyPaymentSchedulesImage.displayName = 'LazyPaymentSchedulesImage'

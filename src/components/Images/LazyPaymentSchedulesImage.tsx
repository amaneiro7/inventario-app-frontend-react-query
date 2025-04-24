import Img from '@/assets/paymentSchedules.jpg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LazyPaymentSchedulesImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Calendarios de pagos, dias de fiestas y bancarios" />
}

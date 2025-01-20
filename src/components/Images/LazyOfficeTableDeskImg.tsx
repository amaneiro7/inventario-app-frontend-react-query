import Img from "@/assets/inventarybox.jpg"

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LazyOfficeTableDeskImg({ ...props }: Props) {
  return <img {...props} src={Img} alt='picture of a office desk' />
}

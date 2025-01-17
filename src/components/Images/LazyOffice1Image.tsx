import Img from "../../../assets/office1.webp";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyOfficeImage({...props}: Props) {
  return <img {...props} src={Img} alt='Imagen de oficina Mac Apple' />;
}

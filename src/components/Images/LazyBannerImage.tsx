import Img from "../../../assets/banner.webp";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyBannerImage({...props}: Props) {
  return <img {...props} src={Img} alt='Banner Imag' />;
}

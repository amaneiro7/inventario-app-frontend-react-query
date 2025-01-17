import Img from "../../../assets/codescreen.jpg";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyCodeScrenImage({...props}: Props) {
  return <img {...props} src={Img} alt='Laptop Code Screen' />;
}

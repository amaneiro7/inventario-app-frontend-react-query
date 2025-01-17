import Img from "../../../assets/inventarybox.jpg";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyInventroyBoxes({...props}: Props) {
  return <img {...props} src={Img} alt='so many inventory boxes'  />;
}

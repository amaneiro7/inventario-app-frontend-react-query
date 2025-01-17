import Img from "../../../assets/officetabletdesk.jpg";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyOfficeTableDeskImg({...props}: Props) {
  return <img {...props} src={Img} alt='picture of a office desk' />;
}

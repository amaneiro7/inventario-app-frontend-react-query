import Img from "@/assets/notfound.png";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LazyNotFoundImage({ ...props }: Props) {
  return <img {...props} src={Img} alt='draw someone lost in a labyrinth' />;
}

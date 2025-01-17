import Img from "../../../assets/officenotebookdesk.jpg";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyOfficeNotebookImage({...props}: Props) {
  return <img {...props} src={Img} alt='office table with a notebook and pencil' />;
}

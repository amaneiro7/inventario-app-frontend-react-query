import Img from '@/shared/assets/officenotebookdesk.jpg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LazyOfficeNotebookImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="office table with a notebook and pencil" />
}

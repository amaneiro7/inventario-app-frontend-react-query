export type Props = SusccessProps | LoadingProps | ErrorProps

interface SusccessProps {
	type: 'success'
	message: string
}
interface ErrorProps {
	type: 'error'
	message: string
}
interface LoadingProps {
	type: 'loading'
	message?: string
}

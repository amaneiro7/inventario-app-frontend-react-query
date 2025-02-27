import { useEffect, useRef } from 'react'

interface Props
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onInputChange: (value: string) => void
	open?: boolean
}
export function SearchBar({ id, value, onInputChange, open }: Props) {
	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (open && inputRef.current) {
			inputRef.current.focus()
		}
	}, [open])
	return (
		<div className="sticky top-0 bg-white flex items-center border-b px-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="mr-2 h-4 w-4 shrink-0 opacity-50"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<path d="m21 21-4.3-4.3"></path>
			</svg>
			<input
				className="flex w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-9"
				placeholder="Buscar"
				autoFocus
				ref={inputRef}
				autoComplete="off"
				autoCorrect="off"
				spellCheck="false"
				aria-autocomplete="list"
				role="combobox"
				aria-expanded="true"
				aria-controls={id}
				aria-labelledby={id}
				id={id}
				type="search"
				value={value}
				onChange={e => onInputChange(e.target.value)}
			/>
		</div>
	)
}

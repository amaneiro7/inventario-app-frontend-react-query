interface Props
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onInputChange: React.ChangeEventHandler<HTMLInputElement>
}
export function SearchBar({ id, value, onInputChange, ref }: Props) {
	return (
		<div className="flex items-center border-b px-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				className="mr-2 h-4 w-4 shrink-0 opacity-50"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<path d="m21 21-4.3-4.3"></path>
			</svg>
			<input
				className="flex w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-9"
				placeholder="Buscar"
				autoFocus
				ref={ref}
				autoComplete="off"
				autoCorrect="off"
				spellCheck="false"
				aria-autocomplete="list"
				role="combobox"
				aria-expanded="true"
				aria-controls={id}
				aria-labelledby={id}
				id={id}
				type="text"
				value={value}
				onChange={onInputChange}
			/>
		</div>
	)
}

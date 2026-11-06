import { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { Input } from '@/shared/ui/Input/Input'
import { SearchButton } from '@/shared/ui/Button/SearchButton'

type EmployeeSignatureSearchProps = {
	value: string
	isLoading: boolean
	handleChange: (value: string) => void
	handleSearch: () => Promise<void>
}

export const EmployeeSignatureSearch = memo(
	({ value, isLoading, handleChange, handleSearch }: EmployeeSignatureSearchProps) => {
		const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			if (!value.trim() || isLoading) return
			handleSearch()
		}
		return (
			<form
				onSubmit={onSubmit}
				className="relative flex h-16 w-full items-end md:max-w-sm lg:max-w-md"
			>
				<Typography className="mt-3 self-start pr-2" variant="p" color="gris">
					Buscar:
				</Typography>
				<Input
					id="signature-search-identifier"
					label="Usuario o Código"
					name="identifier"
					required
					transform
					placeholder="Ej: mfernandez o 12345"
					value={value}
					disabled={isLoading}
					onChange={e => handleChange(e.target.value)}
				/>
				<SearchButton
					title="Buscar empleado"
					isDisabled={!value.trim() || isLoading}
					type="submit"
				/>
			</form>
		)
	}
)

EmployeeSignatureSearch.displayName = 'EmployeeSignatureSearch'

import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Typography from '@/shared/ui/Typography'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

export function EmployeeRenderOption<O>({
	option,
	inputValue
}: {
	option: O
	inputValue?: string
}) {
	const opt = option as unknown as EmployeeDto
	const matches = match(opt.userName, inputValue ?? '', {
		insideWords: true
	})
	const parts = parse(opt.userName, matches).map((part, index) => ({
		...part,
		id: index
	}))
	const fullName = `${opt?.name ? opt?.name : ''} ${opt?.lastName ? opt?.lastName : ''}`
	const fullNameMatch = match(fullName, inputValue ?? '', {
		insideWords: true
	})
	const fullNameParts = parse(fullName, fullNameMatch).map((part, index) => ({
		...part,
		id: index
	}))
	return (
		<div>
			<Typography variant="p">
				{parts.map(part => (
					<Typography
						key={part.id}
						variant="span"
						option="tiny"
						transform="uppercase"
						weight={part.highlight ? 'bold' : 'light'}
					>
						{part.text}
					</Typography>
				))}
			</Typography>
			<Typography variant="p" color={'gris'}>
				{fullNameParts.map(part => (
					<Typography
						key={part.id}
						variant="span"
						weight={part.highlight ? 'extrabold' : 'light'}
					>
						{part.text}
					</Typography>
				))}
			</Typography>
		</div>
	)
}

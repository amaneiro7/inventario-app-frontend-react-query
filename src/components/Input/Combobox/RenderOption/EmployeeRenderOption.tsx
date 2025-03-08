import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Typography from '@/components/Typography'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

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
	const parts = parse(opt.userName, matches)
	const fullName = `${opt?.name ? opt?.name : ''} ${opt?.lastName ? opt?.lastName : ''}`
	const fullNameMatch = match(fullName, inputValue ?? '', {
		insideWords: true
	})
	const fullNameParts = parse(fullName, fullNameMatch)
	return (
		<div>
			<Typography variant="p">
				{parts.map((part, index) => (
					<Typography
						key={index}
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
				{fullNameParts.map((part, index) => (
					<Typography
						key={index}
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

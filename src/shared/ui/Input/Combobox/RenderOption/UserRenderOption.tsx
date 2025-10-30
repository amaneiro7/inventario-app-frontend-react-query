import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Typography from '@/shared/ui/Typography'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'

export function UserRenderOption<O>({ option, inputValue }: { option: O; inputValue?: string }) {
	const opt = option as unknown as LoginUserDto
	const matches = match(opt?.employee?.userName, inputValue ?? '', {
		insideWords: true
	})
	const parts = parse(opt?.employee?.userName, matches)
	const fullName = `${opt?.employee?.name ? opt?.employee?.name : ''} ${opt?.employee?.lastName ? opt?.employee?.lastName : ''}`
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

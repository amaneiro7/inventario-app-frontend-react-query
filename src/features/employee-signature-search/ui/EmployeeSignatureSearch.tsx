import { memo } from 'react'
import { SearchInput } from '@/shared/ui/Input/Search'
import { EmployeeRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/EmployeeRenderOption'
import { useEmployeeSearch } from '../model/useEmployeeSignatureSearch'
import Typography from '@/shared/ui/Typography'

export const EmployeeSearch = memo(() => {
	const { isLoading, options, searchValue, setSearchValue, value, setValue } = useEmployeeSearch()
	return (
		<div className="relative flex h-16 w-full items-end md:max-w-sm lg:max-w-md">
			<Typography className="mt-3 self-start pr-2" variant="p" color="gris">
				Buscar:
			</Typography>
		</div>
	)
})

EmployeeSearch.displayName = 'EmployeeSearch'

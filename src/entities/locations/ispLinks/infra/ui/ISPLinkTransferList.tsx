import { useCallback, useMemo, useState } from 'react'
import { useGetAllISPLink } from '../hook/useGetAllISPLink'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'
import type { ISPLinkDto } from '../../domain/dto/ISPLink.dto'

interface ISPLinkTransferListProps {
	value?: ISPLinkDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	isLoading?: boolean
	readonly?: boolean
	onAddISPLink: (name: 'addISPLink', value: string) => void
	onRemoveISPLink: (name: 'removeISPLink', value: string) => void
}

const ISPLINKS_DEFAULT_ITEMS: ISPLinkDto['id'][] = []
/**
 * `ISPLinkTransferList` is a functional component that provides a dual-list interface
 * for selecting and managing ISPLinks. It allows users to search for available ISPLinks
 * and add/remove them from a selected list.
 */
export function ISPLinkTransferList({
	value: ISPLinks = ISPLINKS_DEFAULT_ITEMS,
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	onAddISPLink,
	onRemoveISPLink
}: ISPLinkTransferListProps) {
	const [inputValue, setInputValue] = useState('')
	const { data: allISPLinks, isLoading: loading } = useGetAllISPLink({})

	const availableOptions = useMemo(
		() => allISPLinks?.data?.filter(ISPLink => !ISPLinks.includes(ISPLink.id)) ?? [],
		[allISPLinks, ISPLinks]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddISPLink = useCallback(
		(ISPLinkId: string) => {
			onAddISPLink('addISPLink', ISPLinkId)
		},
		[onAddISPLink]
	)

	const handleRemoveISPLink = useCallback(
		(ISPLinkId: string) => {
			onRemoveISPLink('removeISPLink', ISPLinkId)
		},
		[onRemoveISPLink]
	)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="isp-link-id"
				label="Proveedores de Internet (ISP)"
				value=""
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={loading}
				isLoading={isLoading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={(_name, value) => handleAddISPLink(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Proveedores de Internet (ISP) Seleccionados
				</Typography>
				{ISPLinks.length > 0 ? (
					<ul role="options" className="flex w-full flex-col rounded">
						{ISPLinks.map(ispLinkId => {
							const ISPLink = allISPLinks?.data?.find(c => c.id === ispLinkId)
							return (
								<TransferListItem
									isLoading={isLoading}
									key={ispLinkId}
									id={ispLinkId}
									name={ISPLink?.name}
									readOnly={readonly}
									onRemove={handleRemoveISPLink}
								/>
							)
						})}
					</ul>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado Proveedores de Internet (ISP).
					</Typography>
				)}
			</div>
		</div>
	)
}

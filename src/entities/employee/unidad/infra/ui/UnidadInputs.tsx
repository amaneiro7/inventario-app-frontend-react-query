import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type UnidadErrors,
	type DefaultUnidad,
	type UnidadRequired,
	type UnidadDisabled
} from '@/entities/employee/unidad/infra/reducers/unidadFormReducer'
import { Level } from '../../domain/value-object/Level'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Icon } from '@/shared/ui/icon/Icon'
import type { UnidadDto } from '../../domain/dto/Unidad.dto'

const CargoTransferList = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoTransferList').then(m => ({
		default: m.CargoTransferList
	}))
)

const UnidadComboBox = lazy(() =>
	import('@/entities/employee/unidad/infra/ui/UnidadComboBox').then(m => ({
		default: m.UnidadCombobox
	}))
)

interface UnidadInputsProps {
	formData: DefaultUnidad
	errors: UnidadErrors
	disabled: UnidadDisabled
	required: UnidadRequired
	isLoading: boolean
	canEdit: boolean
	handleChange: (name: Action['type'], value: any) => void
	handleParentChange: ({
		value,
		full_chain
	}: {
		value: UnidadDto['id']
		full_chain?: UnidadDto['full_chain']
	}) => Promise<void>
}

/**
 * `UnidadInputs` is a memoized functional component that renders the input fields
 * for Unidad information. It includes a text input for the Unidad name and a transfer list for cargos.
 */
export const UnidadInputs = memo(
	({
		errors,
		required,
		formData,
		disabled,
		isLoading,
		canEdit,
		handleChange,
		handleParentChange
	}: UnidadInputsProps) => {
		return (
			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
					{formData.full_chain && (
						<div className="flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50/50 p-3 text-sm text-blue-700 md:col-span-2">
							<Icon name="box" className="h-4 w-4 text-blue-400" />
							<div className="flex flex-col">
								<span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
									Jerarquía (Vista Previa)
								</span>
								<p className="font-medium italic">{formData.full_chain.text}</p>
							</div>
						</div>
					)}

					<div className="md:col-span-2">
						<Input
							id="unidad-name"
							value={formData.name}
							name="name"
							label="Nombre de la Unidad Organizativa"
							isLoading={isLoading}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('name', e.target.value)
							}
							error={!!errors?.name}
							readOnly={!canEdit}
							errorMessage={errors?.name}
							required={required.name}
						/>
					</div>

					<div className="md:col-span-2">
						<UnidadComboBox
							value={formData.parentId ?? ''}
							handleFormChange={handleParentChange}
							name="parentId"
							method="form"
							label="Unidad Superior (Área de dependencia)"
							required={required.parentId}
							disabled={disabled.parentId || !canEdit}
							error={errors?.parentId}
							readonly={!canEdit}
							isLoading={isLoading}
						/>
					</div>

					<Input
						id="unidad-level"
						value={formData.level}
						name="level"
						label="Nivel Jerárquico"
						type="number"
						transform
						max={Level.MAX_LEVEL}
						min={Level.MIN_LEVEL}
						isLoading={isLoading}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('level', e.target.value)
						}
						error={!!errors?.level}
						readOnly={!canEdit}
						errorMessage={errors?.level}
						required={required.level}
					/>

					<Input
						id="unidad-codigo-interno"
						value={formData.codigoInterno ?? ''}
						name="codigoInterno"
						label="Código Interno"
						isLoading={isLoading}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('codigoInterno', e.target.value)
						}
						error={!!errors?.codigoInterno}
						readOnly={!canEdit}
						errorMessage={errors?.codigoInterno}
						required={required.codigoInterno}
					/>

					<Input
						id="unidad-centro-de-costo"
						value={formData.centroDeCosto ?? ''}
						name="centroDeCosto"
						label="Centro de Costo"
						isLoading={isLoading}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('centroDeCosto', e.target.value)
						}
						error={!!errors?.centroDeCosto}
						readOnly={!canEdit}
						errorMessage={errors?.centroDeCosto}
						required={required.centroDeCosto}
					/>

					<div className="flex h-full items-center pb-4">
						<Checkbox
							value={formData.isUnitActive}
							name="isUnitActive"
							disabled={!canEdit}
							text="¿Unidad activa?"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('isUnitActive', e.target.checked)
							}
						/>
					</div>
				</div>

				<CargoTransferList
					value={formData.cargos}
					name="cargos"
					readonly={!canEdit}
					isLoading={isLoading}
					onAddCargo={handleChange}
					onRemoveCargo={handleChange}
					required={required.cargos}
				/>
			</div>
		)
	}
)
UnidadInputs.displayName = 'UnidadInputs'

import { lazy, memo } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'

import { type ModelDto } from '../../domain/dto/Model.dto'

const DetailModalWrapper = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalWrapper').then(m => ({
		default: m.DetailModalWrapper
	}))
)
const DetailModalHeader = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalHeader').then(m => ({
		default: m.DetailModalHeader
	}))
)
const DetailModalContent = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalContent').then(m => ({
		default: m.DetailModalContent
	}))
)
const ModelModalTitle = lazy(() =>
	import('./ModelModalTitle').then(m => ({ default: m.ModelModalTitle }))
)
const DetailItem = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailItem').then(m => ({ default: m.DetailItem }))
)
const CardDetail = lazy(() =>
	import('@/shared/ui/DescriptionList/CardDetail').then(m => ({ default: m.CardDetail }))
)
const Icon = lazy(() => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))
const Tag = lazy(() => import('@/shared/ui/Tag').then(m => ({ default: m.Tag })))

interface DetailsModelModalProps {
	model: ModelDto
	onClose: () => void
}
const BooleanDetailItem = ({ label, value }: { label: string; value?: boolean }) => (
	<DetailItem label={label} value={value ? 'Si' : 'No'} />
)
export const DetailsModelModal = memo(({ model, onClose }: DetailsModelModalProps) => {
	const {
		name,
		brand,
		category,
		processors,
		modelComputer,
		modelLaptop,
		modelMonitor,
		modelPrinter,
		modelKeyboard,
		createdAt,
		updatedAt
	} = model

	return (
		<DetailModalWrapper>
			<DetailModalHeader onClose={onClose} url={`/form/model/edit/${model.id}`}>
				<ModelModalTitle
					brandName={brand.name}
					categoryName={category.name}
					modelName={name}
				/>
			</DetailModalHeader>
			{/* --- Tarjeta de Información General --- */}
			<DetailModalContent>
				<CardDetail
					title="Información General"
					icon={<Icon name="info" className="h-5 w-5" />}
				>
					<div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
						<DetailItem label="Nombre del Model" value={name} />
						<DetailItem label="Marca" value={brand.name} />
						<DetailItem label="Categoria" value={category.name} />
						<BooleanDetailItem label="Modelo Genérico" value={model.generic} />
					</div>
				</CardDetail>
				{/* --- Tarjeta de Especificaciones (Contenido Dinámico) --- */}
				<CardDetail
					// className="lg:col-span-2"
					title="Especificaciones Técnicas"
					icon={<Icon name="sliders" className="h-5 w-5" />}
				>
					<div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
						{modelComputer && (
							<>
								<DetailItem
									label="Tipo de RAM"
									value={modelComputer.memoryRamType.name}
								/>
								<DetailItem
									label="Ranuras de RAM"
									value={modelComputer.memoryRamSlotQuantity}
								/>
								<BooleanDetailItem
									label="Bluetooth"
									value={modelComputer.hasBluetooth}
								/>
								<BooleanDetailItem
									label="Adaptador Wi-Fi"
									value={modelComputer.hasWifiAdapter}
								/>
								<BooleanDetailItem
									label="Puerto DVI"
									value={modelComputer.hasDVI}
								/>
								<BooleanDetailItem
									label="Puerto HDMI"
									value={modelComputer.hasHDMI}
								/>
								<BooleanDetailItem
									label="Puerto VGA"
									value={modelComputer.hasVGA}
								/>
							</>
						)}
						{modelLaptop && (
							<>
								<DetailItem
									label="Tipo de RAM"
									value={modelLaptop.memoryRamType.name}
								/>
								<DetailItem
									label="Ranuras de RAM"
									value={modelLaptop.memoryRamSlotQuantity}
								/>
								<BooleanDetailItem
									label="Bluetooth"
									value={modelLaptop.hasBluetooth}
								/>
								<BooleanDetailItem
									label="Adaptador Wi-Fi"
									value={modelLaptop.hasWifiAdapter}
								/>
								<BooleanDetailItem label="Puerto DVI" value={modelLaptop.hasDVI} />
								<BooleanDetailItem
									label="Puerto HDMI"
									value={modelLaptop.hasHDMI}
								/>
								<BooleanDetailItem label="Puerto VGA" value={modelLaptop.hasVGA} />
								<DetailItem
									label="Model de Batería"
									value={modelLaptop.batteryModel}
								/>
							</>
						)}
						{modelMonitor && (
							<>
								<DetailItem
									label="Tamaño de Pantalla"
									value={`${modelMonitor.screenSize}"`}
								/>
								<BooleanDetailItem label="Puerto DVI" value={modelMonitor.hasDVI} />
								<BooleanDetailItem
									label="Puerto HDMI"
									value={modelMonitor.hasHDMI}
								/>
								<BooleanDetailItem label="Puerto VGA" value={modelMonitor.hasVGA} />
							</>
						)}

						{modelPrinter && (
							<DetailItem
								label="Modelo de Cartucho"
								value={modelPrinter.cartridgeModel}
							/>
						)}
						{modelKeyboard && (
							<>
								<DetailItem
									label="Tipo de Conexión"
									value={modelKeyboard.inputType.name}
								/>
								<BooleanDetailItem
									label="Lector de Huella"
									value={modelKeyboard.hasFingerPrintReader}
								/>
							</>
						)}
					</div>
				</CardDetail>
				{/* --- Tarjeta de Procesadores Compatibles --- */}
				{processors && processors.length > 0 && (
					<CardDetail
						className="lg:col-span-2"
						title="Procesadores Compatibles"
						icon={<Icon name="cpu" className="h-5 w-5" />}
					>
						<div className="flex flex-wrap gap-2">
							{processors.map(p => (
								<Tag
									key={p.id}
									backgroundColor="gris"
									color="white"
									iconText={p.name}
								/>
							))}
						</div>
					</CardDetail>
				)}
				{/* --- Tarjeta de Metadatos --- */}
				<CardDetail className="lg:col-span-2" title="Metadatos">
					<DetailItem label="Fecha de Creación" value={formatDateToUTC(createdAt)} />
					<DetailItem label="Última Actualizacón" value={getRelativeTime(updatedAt)} />
				</CardDetail>
			</DetailModalContent>
		</DetailModalWrapper>
	)
})

DetailsModelModal.displayName = 'DetailsModelModal'

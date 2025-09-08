import { lazy, memo, Suspense, useMemo, useState } from 'react'
import { useInventoryBrandTable } from '../model/useInventoryBrandTable'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { Input } from '@/shared/ui/Input/Input'
import { InventoryBrandTableLoading } from './InventoryBrandTableLoading'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

const Table = lazy(() => import('@/shared/ui/Table/Table').then(m => ({ default: m.Table })))
const TableHeader = lazy(() =>
	import('@/shared/ui/Table/TableHeader').then(m => ({ default: m.TableHeader }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableHead = lazy(() =>
	import('@/shared/ui/Table/TableHead').then(m => ({ default: m.TableHead }))
)
const TableBody = lazy(() =>
	import('@/shared/ui/Table/TableBody').then(m => ({ default: m.TableBody }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)

const InventoryBrandRow = lazy(() =>
	import('./InventoryBrandRow').then(m => ({ default: m.InventoryBrandRow }))
)
interface InventoryTableProps {
	data: ComputerDashboardDto['brand']
}
export const InventoryBrandTable = memo(({ data }: InventoryTableProps) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [filterBrand, setFilterBrand] = useState('All')
	const [filterCategory, setFilterCategory] = useState('All')

	const { filteredData, uniqueBrands, uniqueCategories } = useInventoryBrandTable({
		data,
		filterBrand,
		filterCategory,
		searchTerm
	})

	const SkeletonFallback = useMemo(() => {
		return Array.from({
			length: 25
		}).map((_, index) => <InventoryBrandTableLoading key={`loader-${index}`} />)
	}, [])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Inventario de Equipos por Marca y Categoría</CardTitle>
				<CardDescription className="pb-2">
					Tabla detallada con filtros para explorar el inventario por marca y categoría
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-center">
				<div className="mt-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
					<div className="relative w-full sm:max-w-[300px]">
						<Input
							id="brand-model-search-name"
							placeholder="Buscar por marca o modelo..."
							transform
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="md:w-1/3"
							label="Búsqueda"
							name="name"
						/>
					</div>
					<label htmlFor="brand-filter" className="sr-only">
						Filtrar por marca
					</label>
					<Select value={filterBrand} onValueChange={setFilterBrand}>
						<SelectTrigger id="brand-filter" className="md:w-1/4">
							<SelectValue placeholder="Filtro por marca" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={'All'}>Todas las marcas</SelectItem>
							{uniqueBrands.map(brand => (
								<SelectItem key={brand} value={brand}>
									{brand}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<label htmlFor="category-filter" className="sr-only">
						Filtrar por categoria
					</label>
					<Select value={filterCategory} onValueChange={setFilterCategory}>
						<SelectTrigger id="category-filter" className="md:w-1/4">
							<SelectValue placeholder="Filtro por categoria" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={'All'}>Todas las categorias</SelectItem>
							{uniqueCategories.map(category => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Table className="table-fixed">
					<TableHeader>
						<TableRow>
							<TableHead aria-colindex={1} size="xxLarge">
								Modelo
							</TableHead>
							<TableHead aria-colindex={2} size="xLarge">
								Marca
							</TableHead>
							<TableHead aria-colindex={3} size="medium">
								Categoria
							</TableHead>
							<TableHead aria-colindex={4} size="small" className="text-center">
								Cantidad
							</TableHead>
							<TableHead aria-colindex={5} size="small" className="text-center">
								En uso
							</TableHead>
							<TableHead aria-colindex={6} size="small" className="text-center">
								En almacen
							</TableHead>
							<TableHead aria-colindex={7} size="medium">
								Estatus
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<Suspense fallback={SkeletonFallback}>
							{filteredData.length > 0 ? (
								filteredData.map(item => (
									<InventoryBrandRow key={item.id} item={item} />
								))
							) : (
								<TableCellEmpty />
							)}
						</Suspense>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
})

InventoryBrandTable.displayName = 'InventoryBrandTable'

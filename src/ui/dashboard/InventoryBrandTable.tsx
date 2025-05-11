import { lazy, memo, Suspense, useState } from 'react'
import { useInventoryBrandTable } from './hooks/useInventoryBrandTable'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Input } from '@/components/Input/Input'
import { Table } from '@/components/Table/Table'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'
import { TableHead } from '@/components/Table/TableHead'
import { TableBody } from '@/components/Table/TableBody'
import { TableCell } from '@/components/Table/TableCell'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

const InventoryBrandRow = lazy(() =>
	import('./InventoryBrandTable/InventoryBrandRow').then(m => ({ default: m.InventoryBrandRow }))
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
					<Select value={filterBrand} onValueChange={setFilterBrand}>
						<SelectTrigger className="md:w-1/4">
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
					<Select value={filterCategory} onValueChange={setFilterCategory}>
						<SelectTrigger className="md:w-1/4">
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
							<TableHead size="xxLarge" name="Modelo" />
							<TableHead size="xLarge" name="Marca" />
							<TableHead size="medium" name="Categoria" />
							<TableHead size="small" className="text-center" name="Cantidad" />
							<TableHead size="small" className="text-center" name="En uso" />
							<TableHead size="small" className="text-center" name="En almacen" />
							<TableHead size="medium" name="Estatus" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<Suspense fallback={<LoadingTable colspan={7} />}>
							{filteredData.length > 0 ? (
								filteredData.map((item, index) => (
									<InventoryBrandRow item={item} index={index} />
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={7}
										className="py-4 text-center"
										size="medium"
										value="No se encontraron resultados"
									/>
								</TableRow>
							)}
						</Suspense>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
})

InventoryBrandTable.displayName = 'InventoryBrandTable'

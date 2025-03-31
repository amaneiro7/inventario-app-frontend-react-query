import { memo, useState } from 'react'
import { useFilteredData } from './useilteredData'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Input } from '@/components/Input/Input'
import { Table } from '@/components/Table/Table'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'
import { TableHead } from '@/components/Table/TableHead'
import { TableBody } from '@/components/Table/TableBody'
import { TableCell } from '@/components/Table/TableCell'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
interface InventoryTableProps {
	data: ComputerDashboardDto['brand']
}
export const InventoryBrandTable = memo(({ data }: InventoryTableProps) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [filterBrand, setFilterBrand] = useState('All')
	const [filterCategory, setFilterCategory] = useState('All')

	const { filteredData, uniqueBrands, uniqueCategories } = useFilteredData({
		data,
		filterBrand,
		filterCategory,
		searchTerm
	})

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'In Stock':
				return 'verde'
			case 'Low Stock':
				return 'amarillo'
			case 'Out of Stock':
				return 'rojo'
			default:
				return 'gris'
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Detale de inventario</CardTitle>
				<CardDescription className="pb-2">Lista completa de equipos</CardDescription>
				<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 mt-2">
					<Input
						placeholder="Buscar por marca o modelo..."
						transform
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="md:w-1/3"
						label="Search"
						name="name"
					/>
					<Select value={filterBrand} onValueChange={setFilterBrand}>
						<SelectTrigger className="md:w-1/4">
							<SelectValue placeholder="Filter by brand" />
						</SelectTrigger>
						<SelectContent>
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
							{uniqueCategories.map(category => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className="flex justify-center">
				<Table className="table-fixed">
					<TableHeader>
						<TableRow>
							<TableHead size="auto" name="Modelo" />
							<TableHead size="xLarge" name="Marca" />
							<TableHead size="medium" name="Categoria" />
							<TableHead size="small" className="text-center" name="Cantidad" />
							<TableHead size="small" className="text-center" name="En uso" />
							<TableHead size="small" className="text-center" name="En almacen" />
							<TableHead size="medium" name="Estatus" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredData.length > 0 ? (
							filteredData.map((item, index) => (
								<TableRow key={index}>
									<TableCell value={item.name} size="auto" />
									<TableCell value={item.brand} size="xLarge" />
									<TableCell value={item.category} size="medium" />
									<TableCell value={item.count} size="small" align="center" />
									<TableCell value={item.inUse} size="small" align="center" />
									<TableCell value={item.inAlmacen} size="small" align="center" />

									<TableCell
										size="medium"
										tag
										backgroundColor={getStatusColor(item.status)}
										color="white"
										value={item.status}
									/>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-4"
									size="medium"
									value={'No results found'}
								/>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
})

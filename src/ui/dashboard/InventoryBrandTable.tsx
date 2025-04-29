import { memo, useState } from 'react'
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
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
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

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'In Stock':
				return 'white'
			case 'Low Stock':
				return 'black'
			case 'Out of Stock':
				return 'white'
			default:
				return 'black'
		}
	}
	const getStatusBackGroundColor = (status: string) => {
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
				<div className="mt-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
					<div className="relative w-full sm:max-w-[300px]">
						<Input
							id="brand-model-search-name"
							placeholder="Buscar por marca o modelo..."
							transform
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="md:w-1/3"
							label="Search"
							name="name"
						/>
					</div>
					<Select value={filterBrand} onValueChange={setFilterBrand}>
						<SelectTrigger className="md:w-1/4">
							<SelectValue placeholder="Filtro por marca" />
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
						{filteredData.length > 0 ? (
							filteredData.map((item, index) => (
								<TableRow key={index}>
									<TableCell value={item.name} size="xxLarge" />
									<TableCell value={item.brand} size="xLarge" />
									<TableCell value={item.category} size="medium" />
									<TableCell value={item.count} size="small" align="center" />
									<TableCell value={item.inUse} size="small" align="center" />
									<TableCell value={item.inAlmacen} size="small" align="center" />

									<TableCell
										size="medium"
										tag
										backgroundColor={getStatusBackGroundColor(item.status)}
										color={getStatusColor(item.status)}
										value={item.status}
									/>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={7}
									className="py-4 text-center"
									size="medium"
									value={'No se encontraron resultados'}
								/>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
})

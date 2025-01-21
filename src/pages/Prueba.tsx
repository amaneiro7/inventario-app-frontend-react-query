import { useGetBrand } from '@/hooks/useGetBrand'

export function Prueba() {
	// const { roles, isLoading } = useGetAllRoles()
	// const { brands, isLoading: brandLoading } = useGetAllBrands()
	const { brand, isLoading } = useGetBrand()
	return (
		<div>
			{isLoading && <p>...loading</p>}
			<p>
				<span>{brand?.id}</span>
				<span>{brand?.name}</span>
			</p>
		</div>
	)
}

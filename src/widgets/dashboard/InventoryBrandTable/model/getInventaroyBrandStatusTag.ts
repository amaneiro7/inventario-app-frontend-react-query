import { type BackgroundType, type ColorType } from '@/shared/ui/Typography/types'

type GetInventroyBrandStatusTag = Record<
	string,
	{
		color: ColorType
		backGroundColor: BackgroundType
	}
>
const getInventroyBrandStatusTag: GetInventroyBrandStatusTag = {
	['In Stock']: {
		color: 'white',
		backGroundColor: 'verde'
	},
	['Low Stock']: {
		color: 'black',
		backGroundColor: 'amarillo'
	},
	['Out of Stock']: {
		color: 'white',
		backGroundColor: 'rojo'
	}
}

export const getStatusTagColor = (status: string) =>
	getInventroyBrandStatusTag[status]?.color ?? 'black'
export const getStatusTagBackGroundColor = (status: string) =>
	getInventroyBrandStatusTag[status]?.backGroundColor ?? 'gris'

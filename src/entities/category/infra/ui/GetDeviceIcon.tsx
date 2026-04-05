import { memo } from 'react'
import { Icon, type IconProps } from '@/shared/ui/icon/Icon'
import { categoryIconMap } from './categoryIconMap'
interface GetDeviceIconProps extends Omit<IconProps, 'name'> {
	categoryName?: string
	categoryId?: string
}

/**
 * Componente unificado que resuelve el icono basándose en nombre o ID.
 */
export const GetDeviceIcon = memo(({ categoryName, categoryId, ...props }: GetDeviceIconProps) => {
	// Priorizamos la búsqueda por ID ya que es más precisa, luego por nombre.
	const matched = categoryIconMap.find(cate => {
		if (categoryId && cate.id === categoryId.toLowerCase()) return true
		if (categoryName && cate.name === categoryName.toLowerCase()) return true
		return false
	})

	const iconName = matched?.iconName ?? 'computer'

	return <Icon name={iconName} {...props} />
})

GetDeviceIcon.displayName = 'GetDeviceIcon'

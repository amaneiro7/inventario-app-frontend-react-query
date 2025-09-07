import { Icon, type IconName, type IconProps } from '@/shared/ui/icon/Icon'
import { CategoryOptionsName } from '../../domain/entity/CategoryOptionsName'

const categoryToIconNameMap: Record<string, IconName> = {
	[CategoryOptionsName.COMPUTER.toLowerCase()]: 'computer',
	[CategoryOptionsName.SERVER.toLowerCase()]: 'server',
	[CategoryOptionsName.LAPTOP.toLowerCase()]: 'laptop',
	[CategoryOptionsName.ALLINONE.toLowerCase()]: 'laptopMinimalCheck',
	[CategoryOptionsName.MONITOR.toLowerCase()]: 'monitor',
	[CategoryOptionsName.FINANTIALPRINTER.toLowerCase()]: 'printer',
	[CategoryOptionsName.LASERPRINTER.toLowerCase()]: 'printer',
	[CategoryOptionsName.INKPRINTER.toLowerCase()]: 'printer',
	[CategoryOptionsName.HARDDRIVE.toLowerCase()]: 'hardDrive',
	[CategoryOptionsName.KEYBOARD.toLowerCase()]: 'keyboard',
	[CategoryOptionsName.MOUSE.toLowerCase()]: 'mouse',
	[CategoryOptionsName.BAM.toLowerCase()]: 'antenna',
	[CategoryOptionsName.MFP.toLowerCase()]: 'printer',
	[CategoryOptionsName.PHONE.toLowerCase()]: 'phone',
	[CategoryOptionsName.SCANNER.toLowerCase()]: 'scan',
	[CategoryOptionsName.ANTENAS.toLowerCase()]: 'radioTower',
	[CategoryOptionsName.CABLEUSB.toLowerCase()]: 'usb',
	[CategoryOptionsName.CAMARAS.toLowerCase()]: 'camera',
	[CategoryOptionsName.IPAD.toLowerCase()]: 'tablet',
	[CategoryOptionsName.WEBCAM.toLowerCase()]: 'webcam',
	[CategoryOptionsName.CORNETAS.toLowerCase()]: 'speaker',
	[CategoryOptionsName.DOCKING.toLowerCase()]: 'dock',
	[CategoryOptionsName.LAPIZOPTICO.toLowerCase()]: 'penTool',
	[CategoryOptionsName.CONVERTIDORVGAHDMI.toLowerCase()]: 'monitor',
	[CategoryOptionsName.MIC.toLowerCase()]: 'mic'
}

interface GetDeviceIconProps extends Omit<IconProps, 'name'> {
	categoryName?: string
}

export const GetDeviceIcon = ({ categoryName, ...props }: GetDeviceIconProps) => {
	const lowerCategory = categoryName?.toLowerCase() ?? ''

	const matchedCategory = Object.keys(categoryToIconNameMap).find(key =>
		lowerCategory.includes(key)
	)

	const iconName = matchedCategory ? categoryToIconNameMap[matchedCategory] : 'computer'

	return <Icon name={iconName} {...props} />
}

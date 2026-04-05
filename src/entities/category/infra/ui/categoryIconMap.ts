import { CategoryOptions } from '../../domain/entity/CategoryOptions'
import { CategoryOptionsName } from '../../domain/entity/CategoryOptionsName'
import type { IconName } from '@/shared/ui/icon/Icon'

export const categoryIconMap: {
	id: string
	name: string
	iconName: IconName
}[] = [
	{
		id: CategoryOptions.COMPUTER.toLowerCase(),
		name: CategoryOptionsName.COMPUTER.toLowerCase(),
		iconName: 'computer'
	},
	{
		id: CategoryOptions.SERVER.toLowerCase(),
		name: CategoryOptionsName.SERVER.toLowerCase(),
		iconName: 'server'
	},
	{
		id: CategoryOptions.LAPTOP.toLowerCase(),
		name: CategoryOptionsName.LAPTOP.toLowerCase(),
		iconName: 'laptop'
	},
	{
		id: CategoryOptions.ALLINONE.toLowerCase(),
		name: CategoryOptionsName.ALLINONE.toLowerCase(),
		iconName: 'laptopMinimalCheck'
	},
	{
		id: CategoryOptions.MONITOR.toLowerCase(),
		name: CategoryOptionsName.MONITOR.toLowerCase(),
		iconName: 'monitor'
	},
	{
		id: CategoryOptions.FINANTIALPRINTER.toLowerCase(),
		name: CategoryOptionsName.FINANTIALPRINTER.toLowerCase(),
		iconName: 'printer'
	},
	{
		id: CategoryOptions.LASERPRINTER.toLowerCase(),
		name: CategoryOptionsName.LASERPRINTER.toLowerCase(),
		iconName: 'printer'
	},
	{
		id: CategoryOptions.INKPRINTER.toLowerCase(),
		name: CategoryOptionsName.INKPRINTER.toLowerCase(),
		iconName: 'printer'
	},
	{
		id: CategoryOptions.HARDDRIVE.toLowerCase(),
		name: CategoryOptionsName.HARDDRIVE.toLowerCase(),
		iconName: 'hardDrive'
	},
	{
		id: CategoryOptions.KEYBOARD.toLowerCase(),
		name: CategoryOptionsName.KEYBOARD.toLowerCase(),
		iconName: 'keyboard'
	},
	{
		id: CategoryOptions.MOUSE.toLowerCase(),
		name: CategoryOptionsName.MOUSE.toLowerCase(),
		iconName: 'mouse'
	},
	{
		id: CategoryOptions.BAM.toLowerCase(),
		name: CategoryOptionsName.BAM.toLowerCase(),
		iconName: 'antenna'
	},
	{
		id: CategoryOptions.MFP.toLowerCase(),
		name: CategoryOptionsName.MFP.toLowerCase(),
		iconName: 'printer'
	},
	{
		id: CategoryOptions.PHONE.toLowerCase(),
		name: CategoryOptionsName.PHONE.toLowerCase(),
		iconName: 'phone'
	},
	{
		id: CategoryOptions.SCANNER.toLowerCase(),
		name: CategoryOptionsName.SCANNER.toLowerCase(),
		iconName: 'scan'
	},
	{
		id: CategoryOptions.ANTENAS.toLowerCase(),
		name: CategoryOptionsName.ANTENAS.toLowerCase(),
		iconName: 'radioTower'
	},
	{
		id: CategoryOptions.CABLEUSB.toLowerCase(),
		name: CategoryOptionsName.CABLEUSB.toLowerCase(),
		iconName: 'usb'
	},
	{
		id: CategoryOptions.CAMARAS.toLowerCase(),
		name: CategoryOptionsName.CAMARAS.toLowerCase(),
		iconName: 'camera'
	},
	{
		id: CategoryOptions.IPAD.toLowerCase(),
		name: CategoryOptionsName.IPAD.toLowerCase(),
		iconName: 'tablet'
	},
	{
		id: CategoryOptions.WEBCAM.toLowerCase(),
		name: CategoryOptionsName.WEBCAM.toLowerCase(),
		iconName: 'webcam'
	},
	{
		id: CategoryOptions.CORNETAS.toLowerCase(),
		name: CategoryOptionsName.CORNETAS.toLowerCase(),
		iconName: 'speaker'
	},
	{
		id: CategoryOptions.DOCKING.toLowerCase(),
		name: CategoryOptionsName.DOCKING.toLowerCase(),
		iconName: 'dock'
	},
	{
		id: CategoryOptions.LAPIZOPTICO.toLowerCase(),
		name: CategoryOptionsName.LAPIZOPTICO.toLowerCase(),
		iconName: 'penTool'
	},
	{
		id: CategoryOptions.CONVERTIDORVGAHDMI.toLowerCase(),
		name: CategoryOptionsName.CONVERTIDORVGAHDMI.toLowerCase(),
		iconName: 'monitor'
	},
	{
		id: CategoryOptions.MIC.toLowerCase(),
		name: CategoryOptionsName.MIC.toLowerCase(),
		iconName: 'mic'
	}
]

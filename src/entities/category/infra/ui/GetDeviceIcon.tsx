import {
	Laptop,
	Printer,
	Monitor,
	Server,
	Computer,
	HardDrive,
	Keyboard,
	Mouse,
	Phone,
	Scan,
	RadioTower,
	Usb,
	Camera,
	Tablet,
	Webcam,
	Speaker,
	Dock,
	PenTool,
	Mic,
	Antenna,
	LaptopMinimalCheck
} from 'lucide-react'
import { CategoryOptionsName } from '../../domain/entity/CategoryOptionsName'

export const getDeviceIcon = (categoryName?: string) => {
	if (!categoryName) return <Computer />
	const lowerCategory = categoryName.toLowerCase()

	if (lowerCategory.includes(CategoryOptionsName.COMPUTER.toLowerCase())) return <Computer />
	if (lowerCategory.includes(CategoryOptionsName.SERVER.toLowerCase())) return <Server />
	if (lowerCategory.includes(CategoryOptionsName.LAPTOP.toLowerCase())) return <Laptop />
	if (lowerCategory.includes(CategoryOptionsName.ALLINONE.toLowerCase()))
		return <LaptopMinimalCheck />
	if (lowerCategory.includes(CategoryOptionsName.MONITOR.toLowerCase())) return <Monitor />
	if (lowerCategory.includes(CategoryOptionsName.FINANTIALPRINTER.toLowerCase()))
		return <Printer />
	if (lowerCategory.includes(CategoryOptionsName.LASERPRINTER.toLowerCase())) return <Printer />
	if (lowerCategory.includes(CategoryOptionsName.INKPRINTER.toLowerCase())) return <Printer />
	if (lowerCategory.includes(CategoryOptionsName.HARDDRIVE.toLowerCase())) return <HardDrive />
	if (lowerCategory.includes(CategoryOptionsName.KEYBOARD.toLowerCase())) return <Keyboard />
	if (lowerCategory.includes(CategoryOptionsName.MOUSE.toLowerCase())) return <Mouse />
	if (lowerCategory.includes(CategoryOptionsName.BAM.toLowerCase())) return <Antenna />
	if (lowerCategory.includes(CategoryOptionsName.MFP.toLowerCase())) return <Printer />
	if (lowerCategory.includes(CategoryOptionsName.PHONE.toLowerCase())) return <Phone />
	if (lowerCategory.includes(CategoryOptionsName.SCANNER.toLowerCase())) return <Scan />
	if (lowerCategory.includes(CategoryOptionsName.ANTENAS.toLowerCase())) return <RadioTower />
	if (lowerCategory.includes(CategoryOptionsName.CABLEUSB.toLowerCase())) return <Usb />
	if (lowerCategory.includes(CategoryOptionsName.CAMARAS.toLowerCase())) return <Camera />
	if (lowerCategory.includes(CategoryOptionsName.IPAD.toLowerCase())) return <Tablet />
	if (lowerCategory.includes(CategoryOptionsName.WEBCAM.toLowerCase())) return <Webcam />
	if (lowerCategory.includes(CategoryOptionsName.CORNETAS.toLowerCase())) return <Speaker />
	if (lowerCategory.includes(CategoryOptionsName.DOCKING.toLowerCase())) return <Dock />
	if (lowerCategory.includes(CategoryOptionsName.LAPIZOPTICO.toLowerCase())) return <PenTool />
	if (lowerCategory.includes(CategoryOptionsName.CONVERTIDORVGAHDMI.toLowerCase()))
		return <Monitor />
	if (lowerCategory.includes(CategoryOptionsName.MIC.toLowerCase())) return <Mic />

	return <Computer /> // Icono por defecto
}

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
	LaptopMinimalCheck,
	LucideProps,
	Box,
	CheckCircle2,
	Clock,
	Truck,
	XCircle,
	Package,
	HelpCircle,
	ClipboardList
} from 'lucide-react'

const iconMap = {
	laptop: Laptop,
	printer: Printer,
	monitor: Monitor,
	server: Server,
	computer: Computer,
	hardDrive: HardDrive,
	keyboard: Keyboard,
	mouse: Mouse,
	phone: Phone,
	scan: Scan,
	radioTower: RadioTower,
	usb: Usb,
	camera: Camera,
	tablet: Tablet,
	webcam: Webcam,
	speaker: Speaker,
	dock: Dock,
	penTool: PenTool,
	mic: Mic,
	antenna: Antenna,
	laptopMinimalCheck: LaptopMinimalCheck,
	box: Box,
	checkCircle2: CheckCircle2,
	clock: Clock,
	truck: Truck,
	xCircle: XCircle,
	package: Package,
	helpCircle: HelpCircle,
	chipboardList: ClipboardList
}

export type IconName = keyof typeof iconMap

export interface IconProps extends LucideProps {
	name: IconName
}

export const Icon = ({ name, ...props }: IconProps) => {
	const IconComponent = iconMap[name]
	if (!IconComponent) {
		return null
	}

	return <IconComponent {...props} />
}

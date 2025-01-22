import { type ModelDto } from './Model.dto'
import { type ModelComputerDto } from './ModelComputer.dto'
import { type ModelKeyboardDto } from './ModelKeyboard.dto'
import { type ModelLaptopDto } from './ModelLaptop.dto'
import { type ModelMonitorDto } from './ModelMonitor.dto'
import { type ModelPrinter } from './ModelPrinter.dto'

export type AllModelsDto =
	| ModelDto
	| ModelComputerDto
	| ModelLaptopDto
	| ModelKeyboardDto
	| ModelMonitorDto
	| ModelPrinter

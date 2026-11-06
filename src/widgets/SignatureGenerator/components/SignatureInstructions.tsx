import { Info } from 'lucide-react'
import { memo } from 'react'

export const SignatureInstructions = memo(() => {
	return (
		<div className="border-azul-200 bg-azul-50/80 text-azul-900 mb-6 flex items-start gap-3 rounded-xl border p-4 shadow-xs">
			<Info className="text-azul-600 mt-0.5 h-5 w-5 shrink-0" />
			<div className="text-sm">
				<span className="font-semibold">Instrucciones:</span> Completa los campos con tus
				datos laborales. Comprueba la previsualización en tiempo real y presiona{' '}
				<strong>Descargar como JPG</strong> para guardarla e insertarla en la configuración
				de firma de tu cliente de correo (Outlook / Webmail).
			</div>
		</div>
	)
})
SignatureInstructions.displayName = 'SignatureInstructions'

import { type ActionType } from './ActionType'

export const ACTION_MESSAGES: Record<
	ActionType,
	{ title: string; description: React.ReactNode; actionText: string }
> = {
	reset: {
		title: 'Restablecer Contraseña',
		description: (
			<>
				Se restablecerá la contraseña del usuario a la{' '}
				<strong>contraseña predeterminada</strong>. ¿Deseas continuar?
			</>
		),
		actionText: 'Restablecer'
	},
	unlock: {
		title: 'Desbloquear Cuenta',
		description: (
			<>
				Esta acción eliminará el <strong>bloqueo actual</strong> de la cuenta del usuario,
				permitiendo el inicio de sesión. ¿Confirmar el desbloqueo?
			</>
		),
		actionText: 'Desbloquear'
	},
	disable: {
		title: 'Deshabilitar Usuario',
		description: (
			<>
				El usuario será inmediatamente <strong>suspendido</strong> y no podrá acceder al
				sistema. Esta es una acción de seguridad. ¿Confirmar deshabilitación?
			</>
		),
		actionText: 'Deshabilitar'
	},
	reactivate: {
		title: 'Reactivar Usuario',
		description: (
			<>
				La cuenta del usuario volverá al estado <strong>Activo</strong> y podrá iniciar
				sesión. ¿Confirmar reactivación?
			</>
		),
		actionText: 'Reactivar'
	}
}

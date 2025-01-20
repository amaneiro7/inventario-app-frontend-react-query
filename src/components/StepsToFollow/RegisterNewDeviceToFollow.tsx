import { lazy, Suspense } from "react"

const RightArrowIcon = lazy(async () => import("@/icon/RightArrowIcon").then(m => ({ default: m.RightArrowIcon })))
const CancelIcon = lazy(async () => import("@/icon/CancelIcon").then(m => ({ default: m.CancelIcon })))
const ResetIcon = lazy(async () => import("@/icon/ResetIcon").then(m => ({ default: m.ResetIcon })))
const StepsText = lazy(async () => import("./StepsTexto").then(m => ({ default: m.StepsText })))

export function RegisterNewDeviceToFollow({ isEdit = true }: { isEdit: boolean }) {
  return (
    <>
      <StepsText
        requisito='obligatorio'
        text='Ingrese la informacón solicitada, si es correcto, oprima '
        iconText='Guardar'
        icon={
          <Suspense fallback={<span className='w-4 h-4 rounded-full bg-slate-200 animate-pulse' />}>
            <RightArrowIcon width={16} className='fill-white' />
          </Suspense>
        }
        backgroundColor='verde'
      />
      <StepsText
        requisito='opcional'
        text='Si desea abortar la operación, oprima '
        iconText='Regresar'
        icon={
          <Suspense fallback={<span className='w-4 h-4 rounded-full bg-slate-200 animate-pulse' />}>
            <CancelIcon width={16} />
          </Suspense>
        }
        backgroundColor='gris'
      />
      {isEdit ?
        <StepsText
          requisito='opcional'
          text='Si desea restaurar los cambios sin guardar, oprima '
          iconText='Reset'
          icon={
            <Suspense fallback={<span className='w-4 h-4 rounded-full bg-slate-200 animate-pulse' />}>
              <ResetIcon width={16} />
            </Suspense>
          }
          backgroundColor='azul'
        /> : null}
    </>
  )
}

import { lazy, memo, Suspense } from "react";

const RightArrowIcon = lazy(async () => import("@/icon/RightArrowIcon").then((m) => ({ default: m.RightArrowIcon })));
const CancelIcon = lazy(async () => import("@/icon/CancelIcon").then((m) => ({ default: m.CancelIcon })));
const StepsText = lazy(async () => import("@/components/StepsToFollow/StepsTexto").then((m) => ({ default: m.StepsText })));

export const ChangePasswordStepsToFollow = memo(() => {
  return (
    <>
      <StepsText
        requisito="obligatorio"
        text="Ingrese su Clave Actual, su Nueva Clave y una Confirmación de la misma, si es correcto, oprima "
        iconText="Continuar"
        icon={
          <Suspense fallback={<span className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />}>
            <RightArrowIcon width={16} className="fill-white" />
          </Suspense>
        }
        backgroundColor="verde"
      />
      <StepsText
        requisito="opcional"
        text="Si desea abortar la operación, oprima "
        iconText="Reset"
        icon={
          <Suspense fallback={<span className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />}>
            <CancelIcon width={16} />
          </Suspense>
        }
        backgroundColor="gris"
      />
    </>
  );
});

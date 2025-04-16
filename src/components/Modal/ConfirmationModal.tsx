import React, { lazy, Suspense } from "react"

const Button = lazy(async () => import("@/components/Button/Button"))
const Typography = lazy(async () => import("@/components/Typography"))
const CheckIcon = lazy(async () => import("@/icon/CheckIcon").then(m => ({ default: m.CheckIcon })))
const CancelIcon = lazy(async () => import("@/icon/CancelIcon").then(m => ({ default: m.CancelIcon })))

interface Props {
    text: React.ReactNode
    strongText?: string
    handle?: () => void
    formId?: string
    handleClose: () => void
}

export function ConfirmationModal({ text, strongText, handle, handleClose, formId }: Props) {
    return (
        <>
            <div className='bg-azul text-white p-4 rounded-t'>
                <Typography variant="p" color="white">Confirmación</Typography>
            </div>
            <div className='p-4'>
                <Typography variant="p">
                    {text}
                    <strong>{strongText}</strong>
                </Typography>
                <div className='mt-6 flex gap-4 justify-end'>
                    <Button
                        form={formId}
                        color='blue'
                        type={!handle ? 'submit' : 'button'}
                        onClick={handle}
                        text='Si'
                        buttonSize='large'
                        size='content'
                        hoverTranslation
                        icon={
                            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                                <CheckIcon width={20} className='aspect-square stroke-3' />
                            </Suspense>
                        }
                    />
                    <Button
                        type='button'
                        color='red'
                        text='No'
                        buttonSize='large'
                        size='content'
                        onClick={handleClose}
                        hoverTranslation
                        icon={
                            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                                <CancelIcon width={20} className='aspect-square' />
                            </Suspense>
                        }
                    />
                </div>
            </div>
        </>
    )
}
import React, { memo } from 'react'
import './input.css'

interface InputProps<T extends string | number | readonly string[]> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string
    value: T
    isRequired?: boolean
    error?: boolean
    valid?: boolean
    errorMessage?: string
    className?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    onRightIconClick?: () => void
}
function InputComponet<T extends string | number | readonly string[]>({ error, valid, value, errorMessage, label, isRequired = false, leftIcon, rightIcon, onRightIconClick, ...props }: InputProps<T>) {
    return (
        <div
            className={`inputBox group after:text-error ${error ? 'error' : ''} ${props.className ? props.className : ''}`}
            data-error={errorMessage}
        >
            <label
                className={`${(value || props.type === 'number') ? 'transform' : ''} ${error ? '!text-error' : ''} ${valid ? '!text-success' : ''} group-focus-within:text-focus ${leftIcon ? 'with-left-icon' : ''}`}
            >
                {`${label} ${isRequired ? '*' : ''}`}
            </label>
            <div className='inputArea'>
                {leftIcon ? <span className='leftIcon'>{leftIcon}</span> : null}
                <input
                    {...props}
                    value={value}
                    required={isRequired}
                />
                {rightIcon ? <button type='button' onClick={onRightIconClick} className='rightIcon'>{rightIcon}</button> : null}
                <fieldset
                    aria-hidden
                    className={`${error ? '!border-2 !border-error' : ''} ${valid ? '!border-2 !border-success' : ''} group-focus-within:border-focus group-focus-within:border-2`}
                >
                    <legend className={(value || props.type === 'number') ? 'transform' : ''}>
                        <span>{`${label} ${isRequired ? '*' : ''}`}</span>
                    </legend>
                </fieldset>
            </div>
        </div>
    )
}

export const Input = memo(InputComponet)
import { memo, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'
import { TableIcon } from '@/icon/TableIcon'
import { type OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { type OrderType, OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

type Props = React.DetailedHTMLProps<
	React.ThHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
> & {
	name: string
	orderByField?: string
	size: keyof typeof TableHeadSize
	handleSort?: (field: string) => void
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
	isTab?: boolean
}

export const TableHeadSize = {
	xxSmall: 'w-8', // 32px
	xSmall: 'w-20', // 80px
	small: 'w-28', // 112px
	medium: 'w-36', // 144px
	large: 'w-44', // 176px
	xLarge: 'w-52', // 224px
	xxLarge: 'w-64', // 256px
	auto: 'w-auto' // 224px
} as const

export const TableHead = memo(
	({
		name,
		size,
		className,
		orderByField,
		handleSort,
		isTab = false,
		orderBy,
		orderType,
		...props
	}: Props) => {
		const classes = twMerge(
			'group/th min-h-9 h-9 p-2 font-semibold tracking-wider align-middle whitespace-nowrap capitalize last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[sortable=true]:hover:text-azul-500 outline-hidden focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 text-start',
			cn({
				[`${TableHeadSize[size]}`]: size,
				['first:rounded-es-lg']: isTab,
				['first:rounded-s-lg']: !isTab
			}),
			className
		)
		const ariaSort: React.AriaAttributes['aria-sort'] = useMemo(() => {
			return orderType === OrderTypes.ASC
				? 'ascending'
				: orderType === OrderTypes.DESC
					? 'descending'
					: undefined
		}, [orderType])
		const iconDirection = useMemo(() => {
			if (orderBy === orderByField) {
				return ariaSort === 'descending' ? 'down' : 'up'
			}
			return undefined
		}, [orderBy, orderByField, ariaSort])
		return (
			<th
				data-sortable={handleSort ? 'true' : 'false'}
				role="columnheader"
				scope="col"
				tabIndex={-1}
				data-key={name}
				aria-sort={ariaSort}
				className={classes}
				onClick={handleSort ? () => handleSort(orderByField ?? name) : undefined}
				{...props}
			>
				{name}
				{handleSort && (
					<TableIcon
						aria-hidden
						focusable="false"
						role="presentation"
						data-visible={orderBy === orderByField}
						data-direction={iconDirection}
						className="group-hover/th:text-azul-500 ms-2 mb-px inline-block aspect-square w-3 stroke-2 text-inherit opacity-0 transition-transform duration-300 group-hover/th:opacity-100 data-[direction=down]:rotate-180 data-[visible=true]:opacity-100"
					/>
				)}
			</th>
		)
	}
)

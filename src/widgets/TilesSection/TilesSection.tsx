// import { navigation } from '@/routes/navigation'
// import { TilesContainer } from './TilesContainer'
// import { TilesInvisible } from './TilesInvisible'
// import { TilesBox } from './TilesBox'
// import { TilesInvisibleInfo } from './TilesInvisibleInfo'
// import { TilesVisible } from './TilesVisible'

// type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

// export function TilesSection({ ...props }: Props) {
// 	return (
// 		<section {...props} className="w-full flex justify-center py-8 select-none">
// 			<TilesContainer>
// 				{navigation.map((nav, index) => (
// 					<TilesBox img={nav.img} key={nav.label}>
// 						<TilesInvisible>
// 							{nav.navs.map(info => (
// 								<TilesInvisibleInfo
// 									key={info.path}
// 									label={info.title}
// 									url={info.path}
// 								/>
// 							))}
// 						</TilesInvisible>
// 						<TilesVisible isPar={index} desc={nav.desc} title={nav.label} />
// 					</TilesBox>
// 				))}
// 			</TilesContainer>
// 		</section>
// 	)
// }

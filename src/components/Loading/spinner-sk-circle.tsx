import './spinner-sk-circle.css'
export function SpinnerSKCircle() {
	return (
		<div className="bg-black/10 flex flex-col gap-4 justify-center items-center inset-0 absolute z-50 text-black">
			<div className="sk-circle [&>div]:before:bg-naranja">
				<div className="sk-circle1 sk-child" />
				<div className="sk-circle2 sk-child" />
				<div className="sk-circle3 sk-child" />
				<div className="sk-circle4 sk-child" />
				<div className="sk-circle5 sk-child" />
				<div className="sk-circle6 sk-child" />
				<div className="sk-circle7 sk-child" />
				<div className="sk-circle8 sk-child" />
				<div className="sk-circle9 sk-child" />
				<div className="sk-circle10 sk-child" />
				<div className="sk-circle11 sk-child" />
				<div className="sk-circle12 sk-child" />
			</div>
			<p className="sk-text text-white">Procesando...</p>
		</div>
	)
}

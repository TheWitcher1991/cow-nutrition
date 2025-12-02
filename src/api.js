#!/usr/bin/env node

'use strict'

console.timeEnd('Launch')

module.exports = (() => {
	'use strict'

	const countR = D => Math.round(D / 2)

	const countS = R => Math.round(Math.PI * Math.pow(R, 2))

	const L = 100

	const Hay = 0.75

	const countHayIndicators = (D, H, P) => {
		const R = countR(D)

		const S = countS(R)

		const hayForHour = Math.round((Hay * L * 6) / 100)

		const hayWeight = Math.round(Hay * (10 * 60 * H) / 1000)
)
		const hayPrice = Math.round(hayWeight * P)

		return {
			R,
			S,
			hayForHour,
			hayWeight,
			hayPrice,
		}
	}

	document
		.querySelector('.apply__cow')
		.addEventListener('click', function () {
			const D = document.querySelector('#D').value
			const H = document.querySelector('#H').value
			const P = document.querySelector('#P').value
			const output = document.querySelector('.output')

			if (D.trim() === '' || H.trim() === '' || P.trim() === '') {
				alert('Введите все поля')
				return
			}

			const indicators = countHayIndicators(+D, +H, +P)

			const hayEl = document.querySelector('.hay')
			const REl = document.querySelector('.R')
			const SEl = document.querySelector('.S')
			const hayForHourEl = document.querySelector('.hayForHour')
			const hayWeightEl = document.querySelector('.hayWeight')
			const hayPriceEl = document.querySelector('.hayPrice')

			output.style.display = 'block'
			hayEl.innerHTML = `${Hay} г`
			REl.innerHTML = `${indicators.R} см`
			SEl.innerHTML = `${indicators.S} см2`
			hayForHourEl.innerHTML = `${indicators.hayForHour} кг`
			hayWeightEl.innerHTML = `${indicators.hayWeight} кг`
			hayPriceEl.innerHTML = `${indicators.hayPrice} руб`
		})

		document
		.querySelector('.reset__cow')
		.addEventListener('click', function () {
			const D = document.querySelector('#D')
			const H = document.querySelector('#H')
			const P = document.querySelector('#P')
			const output = document.querySelector('.output')

			D.value = ''
			H.value = ''
			P.value = ''
			output.style.display = 'none'
		})
})(0)

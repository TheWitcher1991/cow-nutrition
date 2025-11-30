#!/usr/bin/env node

'use strict'

console.timeEnd('Launch')

module.exports = (() => {
	'use strict'

	const countR = D => Math.round(D / 2)

	const countS = R => Math.PI * Math.pow(R, 2)

	const L = 100

	const Hay = 0.75

	const countHayIndicators = (D, H, P) => {
		R = countR(D)

		S = countS(R)

		const hayForHour = (Hay * L * 6) / 100

		const hayWeight = Hay * (10 * 60 * H)

		const hayPrice = hayWeight * P

		return {
			hayForHour,
			hayWeight,
			hayPrice,
		}
	}

	document
		.querySelector('.apply__cow')
		.addEventListener('click', function () {
			const D = +document.querySelector('#D').value
			const H = +document.querySelector('#H').value
			const P = +document.querySelector('#P').value

			const indicators = countHayIndicators(D, H, P)
		})
})(0)

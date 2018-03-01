// https://github.com/jniac/js-stack

export class Stack {

	constructor() {

		if (!Stack.weakMap)
			Stack.weakMap = new WeakMap()

		Stack.weakMap.set(this, [])

	}

	add(...callbacks) {

		callbacks = callbacks.filter(v => v)

		Stack.weakMap.get(this).push(...callbacks)

		return callbacks

	}

	remove(...callbacks) {

		let array = Stack.weakMap.get(this)
		let count = 0
		
		for (let callback of callbacks) {

			while (true) {

				let index = array.indexOf(callback)

				if (index === -1)
					break

				array.splice(index, 1)

				count++

			}

		}

		return count

	}

	execute({ params = null, thisArg = null } = {}) {

		let array = Stack.weakMap.get(this)
		let tmp = array.concat()

		// dump array and execute the callbacks
		// callbacks that do not return false are kept to the next execution
		array.length = 0
		array.unshift.apply(array, tmp.filter(callback => callback.apply(thisArg, params) != false))

		return this

	}

	dump({ params = null, thisArg = null } = {}) {

		for (let callback of Stack.weakMap.get(this))
			callback.apply(thisArg, params)

		this.clear()

		return this

	}

	clear() {

		Stack.weakMap.get(this).length = 0

		return this

	}

	dumpWhile(duration, { params = null, thisArg = null, now = null } = {}) {

		let array = Stack.weakMap.get(this)

		let t = performance.now()

		while (performance.now() - t < duration && array.length)
			array.shift().apply(thisArg, params)

		return performance.now() - t

	}

	get length() { return Stack.weakMap.get(this).length }

}

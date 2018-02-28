class Stack {

	constructor() {

		if (!Stack.weakMap)
			Stack.weakMap = new WeakMap()

		Stack.weakMap.set(this, [])

	}

	add(callback) {

		Stack.weakMap.get(this).push(callback)

		return callback

	}

	remove(callback) {

		let array = Stack.weakMap.get(this)
		let count = 0
		
		while (true) {

			let index = array.indexOf(callback)

			if (index === -1)
				break

			array.splice(index, 1)

			count++

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

	}

	dumpWhile(duration, { params = null, thisArg = null, now = null } = {}) {

		let array = Stack.weakMap.get(this)

		let t = performance.now()

		while (performance.now() - t < duration && array.length)
			array.shift().apply(thisArg, params)

		return performance.now() - t

	}

	clear() {

		Stack.weakMap.get(this).length = 0

	}

	get length() { return Stack.weakMap.get(this).length }

}

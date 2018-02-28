# js-stack

[test.html](http://htmlpreview.github.io/?https://github.com/jniac/js-stack/blob/master/test.html)

example:
```javascript
import { Stack } from './stack.js'

let stack = new Stack()

let callback = stack.add(() => console.log('hello there'))

stack.execute()

stack.remove(callback)
```





test:
```javascript

let stack = new Stack()
stack.add(() => console.log(`i'm the first!`))
let f = stack.add((function(){

	let count = 0

	return function() {

		let index = count++

		stack.add(() => console.log('auto-add callback!', index))

	}

})())

stack.execute()
stack.execute()
stack.execute()

stack.remove(f)
stack.execute()
stack.execute()

stack.clear()

for (let i = 0; i < 1e6; i++)
	stack.add(x => Math.sin(Math.cos(x ** x) + x) - x + x / x)

console.log(stack.length)
stack.dumpWhile(100, { params: [Math.E] })
console.log(stack.length)
```

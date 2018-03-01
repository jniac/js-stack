# js-stack

minimal js line to provide an execution stack (an array of callbacks)  
functional, **but** must have a look on performance, `dumpWhile` is very slow (for the time being, Stack.dumpWhile is not performance oriented but convenience oriented)) 

[test.html](http://htmlpreview.github.io/?https://github.com/jniac/js-stack/test.html)

example:
```javascript
import { Stack } from './stack.js'

let stack = new Stack()

function foo() {

	console.log('foo!')
	
}

stack.add(foo)

let [callback] = stack.add(() => console.log('hello there'))

stack.execute() // print "foo!", "hello there"

stack.remove(foo)
stack.remove(callback)

stack.execute() // nothing happened
```

### one or more pattern
stack.add() & stack.remove() can take one or more arguments:

```javascript
let stack = new Stack()

let callbacks = stack.add(() => console.log('first'), () => console.log('second'), () => console.log('third'))

stack.execute() // print "first", "second", "third"

stack.remove(...callbacks)

stack.execute() // nothing happened
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

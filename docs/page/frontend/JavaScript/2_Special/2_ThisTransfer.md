# apply|call|bind

通过下面进行举例

```javascript
function fn(a, b, c) {
    console.log(this, 'this')
    console.log(a + b + c + this.x + this.y + this.z)
}
let obj = {
    x: 1,
    y: 2,
    z: 3
}
// this 指向的为window
fn()
```

## apply

-   this 会变成传入的 obj
-   传入的参数必须是一个数组
-   改变 this 指向后，原函数会立即执行，并且 apply 只是改变 this 指向一次
-   apply 的第一个参数为 null 或是 undefined 时，默认指向 window

```javascript
// this指向的是obj
fn.apply(obj, [1, 2, 3]) // 12
```

## call

-   传入的是一个参数列表
-   改变 this 指向后，原函数会立即执行，并且 call 只是改变 this 指向一次
-   call 的第一个参数为 null 或是 undefined 时，默认指向 window

```javascript
// this指向的是obj
fn.bind(obj, 1, 2, 3) // 12
```

## bind

-   改变 this 指向后不会立即执行
-   返回值是一个永久改变 this 指向的函数
-   可以分多次传入参数，但参数个数需要对应

```javascript
// this指向的是obj
const fn2 = fn.bind(obj, 1, 2, 3)
fn2() // 12
const fn3 = fn.bind(obj)
fn3(1, 2, 3) // 12
const fn4 = fn.bind(obj, 1)
fn3(2, 3) // 12
```

## 特殊

1. 如果在使用 apply、call、bind 方法时没有传递 thisArg 参数或者传递了 null 或 undefined，那么默认的上下文将是全局对象（在浏览器环境中，通常是 window 对象）。
2. 如果使用 bind 方法绑定了函数的上下文后，再使用 apply 或 call 方法调用这个函数，那么绑定的上下文将会被忽略，仍然使用传递给 bind 方法的上下文。
3. 如果使用 bind 方法绑定了函数的上下文后，再使用 new 操作符创建实例，那么绑定的上下文将被忽略，而是创建一个新的对象作为 this，并且原函数中的 this 将会指向这个新对象。

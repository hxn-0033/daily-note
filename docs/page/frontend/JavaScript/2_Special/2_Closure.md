# 闭包

## 定义

闭包的定义：闭包是指那些能够访问自由变量的函数。

自由变量：自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

闭包 = 函数 + 函数能够访问的自由变量

::: tip

在《JavaScript 权威指南》中就讲到：从技术的角度讲，所有的 JavaScript 函数都是闭包。

:::

## 分析

举例：

```javascript
var scope = 'global scope'
function checkscope() {
    var scope = 'local scope'
    function f() {
        return scope
    }
    return f
}
var foo = checkscope()
foo()
```

简要的执行过程：

1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
2. 全局执行上下文初始化
3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
4. checkscope 执行上下文初始化，创建变量对象、作用域链、this 等
5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
7. f 执行上下文初始化，创建变量对象、作用域链、this 等
8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

## 闭包的优点

1. 保护变量：闭包可以将变量封装在函数内部，避免全局污染，保护变量不被外部访问和修改。
2. 延长变量生命周期：闭包使得函数内部的变量在函数执行完后仍然存在，可以在函数外部继续使用。
3. 实现模块化：闭包可以创建私有变量和私有方法，实现模块化的封装和隐藏，提高代码的可维护性和安全性。
4. 保持状态：闭包可以捕获外部函数的变量，并在函数执行时保持其状态。这使得闭包在事件处理、回调函数等场景中非常有用。

## 闭包的缺点

1. 内存占用：闭包会导致外部函数的变量无法被垃圾回收，从而增加内存占用。如果滥用闭包，会导致内存泄漏问题。
2. 性能损耗：闭包涉及到作用域链的查找过程，会带来一定的性能损耗。在性能要求高的场景下，需要注意闭包的使用。

## 闭包的特性

1. 函数嵌套：闭包的实现依赖于函数嵌套，即在一个函数内部定义另一个函数。
2. 记忆外部变量：闭包可以记住并访问外部函数的变量，即使外部函数已经执行完毕。
3. 延长作用域链：闭包将外部函数的作用域链延长到内部函数中，使得内部函数可以访问外部函数的变量。
4. 返回函数：闭包通常以函数的形式返回，使得外部函数的变量仍然可以被内部函数引用和使用。

## 内存泄漏的解决方案

不使用时，可以手动销毁全局变量和内层函数的引用。如 fn = null;就可以回收相应的内存空间。

## 闭包的应用场景

1. 自执行函数

```javascript
let say = (function () {
    let val = 'hello world'
    function say() {
        console.log(val)
    }
    return say
})()
```

2. 节流防抖

```javascript
// 节流函数封装
function throttle(func, delay) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, arguments)
                timer = null
            }, delay)
        }
    }
}
// 防抖函数封装
function debounce(func, delay) {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, arguments)
        }, delay)
    }
}
```

3.函数柯里化

```javascript
//柯里化前
function add(a, b, c) {
    return a + b + c
}
console.log(add(1, 2, 3)) //6
//柯里化后
function addCurried1(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}
//箭头函数简写
const addCurried2 = (a) => (b) => (c) => a + b + c
console.log(addCurried1(1)(2)(3)) //6
console.log(addCurried2(1)(2)(3)) //6
```

4. 发布-订阅模式

```javascript
function createPubSub() {
    // 存储事件及其对应的订阅者
    const subscribers = {}
    // 订阅事件
    function subscribe(event, callback) {
        // 如果事件不存在，则创建一个新的空数组
        if (!subscribers[event]) {
            subscribers[event] = []
        }
        // 将回调函数添加到订阅者数组中
        subscribers[event].push(callback)
    }
    // 发布事件
    function publish(event, data) {
        // 如果事件不存在，则直接返回
        if (!subscribers[event]) {
            return
        }
        // 遍历订阅者数组，调用每个订阅者的回调函数
        subscribers[event].forEach((callback) => {
            callback(data)
        })
    }
    // 返回订阅和发布函数
    return {
        subscribe,
        publish
    }
}

// 使用示例
const pubSub = createPubSub()

// 订阅事件
pubSub.subscribe('event1', (data) => {
    console.log('订阅者1收到事件1的数据:', data)
})
pubSub.subscribe('event2', (data) => {
    console.log('订阅者2收到事件2的数据:', data)
})

// 发布事件
pubSub.publish('event1', 'Hello') // 输出: 订阅者1收到事件1的数据: Hello
pubSub.publish('event2', 'World') // 输出: 订阅者2收到事件2的数据: World
```

5. 迭代器

```javascript
function createIterator(arr) {
    let index = 0
    return {
        next: function () {
            if (index < arr.length) {
                return {
                    value: arr[index++],
                    done: false
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}

const myIterator = createIterator([1, 2, 3])
console.log(myIterator.next()) // { value: 1, done: false }
console.log(myIterator.next()) // { value: 2, done: false }
console.log(myIterator.next()) // { value: 3, done: false }
console.log(myIterator.next()) // { done: true }
```

6. hooks

useRequest、useTable、usePagination...

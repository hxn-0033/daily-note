# 类型判断

## 数据类型

基本数据类型：String、Number、Boolean、Null、Undefined、Symbol

引用数据类型：Object、Array、Function、RegExp、Date、Error 等

## typeof

::: tip

typeof 是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。

:::

typeof 可以正常检测出：number、boolean、string、object、function、undefined、symbol、bigint

```javascript
console.log(typeof 1) // number
console.log(typeof true) // boolean
console.log(typeof 'yayu') // string
console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof window) // object
console.log(typeof document) // object
console.log(typeof new Date()) // object
console.log(typeof new RegExp()) // object
console.log(typeof new Error()) // object
console.log(typeof null) // object
console.log(
    typeof new Promise((resolve) => {
        resolve()
    })
) // object
console.log(typeof function () {}) // function
console.log(typeof Promise) // function
console.log(typeof undefined) // undefined
console.log(typeof aaa) // 未声明的变量 undefined
console.log(typeof Symbol('sym')) // symbol
console.log(typeof BigInt(1)) // bigint
```

::: tip

缺点：typeof 在判断一个 object 的数据返回的都是 object, 而不能细致的具体到是哪一种。所以要 想区分对象、数组、null，单纯使用 typeof 是不行的。

:::

## instanceof

instanceof 这个方法主要是用来准备的检测引用数据类型的（不能用来直接检测基本数据类型，除非使用了 new Number() / new String()...），用来检测构造函数的 prototype 属性是否出现在对象原型链中的任意位置。表示 对象是否为某个构造函数的实例。

```javascript
// 判断 p 是否为 Person 的实例
function Person(name) {
    this.name = name
}
const p = new Person('sunshine')
// 这里的 p 是 Person 函数构造出来的，所以顺着 p 的原型链可以找到 Object 的构造函数
console.log(p instanceof Person) // true

const func = () => {}
console.log(func instanceof Function) // true
const obj = {}
console.log(obj instanceof Object) // true
const arr = []
console.log(arr instanceof Array) // true
```

缺点：

-   对于基本类型的数据，instanceof 是不能直接判断它的类型的， 还有 null 和 undefined
-   因为原型链继承的关系，instanceof 会把数组都识别为 Object 对象，所有引用类型的祖先都是 Object 对象

补充：

-   instanceof 的原理是 检查右边构造函数的 prototype 属性，是否在左边对象的原型链上；只要处于原型链中，判断永远为 true。
-   有一种特殊情况，就是左边对象的原型链上，只有 null 对象。这时，instanceof 判断会失真；因为 Object 不在 null 原型链上

## Object.prototype.toString.call()

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。

对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

注意：
Object.prototype.toString()本身是允许被修改的，而我们目前所讨论的关于 Object.prototype.toString()这个方法的应用都是假设 toString()方法未被修改为前提的。

```javascript
console.log(Object.prototype.toString.call('1')) // "[object String]"
console.log(Object.prototype.toString.call(1)) // "[object Number]"
console.log(Object.prototype.toString.call(true)) // "[object Boolean]"
console.log(Object.prototype.toString.call(Symbol())) // "[object Symbol]"
console.log(Object.prototype.toString.call(undefined)) // "[object Undefined]"
console.log(Object.prototype.toString.call(null)) // "[object Null]"
console.log(Object.prototype.toString.call(function () {})) // "[object Function]"
console.log(Object.prototype.toString.call([])) // "[object Array]"
console.log(Object.prototype.toString.call({})) // "[object Object]"
console.log(Object.prototype.toString.call(new Date())) // "[object Date]"
console.log(Object.prototype.toString.call(new RegExp())) // "[object RegExp]"
console.log(Object.prototype.toString.call(new Error())) // "[object Error]"
console.log(Object.prototype.toString.call(document)) // "[object HTMLDocument]"
console.log(Object.prototype.toString.call(window)) // "[object global]"
```

## constructor

constructor 代表获取由哪个构造函数创建而出，可以检测出字面量方式创建的对象类型，因为字面方式创建，实际由对应类创建而出

```javascript
const arr = []
console.log(arr.constructor === Array) // true

const obj = {}
console.log(obj.constructor === Object) // true
```

注意：null 和 undefined 是没有 constructor 属性的，可以用其他方法判断。

## Array.isArray

isArray()是 Array 类型的一个静态方法，使用它可以判断一个值是否为数组。直接返回布尔值

```javascript
const arr = [1, 2, 3]
console.log(Array.isArray(arr)) //true
```

## 判断工具

```typescript
const { toString } = Object.prototype

/**
 * @description: 判断变量类型
 */
export const is = (val: unknown, type: string) => {
    return toString.call(val) === `[object ${type}]`
}
/**
 * @description: 判断是否是对象
 */
export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object')
}
/**
 * @description: 判断是否是数组
 */
export const isArray = (val: any): val is Array<any> => {
    return val && Array.isArray(val)
}
/**
 * @description: 判断是否是字符串
 */
export const isString = (val: unknown): val is string => {
    return is(val, 'String')
}
/**
 * @description: 判断是否是Number
 */
export const isNumber = (val: unknown): val is number => {
    return is(val, 'Number')
}
/**
 * @description: 判断是否是布尔值
 */
export const isBoolean = (val: unknown): val is boolean => {
    return is(val, 'Boolean')
}
/**
 * @description: 判断是否是Date
 */
export const isDate = (val: unknown): val is Date => {
    return is(val, 'Date')
}
/**
 * @description: 判断不是undefined
 */
export const isDefined = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined'
}
/**
 * @description: 判断是undefined
 */
export const isUnDefined = <T = unknown>(val?: T): val is T => {
    return !isDefined(val)
}
/**
 * @description: 判断是null
 */
export const isNull = (val: unknown): val is null => {
    return val === null
}
/**
 * @description: 判断是否是方法
 */
export const isFunction = (val: unknown): val is Function => {
    return typeof val === 'function'
}
/**
 * @description: 判断是否是异步
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
/**
 * @description: 判断是否为正则
 */
export const isRegExp = (val: unknown): val is RegExp => {
    return is(val, 'RegExp')
}
/**
 * @description: 判断是否是undefined和null
 */
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
    return isUnDefined(val) && isNull(val)
}
/**
 * @description: 判断是否是undefined或null
 */
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
    return isUnDefined(val) || isNull(val)
}
/**
 * @description: 判断是否为空字符串/空对象/空数组/空集合
 */
export const isEmpty = <T = unknown>(val: T): val is T => {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }
    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0
    }
    return false
}
/**
 * @description: 判断是否为空值
 */
export const isEmptyVal = (val: any): boolean => {
    return val === '' || val === null || val === undefined
}
/**
 * @description: 判断是否为window
 */
export const isWindow = (val: any): val is Window => {
    return typeof window !== 'undefined' && is(val, 'Window')
}
/**
 * @description: 判断是否为element
 */
export const isElement = (val: unknown): val is Element => {
    return isObject(val) && !!val.tagName
}
/**
 * @description: 判断是否为集合
 */
export const isMap = (val: unknown): val is Map<any, any> => {
    return is(val, 'Map')
}
```

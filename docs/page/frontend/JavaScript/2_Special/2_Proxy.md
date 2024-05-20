# Proxy

使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为。Proxy，可以重定义更多的行为，比如 in、delete、函数调用等。

Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
const proxy = new Proxy(target, handler)
```

## 示例

```javascript
const proxy = new Proxy(
    {},
    {
        // get可以接受三个参数，依次为目标对象、属性名、Proxy 实例本身
        get: function (obj, prop) {
            console.log('设置 get 操作')
            return obj[prop]
        },
        // set可以接受四个参数，依次为目标对象、属性名、属性值、Proxy 实例本身
        set: function (obj, prop, value) {
            console.log('设置 set 操作')
            obj[prop] = value
        }
    }
)
proxy.time = 35 // 设置 set 操作
console.log(proxy.time) // 设置 get 操作 // 35
```

## handler 中的属性

```javascript
{
  // 参数一：目标对象。参数二：属性名。参数三：Proxy 实例本身
  get(target, property, receiver) { },
  // 参数一：目标对象。参数二：属性名。参数三：属性值。参数四：Proxy 实例本身
  set(target, property, value, receiver) { },
  // 参数一：目标对象（函数）。参数二：被调用时的上下文对象。参数三：被调用时的参数数组。
  apply(target, thisArg, argumentsList) { },
  // 参数一：目标对象。参数二：constructor 的参数列表。参数三：Proxy 实例本身。
  construct(target, argumentsList, newTarget) { },
  // 参数一：目标对象。参数二：属性名。参数三：待定义或修改的属性的描述符。
  defineProperty(target, property, descriptor) { },
  // 参数一：目标对象。参数二：属性名。
  deleteProperty(target, property) { },
  // 参数一：目标对象。参数二：属性名。
  getOwnPropertyDescriptor(target, prop) { },
  // 参数一：目标对象。参数二：属性名。
  has(target, prop) { },
  // 参数一：目标对象。
  isExtensible(target) { },
  // 参数一：目标对象。
  ownKeys(target) { },
  // 参数一：目标对象。
  preventExtensions(target) { },
  // 参数一：目标对象。
  getPrototypeOf(target) { },
  // 参数一：目标对象。参数二：对象新原型或为 null。
  setPrototypeOf(target, prototype) { }
}
```

## watch API 优化

```javascript
;(function () {
    const root = this

    function watch(target, func) {
        const proxy = new Proxy(target, {
            get: function (target, prop) {
                return target[prop]
            },
            set: function (target, prop, value) {
                target[prop] = value
                func(prop, value)
            }
        })

        return proxy
    }

    this.watch = watch
})()

const obj = {
    value: 1
}
const newObj = watch(obj, function (key, newvalue) {
    if (key == 'value') document.getElementById('container').innerHTML = newvalue
})
document.getElementById('button').addEventListener('click', function () {
    newObj.value += 1
})
```

## defineProperty 和 proxy 区别

当使用 defineProperty，修改原来的 obj 对象就可以触发拦截，而使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截。

-   Proxy 是一个对象的代理，Object.defineProperty 只能代理某个属性
-   Proxy 可以在读取时递归代理，Object.defineProperty 只能在创建时递归所有
-   对象上新增属性，Proxy 可以监听到，Object.defineProperty 不能
-   数组修改，Proxy 可以监听到, object.defineProperty 不能
-   Proxy 兼容性差

# 函数柯里化

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

也就是我们给一个函数传入一部分参数，此时就会返回一个函数来接收剩余的参数。

## 柯里化的用途

参数复用：

```javascript
// 未柯里化
function uri(protocol, hostname, pathname) {
    return `${protocol}${hostname}${pathname}`
}
const uri1 = uri('https://', 'www.csdn.net', '/blog')
console.log(uri1)

// 在这个函数中，protocol这个参数可能每个url都会用到，会造成参数重复。
// 柯里化
function uri_curring(protocol) {
    return function (hostname, pathname) {
        return `${protocol}${hostname}${pathname}`
    }
}

const uri_https = uri_curring('https://')
console.log(uri_https)
const uri1 = uri_https('www.csdn.net', '/blog')
console.log(uri1)
```

## 自动柯里化

```javascript
function myCurried(fn) {
    return function curry(...args1) {
        if (args1.length >= fn.length) {
            return fn.call(null, ...args1)
        } else {
            return function (...args2) {
                return curry.apply(null, [...args1, ...args2])
            }
        }
    }
}

function sum(a, b, c, d, e) {
    return a + b + c + d + e
}
let resFunc = myCurried(sum)
console.log(resFunc(1, 3, 4)(1)(23)) // 32
```

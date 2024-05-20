# 数组最大值和最小值

## 通过 prototype 属性扩展 min()函数和 max()函数

算法 1 的思路是在自定义 min()和 max()函数中，通过循环由第一个值依次与后面的值作比较，动态更新最大值和最小值，从而找到结果。

```javascript
const arr = [1, 8, 5, 4, 3, 9, 2]
// 最小值
Array.prototype.min = function () {
    let min = this[0]
    let len = this.length
    for (let i = 1; i < len; i++) {
        if (this[i] < min) min = this[i]
    }
    return min
}
// 最大值
Array.prototype.max = function () {
    let max = this[0]
    let len = this.length
    for (let i = 1; i < len; i++) {
        if (this[i] > max) max = this[i]
    }
    return max
}
// 结果
console.log(arr.min()) // 1
console.log(arr.max()) // 9
```

## 借助 Math 对象的 min()函数和 max()函数

算法 2 的主要思路是通过 apply()函数改变函数的执行体，将数组作为参数传递给 apply()函数。这样数组就可以直接调用 Math 对象的 min()函数和 max()函数来获取返回值。

```javascript
const arr = [1, 8, 5, 4, 3, 9, 2]
Array.min = function (array) {
    return Math.min.apply(Math, array)
}
// 最大值
Array.max = function (array) {
    return Math.max.apply(Math, array)
}
// 结果
console.log(Array.min(arr)) // 1
console.log(Array.max(arr)) // 9
```

## 算法 2 的优化

在算法 2 中将 min()函数和 max()函数作为 Array 类型的静态函数，但不支持链式调用，我们可以利用对象字面量进行简化。

与算法 2 不同的是，在验证时，因为 min()函数和 max()函数属于实例方法，所以可以直接通过数组调用。

代码中 apply()函数传入的第一个值为{},实际表示当前执行环境的全局对象。第二个参数 this 指向需要处理的数组。
由于 apply 函数的特殊性第一个参数，指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。所以也可以将第一个参数设置为 null、undefind。

```javascript
const arr = [1, 8, 5, 4, 3, 9, 2]
// 最小值
Array.prototype.min = function () {
    return Math.min.apply({}, this)
}
// 最大值
Array.prototype.max = function () {
    return Math.max.apply({}, this)
}
// 结果
console.log(arr.min()) // 1
console.log(arr.max()) // 9
```

## 借助 Array 类型的 reduce()函数

```javascript
const arr = [1, 8, 5, 4, 3, 9, 2]
// 最小值
Array.prototype.min = function () {
    return this.reduce((pre, cur) => {
        return pre < cur ? pre : cur
    })
}
// 最大值
Array.prototype.max = function () {
    return this.reduce((pre, cur) => {
        return pre > cur ? pre : cur
    })
}
// 结果
console.log(arr.min()) // 1
console.log(arr.max()) // 9
```

## 借助 Array 类型的 sort()函数

```javascript
const arr = [1, 8, 5, 4, 3, 9, 2]
let sortArr = arr.sort((a, b) => a - b)
// 最小值
sortArr[0]
// 最大值
sortArr[sortArr.length - 1]
// 结果
console.log(sortArr[0]) // 1
console.log(sortArr[sortArr.length - 1]) // 9
```

## 借助 ES6 的扩展运算符

```javascript
const arr = [1, 8, 5, 4, 3, 9, 2]
// 最小值
Math.min(...arr)
// 最大值
Math.max(...arr)
// 结果
console.log(Math.min(...arr)) // 1
console.log(Math.max(...arr)) // 9
```

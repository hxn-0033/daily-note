# 数组常用方法

## 1、toString()

返回由数组中每个值的字符串形式拼接成的一个以逗号分隔的字符串

```javascript
const arr = [1, 2, 3, 4, 5]
arr.toString() //"1,2,3,4,5"
```

## 2、valueOf()

返回数组对象本身

```javascript
const arr = [1, 2, 3, 4, 5]
arr.valueOf() //[1,2,3,4,5]
```

## 3、join()

将数组中所有元素组成字符串，并可以规定分隔符，默认以逗号分隔

```javascript
const arr = [1, 2, 3, 4, 5]
arr.join('-') //"1-2-3-4-5"
```

## 4、push()

在数组的尾部插入元素，会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
arr.push(6)
console.log(arr) //[1,2,3,4,5,6]
```

## 5、pop()

在数组的尾部删除一个元素，会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
console.log(arr.pop()) //5
console.log(arr) //[1,2,3,4]
```

## 6、unshift()

在数组的首部插入一个元素，会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
arr.unshift(6)
console.log(arr) //[6,1,2,3,4,5]
```

## 7、shift()

在数组的首部删除一个元素，会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
console.log(arr.shift()) //1
console.log(arr) //[2,3,4,5]
```

## 8、reverse()

反转数组的顺序，返回经过排序之后的数组，原数组发生改变

```javascript
const arr = [1, 2, 3, 4, 5]
console.log(arr.reverse()) //[5,4,3,2,1]
console.log(arr) //[5,4,3,2,1]
```

## 9、sort()

按字符串升序排列数组，sort 方法会调用每个数组项的 toString（）方法，比较得到字符串的排序，返回经过排序之后的数组，原数组发生改变

```javascript
const arr = [1, 2, 6, 4, 5]
console.log(arr.sort()) //[1,2,4,5,6]
console.log(arr) //[1,2,4,5,6]
```

::: tip

tips:可以使用 sort()方法创建一个随机数组

:::

```javascript
function compare() {
    return Math.random()
}
const array = [1, 2, 3, 4, 5]
console.log(array.sort(compare)) //[2,1,5,4,3]
```

## 10、concat()

基于当前数组所有项创建一个副本，没有参数时相当于浅拷贝，接收参数时将参数添加到副本的末尾。不影响原数组

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.concat(6, 7)
console.log(res) //[1,2,3,4,5,6,7]
```

## 11、slice()

基于当前数组创建一个新数组，接收两个参数：返回项的起始位置和结束位置。不影响原数组

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.slice(1, 3)
console.log(res) //[2,3]
console.log(arr) //[1,2,3,4,5]
```

## 12、splice()

可以删除、插入、替换数组的数据，会改变原数组

```javascript
// 删除功能，第一个参数为第一项位置，第二个参数为要删除几个（不传递默认删除起始位置到数组末尾）。
const arr = [1, 2, 3, 4, 5]
console.log(arr.splice(3)) //[4,5]
console.log(arr) //[1,2,3]

const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.splice(3, 1)) //[4]
console.log(arr2) //[ 1, 2, 3, 5 ]

// 插入功能， 第一个参数为第一项位置，第二个参数（0，表示不删除），第三个参数（插入任意数量的项）
const arr = [1, 2, 3, 4, 5]
console.log(arr.splice(3, 0, 6, 7)) //[]
console.log(arr) //[1,2,3,6,7,4,5]

// 替换功能， 第一个参数为第一项位置，第二个参数（删除的项数），第三个参数（插入任意数量的项）
const arr = [1, 2, 3, 4, 5]
console.log(arr.splice(2, 2, 6, 7, 8)) //[ 3, 4 ]
console.log(arr) //[ 1, 2, 6, 7, 8, 5 ]
// 表示从下标2开始删除2个元素(3和4)，然后在该位置位置处插入6,7,8
// 可以替换一个 或者 替换多个
```

## 13、indexOf()

返回以 参数 的下标，没有找到返回-1

```javascript
const arr = [1, 2, 3, 4, 5]
console.log(arr.indexOf(6)) //-1
console.log(arr.indexOf(5)) //4
```

## 14、reduce()

reduce(参数一：执行操作的函数，参数二：初始值（可选）),会依次处理每个元素

执行操作的函数的参数：

-   初始变量，默认为数组的第一个元素值，第一次执行后的返回值作为函数第二次执行的初始变量
-   当前变量
-   当前变量对应的元素在数组中的索引（可选）
-   原数组对象（可选）

```javascript
//求和
const arr = [1, 2, 3, 4, 5]
const sum = arr.reduce((prev, cur) => {
    return prev + cur
}, 0)
console.log(sum) //15

// 实现数组的扁平化
const matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
]
const arr = matrix.reduce((prev, cur) => {
    return prev.concat(cur)
})
console.log(arr) //[1,2,3,4,5,6]
```

## 15、map()

map()方法对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组

```javascript
const arr = [1, 2, 3]
const res = arr.map((item, index) => {
    return item * item
})
console.log(res) //[1,4,9]
```

## 16、forEach()

遍历数组

```javascript
const arr = [1, 2, 3]
arr.forEach((item) => {
    console.log(item)
})
```

## 17、filter()

用于查询符合条件的所有数组项；对数组中的每一项运行给定函数，返回 true 的项组成的数组

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.filter((item) => item > 3)
console.log(res) //[4,5]
```

## 18、find()

用于找到数组中第一个满足条件的元素，则返回 该元素 , 剩余的元素不会再执行检测，未找到返回 undefined
不会对空数组进行检测、也不会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.find((item) => item === 3)
console.log(res) // 3
const res2 = arr.find((item) => item === 7)
console.log(res2) // undefined
```

## 19、findIndex()

用于找到数组中第一个满足条件的元素，则返回 该元素下标 , 剩余的元素不会再执行检测，未找到返回 -1
不会对空数组进行检测、也不会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.findIndex((item) => item === 3)
console.log(res) // 2
const res2 = arr.findIndex((item) => item === 7)
console.log(res2) // -1
```

## 20、some()

用于检测数组中的元素是否满足指定条件，如果有一个元素满足条件，则表达式返回 true , 剩余的元素不会再执行检测，没有满足条件的元素，则返回 false。

不会对空数组进行检测、也不会改变原数组

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.some((item) => item === 3)
console.log(res) // true
```

## 21、every()

用于数组中的每一项是否符合判断条件，返回布尔值，全部满足返回 true，有一项不满足返回 false。

```javascript
const arr = [1, 2, 3, 4, 5]
const res = arr.every((item) => item > 1)
console.log(res) // false
```

## 22、Array.from()

数组、类数组对象、或者是字符串、map 、set 等可迭代对象 上进行有用的转换。

通常使用数组去重 结合 Set 使用

```javascript
console.log(Array.from('Hey')) // ['H', 'e', 'y']
console.log(Array.from(new Set(['one', 'two']))) // ['one', 'two']

const map = new Map()
map.set('one', 1)
map.set('two', 2)
console.log(Array.from(map)) // [['one', 1], ['two', 2]]

// 浅拷贝数组
const numbers = [3, 6, 9]
console.log(Array.from(numbers)) // [ 3, 6, 9 ]
```

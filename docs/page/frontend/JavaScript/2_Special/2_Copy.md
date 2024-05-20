# 深拷贝和浅拷贝

（1）简单类型的数据在变量中直接存的就是值（栈里面直接开辟一个存储空间，存放的就是其值的本身）。

（2）复杂类型的数据在变量中存的是内存地址（在栈里存放的是地址[十六进制表示] ，这个地址再指向堆里面的数据[真正的对象实例是放到堆里面的]），由于复杂数据类型存储时变量中所存储的是内存地址（引用），因此又叫它引用数据类型。

## 浅拷贝

会在栈中开辟另一块空间，并将被拷贝对象的栈内存数据完全拷贝到该块空间中，即基本数据类型的值会被完全拷贝，而引用类型的值则是拷贝了“指向堆内存的地址”。

### 对象和数组：Object.assign(target, …sources)

```javascript
const obj = {
    x: 1,
    y: 2,
    z: {
        num: 10
    }
}
const newObj = {}
Object.assign(newObj, obj)
newObj.y = 3
console.log(obj) // { x: 1, y: 2, z: { num: 10 } }
console.log(newObj) // { x: 1, y: 3, z: { num: 10 } }
```

注意：

-   Object.assign()不会拷贝对象的继承属性；
-   Object.assign()不会拷贝对象的不可枚举的属性；
-   Object.assign()可以拷贝 Symbol 类型的属性。

### 对象和数组：扩展运算符(…)

```javascript
/* 对象的拷贝 */
const obj = {
    a: 1,
    b: {
        c: 1
    }
}
const obj2 = {
    ...obj
}
obj.a = 2
console.log(obj) // { a: 2, b: { c: 1 } }
console.log(obj2) // { a: 1, b: { c: 1 } }

obj.b.c = 2
console.log(obj) // { a: 2, b: { c: 2 } }
console.log(obj2) // { a: 1, b: { c: 2 } }

/* 数组的拷贝 */
const arr = [1, { a: 2 }]
const newArr = [...arr] // 跟arr.slice()是一样的效果
arr[0] = 9
arr[1].a = 8
console.log(arr) // [ 9, { a: 8 } ]
console.log(newArr) // [ 1, { a: 8 } ]
```

注意：扩展运算符 和 object.assign 有同样的缺陷，也就是实现的浅拷贝的功能差不多，但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。

### 数组：Array.concat()

```javascript
const obj1 = ['Chinese', { name: 'zs' }, 'French']
const obj2 = obj1.concat()
obj2[1].name = 'ls'
obj2[2] = 'China'
console.log(obj1)[('Chinese', { name: 'ls' }, 'French')]
console.log(obj2)[('Chinese', { name: 'ls' }, 'China')]
```

注意：数组的 concat 方法其实也是浅拷贝，所以连接一个含有引用类型的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。不过 concat 只能用于数组的浅拷贝，使用场景比较局限。

### 数组：Array.slice()

```javascript
const arr = [2, 4, 6, { y: 10 }]
const newArr = arr.slice()
newArr[0] = 10
newArr[3].x = 20
newArr[3].y = 30
console.log(arr) // [ 2, 4, 6, { y: 30, x: 20 } ]
console.log(newArr) // [ 10, 4, 6, { y: 30, x: 20 } ]
```

注意：slice 方法也比较有局限性，因为它仅仅针对数组类型。slice 方法会返回一个新的数组对象，这一对象由该方法的前两个参数来决定原数组截取的开始和结束位置，是不会影响和改变原始数组的。但是，数组元素是引用类型的话，也会影响到原始数组。

## 深拷贝

深拷贝是拷贝多层，每一级别的数据都会拷贝出来。

### JSON.parse(JSON.stringify(obj))

用 JSON.stringify 将对象转成 JSON 字符串，再用 JSON.parse()
把字符串解析成对象。而且对象会开辟新的栈，实现深拷贝。

```javascript
const a = { name: '张三', like: ['打篮球', '唱歌', '跳舞'] }
const b = JSON.parse(JSON.stringify(a))
a.name = '李四'
a.like[0] = '睡觉'
console.log(a) // { name: '李四', like: [ '睡觉', '唱歌', '跳舞' ] }
console.log(b) // { name: '张三', like: [ '打篮球', '唱歌', '跳舞' ] }
```

缺点：

-   拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
-   拷贝 Date 引用类型会变成字符串；
-   无法拷贝函数；
-   无法拷贝不可枚举的属性；
-   无法拷贝对象的原型链；
-   拷贝 RegExp 引用类型会变成空对象；
-   对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
-   无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。

### 递归方法

```javascript
const deepCopy = function (obj) {
    if (typeof obj !== 'object') return
    var newObj = obj instanceof Array ? [] : {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return newObj
}
```

### 函数库 lodash

```javascript
import { cloneDeep } from 'lodash'
const obj = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
}
const newObj = cloneDeep(obj)
console.log(obj.b.f === newObj.b.f) // false
```

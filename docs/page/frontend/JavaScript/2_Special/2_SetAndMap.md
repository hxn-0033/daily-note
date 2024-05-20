# 集合-Set 和 字典-Map

集合是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

字典是一些元素的集合。每个元素有一个称作 key 的域，不同元素的 key 各不相同

-   共同点：集合、字典都可以存储不重复的值

-   不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

## 集合-Set

1. 只能保存值没有键名
2. 严格类型检测如字符串数字不等于数值型数字, 1 和 '1' 被认为是不同的值
3. 值是唯一的，基于这个特性可以用于去重
4. 遍历顺序是添加的顺序，方便保存回调函数
5. Set 构造函数传入的参数只能是可迭代对象，如：数组、字符串
6. Set 可以与 Array 进行互相转换，也可以把 String 转换为 Set 类型
7. 扩展运算符和 Set 结构相结合实现数组或字符串去重

### 常见的方法

| 方法      | 说明                                              | 示例                   |
| --------- | ------------------------------------------------- | ---------------------- |
| has()     | 判断是否有该值，返回布尔值                        | set.has('name')        |
| add()     | 向 Set()添加元素，若有相同会覆盖                  | set.add('name', 'zxc') |
| delete()  | 用于删除某个元素，成功则返回 true，失败返回 false | set.deldect('name')    |
| clear()   | 用于清空 Set() 中所有的成员，没有返回值           | set.clear()            |
| size 属性 | 判断 Set() 有多少个元素                           | set.size               |

```javascript
const set = new Set()
const arr = [1, 2]
set.add(1).add(arr)
set.add(function () {
    console.log(123)
})
set.add({})
console.log(set) // { 1, [ 1, 2 ], [Function (anonymous)], {} }

// has() 判断元素
console.log(set.has(arr)) // true

// size 判断长度
console.log(set.size) // 4

// delete 删除
console.log(set.delete(1)) // true
console.log(set.delete(arr)) // true,set中存储的对象，只能删除这种有明确地址索引的，不然只能用clear()

// clear 清除
set.clear()
console.log(set) // {}
```

### 顺序与迭代

| 方法      | 说明                             | 示例                            |
| --------- | -------------------------------- | ------------------------------- |
| keys()    | 返回键的遍历器                   | set.keys()                      |
| values()  | 返回值的遍历器                   | set.values()                    |
| entries() | 返回所有成员的遍历器，包含键，值 | set.entries()                   |
| forEach() | 遍历 Set 的所有成员              | set.forEach(function(), [this]) |

**由于 Set 结构没有键名，所以其键名和键值是一致的**

```javascript
 const set = new Set(['张三', '李四', '王五', 'true']);
 // 遍历键
 console.log(set.keys());  // { '张三', '李四', '王五', 'true' }
 // 遍历值
 console.log(set.values());  // { '张三', '李四', '王五', 'true' }
 // 返回键值
 console.log(set.entries());
 /* {
   [ '张三', '张三' ],
   [ '李四', '李四' ],
   [ '王五', '王五' ],
   [ 'true', 'true' ]
 }*/
 ​
 // forEach() 循环
 const set = new Set(['张三', '李四', '王五', 'true'])
 set.forEach(function(value, key) {
     console.log(key + ':' + value);
 })
 /*
 张三:张三
 李四:李四
 王五:王五
 true:true
 */

// 也可以使用 for...of 或 for...in
 // 遍历值
 for (let value of set) { console.log(value);}
 // 遍历键
 for (let key in set) {console.log(key);}

```

### 类型转换

```javascript
// Array 转换为 Set
const arr = [1, 2, 3, 4]
const set = new Set(arr)
console.log(set) // { 1, 2, 3, 4 }

// Set 转换为 Array：可以通过扩展运算符 ... 来实现
const set = new Set([1, 2, 3, 4])
console.log([...set]) // [ 1, 2, 3, 4 ]
console.log(Array.from(set)) //  [ 1, 2, 3, 4 ]

// String 转换为 Set
const str = '张三'
const set = new Set(str)
console.log(set) // { '张', '三' }
```

### Set 的作用

1. 去重：利用 Set 不重复性可以用于数组的去重

```javascript
// 将数组转换为Set，再将Set转换为数组
const arr = [1, 1, 4, 1, 2, 3, 1, 2]
const set = new Set(arr)
console.log([...set]) // [ 1, 4, 2, 3 ]
```

2. 并集

```javascript
const arr1 = [1, 1, 4, '1', 2, 3]
const arr2 = [5, 1, '2']
const set = new Set([...arr1, ...arr2])
console.log([...set]) // [ 1, 4, '1', 2, 3, 5, '2' ]
```

## 字典-Map

Map 中键的范围不限于字符串类型，各种类型的值（包括对象）都可以当做是一个键或一个值

Map 数据结构的特性：

-   具有极快的查找速度
-   函数、对象、基本类型都可以作为键或值
-   Map 缺点就是不能使用 [] 和 点 来设置和获取键值，只能用 set 和 get 来替换

```javascript
// 必须是以这种方式创建
const map = new Map()

// 或者
const map = new Map([
    ['name', 'cyf'],
    ['age', 18]
])
console.log(map) // {"name" => "zxc", "age" => 18}
```

### Map 常用方法

| 方法      | 说明                                              | 示例                   |
| --------- | ------------------------------------------------- | ---------------------- |
| get()     | 通过键来获取值，如果没有该键，则返回 undefined    | map.get('name')        |
| has()     | 判断是否有该值，返回布尔值                        | map.has('name')        |
| set()     | 向 Set()添加元素，若有相同会覆盖                  | map.set('name', 'zxc') |
| delete()  | 用于删除某个元素，成功则返回 true，失败返回 false | map.deldect('name')    |
| clear()   | 用于清空 Map() 中所有的成员，没有返回值           | map.clear()            |
| size 属性 | 判断 Map() 有多少个元素                           | map.size               |

```javascript
 const map = new Map([
     ['namer', '张三'],
     ['age', 2]
 ]);
 ​
 // 获取namer
 console.log(map.get('namer')); // 张三
 ​
 // 判断namer
 console.log(map.has('age')); // 2
 ​
 // 设置键值对
 console.log(map.set('sex', '其它')); // { 'namer' => '张三', 'age' => 2, 'sex' => '其它' }
// 可连续设置
 console.log(map.set('id', 0).set('hobby', '讲段子'));
 ​
 // size属性，获取map长度
 console.log(map.size); // 5
 ​
 // 删除某个键
 console.log(map.delete('id')); // true
 ​
 // 清空map
 map.clear()
 console.log(map); // {}

```

### 顺序与迭代

| 方法      | 说明                             | 示例                            |
| --------- | -------------------------------- | ------------------------------- |
| keys()    | 返回键的遍历器                   | map.keys()                      |
| values()  | 返回值的遍历器                   | map.values()                    |
| entries() | 返回所有成员的遍历器，包含键，值 | map.entries()                   |
| forEach() | 遍历 Map 的所有成员              | map.forEach(function(), [this]) |

```javascript
 const map = new Map().set('namer', '张三').set('age', 2).set('sex', '其它')
 ​
 // 获取键
 const keys = map.keys()
 console.log(keys);
 ​
 // 获取值
 const values = map.values()
 console.log(values);
 ​
 // 获取键值对
 console.log(map.entries());  // { [ 'namer', '张三' ], [ 'age', 2 ], [ 'sex', '其它' ] }
 ​
 for (let [key, value] of map) {
     console.log(key + ':' + value);
 }
 // namer:张三
 // age:2
 // sex:其它
 ​
 // forEach 循环
 map.forEach(function(value, index) {
     console.log(index + ':' + value);
 })
 ​
 // namer:张三
 // age:2
 // sex:其它
```

### Object 和 Map 的区别

-   Object：字符串/Symbol 类型: 任意类型，Map： 任意类型: 任意类型
-   Object 是不能直接进行迭代的，Map 是可以迭代的，用 forEach 循环或 for...of
-   Object 获取对象长度需要对于其进行迭代，Map 保存对长度的跟踪，可直接使用 size
-   Object 使用 [] 和 点 来设置和获取键值， Map 不能
-   固定大小内存，Map 大约可以比 Object 多存储 50%的键值对

## WeakSet 的使用

WeakSet 结构同样不会存储重复的值，它的成员必须只能是对象类型的值

::: tip

WeakSet 的特性

(1). 垃圾回收不考虑 WeakSet，即被 WeakSet 引用时引用计数器不加一，所以对象不被引用时不管 WeakSet 是否在使用都将删除

(2). 因为 WeakSet 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行 forEach( )遍历等操作

(3). 也是因为弱引用，WeakSet 结构没有 keys( )，values( )，entries( )等方法和 size 属性

(4). 因为是弱引用所以当外部引用删除时，希望自动删除数据时使用 WeakSet

(5). WeakSet 没有 clear 方法 和 size 属性

:::

(1) WeakSet 的值必须为对象类型,若为其他类型会报错

```javascript
// 正确声明
const weakSet = new WeakSet([
    [1, 2],
    [3, 4]
])
// 错误声明
const weakSet1 = new WeakSet([1, 2]) //  Invalid value used in weak set
```

(2) 当使用 WeakSet 保存 DOM 节点时，当 DOM 节点删除时，WeakSet 会自动删除对 DOM 节点的引用，不用担心 dom 节点从文档中移除产生内存泄漏的问题。WeaSet 保存的对象不会增加引用计数器，如果一个对象不被引用了会自动删除。

```javascript
const set = new WeakSet()
const arr = ['zs', 'lisi']
set.add(arr, 123)
arr = null
console.log(set)
setTimeout(() => {
    console.log(set)
}, 1000)
```

## WeakMap 的使用

WeakMap 对象是一组键/值对的集

::: tip

(1) 键名必须是对象

(2) WeaMap 对键名是弱引用的，键值是正常引用

(3) 垃圾回收不考虑 WeaMap 的键名，不会改变引用计数器，键在其他地方不被引用时即删除

(4) 因为 WeakMap 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行 forEach( )遍历等操作
(5) 也是因为弱引用，WeaMap 结构没有 keys( )，values( )，entries( )等方法和 size 属性

(6) 当键的外部引用删除时，希望自动删除数据时使用 WeakMap
:::

(1) WeakMap 的值必须为对象类型,若为其他类型会报错

```javascript
const weakMap = new WeakMap()
// 正确声明
weakMap.set({ name: 'zs' }, 'lisi')
// 错误声明
weakMap.set(1, 2) // Invalid value used as weak map key
// at WeakMap.set (<anonymous>)
weakMap.set(null, 1) //  Invalid value used as weak map key
// at WeakMap.set (<anonymous>)
```

(2) 利用 WeakMap 保存 DOM 节点

```html
<body>
    <div>zs</div>
    <div>lisi</div>
</body>
<script>
    const map = new WeakMap()
    document.querySelectorAll('div').forEach((item) => map.set(item, item.innerHTML))
    console.log(map) //WeakMap {div => "zs", div => "lisi"}
</script>
```

(3) WakeMap 的键名对象不会增加引用计数器，如果一个对象不被引用了会自动删除。

```javascript
// 下例当 obj 删除时内存即清除，因为WeakMap是弱引用不会产生引用计数
const map = new WeakMap()
const obj = { name: 'zs' }
map.set(obj, 'zs')
obj = null

console.log(map)

setTimeout(() => {
    console.log(map)
}, 1000)
```

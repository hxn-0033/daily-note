# Object.assign

Object.assign()拷贝的是（可枚举）属性值。用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象

::: tip
在 JavaScript 中枚举属性简单来说就是指对象中的属性是否可以被遍历出来，是属性的 enumerable 值决定的
:::

## 基本用法

### 当 target 参数是对象，source 参数也是对象

其中 target 是目标对象，source 是源对象， 可以有多个源对象

```javascript
const target = { a: 1, b: 2 }
const source = { b: 3, c: 4 }
const source2 = { c: 5, d: 6 }

const currentTarget = Object.assign(target, source, source2)
console.log(currentTarget) // {a: 1, b: 3, c: 5, d: 6}
console.log(target) // {a: 1, b: 3, c: 5, d: 6}
```

::: tip

1. 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性
2. Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象
3. 注意目标自身也会改变

:::

### 当只有一个 target 对象时，直接返回该对象

```javascript
const target = { a: 1, b: 2 }
const currentTarget = Object.assign(target)
console.log(currentTarget) // {a: 1, b: 2}
```

### 当 target 为（数值/字符串/布尔值），会先转为对象返回

```javascript
const currentTarget = Object.assign(10) // Object.assign('10')
console.log(currentTarget)
// Number {10} / String {'10'} / Boolean {false}
```

::: tip

1. 如果 target 为字符串时，source 为字符串 会报错，source 为数值和布尔值不会报错，不影响 target 自身
2. 如果 target 不为字符串时，source 为其他类型 不影响 target 自身

:::

### 当 target 为对象，source 为（数值/字符串/布尔值）

除了字符串会以数组形式，拷贝入目标对象，其他值都不影响自身

```javascript
const source1 = 'aaa'
const source2 = false
const source3 = 666

const currentTarget = Object.assign({}, source1)
console.log(currentTarget) // {0: "a", 1: "a", 2: "a"}

const currentTarget2 = Object.assign({}, source2)
console.log(currentTarget2) // {}

const currentTarget3 = Object.assign({}, source3)
console.log(currentTarget3) // {}
```

### Symbol 类型的属性也会被拷贝

```javascript
const target = { a: '111' }
const source1 = { [Symbol('6')]: 666 }
const currentTarget = Object.assign(target, source1)
console.log(currentTarget)
//{a: "111", Symbol(6): 666}
```

### 继承属性和不可枚举属性是不能拷贝的

```javascript
const obj = Object.create(
    { foo: 1 }, // foo 是个继承属性。
    {
        bar: {
            value: 2 // bar 是个不可枚举属性。
        },
        baz: {
            value: 3,
            enumerable: true // baz 是个自身可枚举属性。
        }
    }
)
const currentTarget = Object.assign({}, obj)
console.log(currentTarget) // { baz: 3 }
```

### 出现异常会打断后续的 copy 任务

```javascript
const target = Object.defineProperty({}, 'foo', {
    value: 1,
    writable: false
}) // target 的 foo 属性是个只读属性。

Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 })
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar) // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2) // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo) // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3) // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz) // undefined，第三个源对象更是不会被拷贝到的。
```

### 嵌套对象，同名属性的替换

对于这种嵌套的对象，一旦遇到同名属性，是替换，而不是添加。

```javascript
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
const currentTarget = Object.assign(target, source)
console.log(currentTarget) // { a: { b: 'hello' } }
```

### 总结

0.  Object.assign()拷贝的是（可枚举）属性值

1.  当 target 参数是对象，source 参数也是对象
    -   target 与 source 属性具有相同的键，则属性将被 source 中的属性覆盖。后面的 source(xx)的属性将类似地覆盖前面的 source 的属性
    -   拷贝 source 自身的并且可枚举的属性到目标对象
    -   target 对象自身也会改变
    -   source 为对象时，仅仅只会复制其引用值
2.  当只有一个 target 对象时，直接返回该对象
3.  当 target 为（数值/字符串/布尔值），会先转为对象返回
    -   如果 target 为字符串时，source 为字符串 会报错，source 为数值和布尔值不会报错，不影响 target 自身
    -   如果 target 不为字符串时，source 为其他类型 不影响 target 自身
4.  当 target 为对象，source 为（数值/字符串/布尔值）
    -   除了字符串会以数组形式，拷贝入目标对象，其他值都不影响自身
5.  当 target 参数为 undefined || unll 时，无法转换为对象会报错

6.  当 source 参数为 undefined || unll 时，不会报错

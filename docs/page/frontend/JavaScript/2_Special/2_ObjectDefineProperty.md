# Object.defineProperty

## 引言

希望对 JS 中的一个属性进行比较精确的操作控制就需要使用到属性描述符，通过属性描述符可以精确的添加或者修改对象的属性。属性描述符需要使用 Object.defineProperty 来对属性进行添加或者修改。

## Object.defineProperty()

Object.defineproperty(obj, prop, desc) 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```javascript
// 返回值：被传递给函数的对象
Object.defineProperty(
    参数一：要定义属性的对象,
    参数二：要定义或修改的属性的名称或 Symbol,
    参数三：要定义或修改的属性描述符
)
```

## 属性描述符分类

configurable: 表示是否可再次修改配置项。

enumerable: 表示属性是否可以通过 for-in 或者 Object.keys()返回该属性。是否可被枚举。

value: 当前值，不设置默认为 undefined

writable: 表示该属性是否可以被赋值（修改，写入）。

get 是获取值的时候的方法，类型为 function ，获取值的时候会被调用，不设置时为 undefined

set 是设置值的时候的方法，类型为 function ，设置值的时候会被调用，undefined （get 或 set 不是必须成对出现，任写其一就可以）

|            | configurable | enumerable | value  | writable | get    | set    |
| ---------- | ------------ | ---------- | ------ | -------- | ------ | ------ |
| 数据描述符 | 可以         | 可以       | 可以   | 可以     | 不可以 | 不可以 |
| 存储描述符 | 可以         | 可以       | 不可以 | 不可以   | 可以   | 可以   |

```javascript
// ======== 示例一：不可删除 ========
const obj = {
    name: 'why',
    age: 18
    // 注意：使用 getter 或 setter 方法，不允许使用 writable 和 value 这两个属性(如果使用，会直接报错)
    // get address(){
    // return this._address;
    // },
    // set address(value){
    // this._address = value;
    // }
    // 要使用
}
Object.defineProperty(obj, 'address', {
    value: '北京', // 设置属性值，如果不设置默认值是 undefined
    // 如果都不写的话 默认都为 false
    configurable: false, // 是否可以被删除（是否可以再次配置），默认值是 false
    enumerable: false, // 是否可以枚举，默认值是 false
    writable: false // 是否可以被修改（修改，写入），默认值是 false
})
delete obj.address
console.log(obj.address) //输出北京

// ======== 示例二：不可再次配置 ========
Object.defineProperty(obj, 'address', {
    value: '南京',
    configurable: true
})
console.log(obj.address) //报错

// ======== 示例三：不可枚举 ========
console.log(obj) // 打印结果中没有北京
for (let value in obj) {
    console.log(value) // 打印不了北京
}
// ========示例四：不可被复制/重写 ========
obj.address = '上海'
console.log(obj.address) //还是北京
for (let value in obj) {
    console.log(value) //还是北京
}

// ======== 实例四：直接创建属性（都默认为 true） ========
const obj = {
    name: 'why',
    age: 18
}
obj.address = '上海'
// 下面三个参数默认都是 true
// configurable:true,
// enumerable:true,
// writable:true,
```

## 存取属性描述符 get set

属性描述符不可以有 value 以及 writable。

使用场景

-   隐藏真实属性，不希望被外界赋值与使用。
-   截获某一个属性它访问和设置值的过程。

```javascript
const obj = {
    name: 'why',
    age: 18,
    _address: '北京' // 隐藏真实属性
}
Object.defineProperty(obj, 'address', {
    // 不可以有 value 以及 writable
    enumerable: true,
    configurable: true,
    get() {
        return this._address
    },
    set(value) {
        this._address = value
    }
})
obj.address = '上海'
console.log(obj.address)
```

## 简写 watch api

```javascript
// 写 watch
;(function () {
    var root = this
    function watch(obj, name, func) {
        var value = obj[name]

        Object.defineProperty(obj, name, {
            get: function () {
                return value
            },
            set: function (newValue) {
                value = newValue
                func(value)
            }
        })

        if (value) obj[name] = value
    }

    this.watch = watch
})()

// 使用
const obj = {
    value: 1
}
watch(obj, 'value', function (newvalue) {
    document.getElementById('container').innerHTML = newvalue
})
document.getElementById('button').addEventListener('click', function () {
    obj.value += 1
})
```

## 补充

### Object.getOwnPropertyDescriptor 获取属性描述符

```javascript
let obj = {
    name: 'why',
    age: 18,
    address: '北京'
}
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
//{ value: 'why', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptors(obj)) //获取所有对象的属性描述符
```

### Object.preventExtensions 禁止对象继续添加新的属性

```javascript
let obj = {
    name: 'why',
    age: 18,
    address: '北京'
}
Object.preventExtensions(obj)
obj.height = 189
obj.address = '南京'
console.log(obj) //{ name: 'why', age: 18, address: '南京' }
```

### Object.seal 禁止对象配置/禁止删除对象里面的属性

```javascript
let obj = {
    name: 'why',
    age: 18,
    address: '北京'
}
Object.seal(obj)
delete obj.name //禁止删除
console.log(obj) //{ name: 'why', age: 18, address: '北京' }
for (let key in obj) {
    Object.defineProperty(obj, key, {
        configurable: false,
        enumerable: true
    })
} //这样是不行的，禁止配置
```

### Object.freeze 冻结对象，使其不能修改

```javascript
let obj = {
    name: 'why',
    age: 18,
    address: '北京'
}
Object.freeze(obj)
obj.name = 'lebro'
obj.address = '南京'
console.log(obj) //{ name: 'why', age: 18, address: '北京' }
```

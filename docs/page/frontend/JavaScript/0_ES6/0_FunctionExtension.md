# 函数扩展

## 函数扩展

从 ES5 开始，函数内部可以设定为严格模式。

```javascript
function doSomething(a, b) {
    'use strict'
    // code
}
```

ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

```javascript
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

## name 属性

ES5 的 name 属性，会返回空字符串，而 ES6 的 name 属性会返回实际的函数名。

```javascript
/* 匿名函数 */
const f = function () {}
// ES5
f.name // ""
// ES6
f.name // "f"

/* 具名函数 */
const bar = function baz() {}
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"
```

## 箭头函数

箭头函数有几个使用注意点。

-   没有 this。

-   没有 arguments。

-   不能通过 new 关键字调用。

-   没有 new.target

-   没有原型
-   没有 super

-   不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

### 没有 this

箭头函数没有 this，所以需要通过查找作用域链来确定 this 的值。

这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的 this。

::: tip
箭头函数表达式的语法比函数表达式更短，并且不绑定自己的 this，arguments，super 或 new.target。这些函数表达式最适合用于非方法函数(non-method functions)，并且它们不能用作构造函数。
:::

### 没有 arguments

箭头函数没有自己的 arguments 对象

要访问箭头函数的参数呢？可以通过命名参数或者 rest 参数的形式访问参数:

```javascript
const nums = (...nums) => nums
console.log(nums(123, 'test', false)) // [ 123, 'test', false ]
```

### 不能通过 new 关键字调用

JavaScript 函数有两个内部方法：[[Call]] 和 [[Construct]]。

当通过 new 调用函数时，执行 [[Construct]] 方法，创建一个实例对象，然后再执行函数体，将 this 绑定到实例上。

当直接调用的时候，执行 [[Call]] 方法，直接执行函数体。

箭头函数并没有 [[Construct]] 方法，不能被用作构造函数，如果通过 new 的方式调用，会报错。

```javascript
const Foo = () => {}
const foo = new Foo() // TypeError: Foo is not a constructor
```

### 没有 new.target

因为不能使用 new 调用，所以也没有 new.target 值。

### 没有原型

由于不能使用 new 调用箭头函数，所以也没有构建原型的需求，于是箭头函数也不存在 prototype 这个属性。

```javascript
const Foo = () => {}
console.log(Foo.prototype) // undefined
```

### 没有 super

连原型都没有，自然也不能通过 super 来访问原型的属性，所以箭头函数也是没有 super 的，不过跟 this、arguments、new.target 一样，这些值由外围最近一层非箭头函数决定。

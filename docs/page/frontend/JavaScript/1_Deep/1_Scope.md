# 作用域

## 1、词法作用域(静态作用域)

JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

```javascript
var value = 1

function foo() {
    console.log(value)
}
function bar() {
    var value = 2
    foo()
}
bar() // 结果是 1
```

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value.如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

## 2、示例 1

```javascript
var scope = 'global scope'
function checkscope() {
    var scope = 'local scope'
    function f() {
        return scope
    }
    return f()
}
checkscope() // 结果是 local scope
```

## 3、示例 2

```javascript
var scope = 'global scope'
function checkscope() {
    var scope = 'local scope'
    function f() {
        return scope
    }
    return f
}
checkscope()() // 结果是 local scope
```

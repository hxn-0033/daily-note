# 执行上下文栈(后进先出)

JavaScript 执行上下文栈（Execution Context Stack），也称为调用栈（Call Stack），是一种数据结构，用于管理执行上下文的创建、推入（入栈）、弹出（出栈）和切换。执行上下文栈跟踪了 JavaScript 代码的执行过程，确保代码的执行顺序和上下文的正确管理。

举例说明：

```javascript
let a = 'Hello World!'
function first() {
    console.log('Inside first function')
    second()
    console.log('Again inside first function')
}
function second() {
    console.log('Inside second function')
}
first()
console.log('Inside Global Execution Context')
```

<div align=center>
    <img src=../assets/1_execution.png width=100% />
</div>

1. 全局执行上下文：当 JavaScript 程序开始执行时，首先会创建全局执行上下文，并将其推入执行上下文栈的顶部。
2. 函数调用：当代码中存在函数调用时，会创建新的函数执行上下文，并将其推入执行上下文栈的顶部。
3. 函数执行：当函数执行完毕时，其对应的执行上下文会从栈中弹出。

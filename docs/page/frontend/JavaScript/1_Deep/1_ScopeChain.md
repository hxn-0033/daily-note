# 作用域链

JavaScript 中的作用域链（Scope Chain）是一种用于确定变量和函数作用域的机制。在 JavaScript 中，每个函数都有一个与之关联的作用域链。

作用域链的构建方式是由函数的创建方式所决定的。当函数被创建时，它会保留对创建时的作用域链的引用。这个作用域链包含了函数被创建时所在的词法环境中的变量对象（VO）。

在 JavaScript 中，作用域链的规则如下：

-   当函数被创建时，它的作用域链被创建并包含一个变量对象（VO），该对象包含了在函数声明所在的上下文中可访问的变量和函数。
-   如果在函数内部有嵌套的函数，则嵌套函数的作用域链将包含对外部函数作用域链的引用，形成了一个链式结构。
-   当在函数内部引用一个变量时，JavaScript 引擎首先查找当前函数的作用域链中的变量对象（VO）。如果找不到，则继续沿着作用域链向上查找，直到找到该变量或者到达全局作用域。
-   如果在全局作用域中仍然找不到该变量，则会抛出 ReferenceError 错误。

```javascript
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
// 执行过程如下：
// 1.checkscope 函数被创建，保存作用域链到 内部属性[[scope]]
checkscope.[[scope]] = [
    globalContext.VO
];
// 2.执行 checkscope 函数，创建 checkscope 函数执行上下文
// checkscope 函数执行上下文被压入执行上下文栈
ECStack = [
    checkscopeContext,
    globalContext
];
// 3.checkscope 函数并不立刻执行，开始做准备工作
// 第一步：复制函数[[scope]]属性创建作用域链
checkscopeContext = {
    Scope: checkscope.[[scope]],
}
// 4.第二步：用 arguments 创建活动对象
// 随后初始化活动对象，加入形参、函数声明、变量声明
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
// 5.第三步：将活动对象压入 checkscope 作用域链顶端
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
// 6.准备工作做完，开始执行函数，随着函数的执行
// 修改 AO 的属性值
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
// 7.查找到 scope2 的值，返回后函数执行完毕
// 函数上下文从执行上下文栈中弹出
ECStack = [
    globalContext
];
```

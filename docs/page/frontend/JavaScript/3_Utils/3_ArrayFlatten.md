# 数组扁平化

## 1. 使用递归：

-   使用场景：当需要对任意层级的嵌套数组进行扁平化时，递归是一种简单且通用的方法。
-   优点：简单易懂，适用于任意层级的嵌套数组。
-   缺点：可能存在性能问题，对于非常大的数组或多层嵌套的数组，递归可能导致堆栈溢出。

```javascript
function flatten(arr) {
    let result = []
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item))
        } else {
            result.push(item)
        }
    })
    return result
}
```

## 2. 使用 reduce 方法：

-   使用场景：当需要对数组进行一系列操作，并将结果累积到一个新数组时，reduce 方法是一种常用的选择。
-   优点：代码简洁，可以直接在 reduce 方法中处理扁平化逻辑。
-   缺点：对于非常大的数组或多层嵌套的数组，reduce 方法可能导致性能问题。

```javascript
function flatten(arr) {
    return arr.reduce((result, item) => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item))
        } else {
            result.push(item)
        }
        return result
    }, [])
}
```

## 3. 使用扩展运算符：

-   使用场景：当需要快速将多层嵌套的数组扁平化为一维数组时，扩展运算符是一种简单且直观的方法。
-   优点：代码简洁，易于理解和使用。
-   缺点：对于非常大的数组或多层嵌套的数组，扩展运算符可能导致性能问题。

```javascript
function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
```

## 4. 使用 flat 方法（ES2019）：

-   使用场景：当在支持 ES2019 的环境中，可以使用 flat 方法来扁平化数组。
-   优点：代码简洁，使用内置方法，性能较好。
-   缺点：不适用于不支持 ES2019 的环境。

```javascript
function flatten(arr) {
    return arr.flat(Infinity)
}
```

## 5. 使用 toString 和 split 方法：

-   使用场景：当需要将多层嵌套的数组转换为字符串，并使用字符串方法进行处理时，可以使用 toString 和 split 方法。
-   优点：简单易懂，适用于简单的扁平化需求。
-   缺点：对于包含对象或字符串元素的数组，可能会出现不符合预期的结果。

```javascript
function flatten(arr) {
    return arr
        .toString()
        .split(',')
        .map((item) => +item)
}
```

## 6. 使用正则表达式和 JSON 方法：

-   使用场景：当需要将数组转换为字符串，然后使用正则表达式和 JSON 方法进行处理时，可以使用该方法。
-   优点：适用于简单的扁平化需求。
-   缺点：对于包含对象或字符串元素的数组，可能会出现不符合预期的结果。

```javascript
function flatten(arr) {
    return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
}
```

## 7. 使用堆栈：

-   使用场景：当需要手动控制数组元素的处理顺序时，可以使用堆栈方法。
-   优点：可以灵活控制处理顺序，适用于需要自定义处理逻辑的情况。
-   缺点：相对复杂，需要手动处理堆栈和结果数组。

```javascript
function flatten(arr) {
    const stack = [...arr]
    const result = []
    while (stack.length) {
        const next = stack.pop()
        if (Array.isArray(next)) {
            stack.push(...next)
        } else {
            result.unshift(next)
        }
    }
    return result
}
```

## 8. 使用扩展运算符和递归：

-   使用场景：当需要结合扩展运算符和递归来处理多层嵌套的数组时，可以使用该方法。
-   优点：代码简洁，结合了扩展运算符和递归的优点。
-   缺点：对于非常大的数组或多层嵌套的数组，递归可能导致堆栈溢出。

```javascript
function flatten(arr) {
    return [].concat(...arr.map((item) => (Array.isArray(item) ? flatten(item) : item)))
}
```

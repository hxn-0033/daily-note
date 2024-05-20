# 树-深/广度优先遍历

树结构数据

```javascript
const tree = [
    {
        id: '1',
        name: '节点1',
        children: [
            {
                id: '1-1',
                name: '节点1-1'
            }
        ]
    },
    {
        id: '2',
        name: '节点2',
        children: [
            {
                id: '2-1',
                name: '节点2-1'
            },
            {
                id: '2-2',
                name: '节点2-2',
                children: [
                    {
                        id: '2-2-1',
                        name: '节点2-2-1'
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        name: '节点3'
    }
]
```

## 深度优先遍历（DFS）

### 1、递归实现

实现逻辑简述：定义 treeIterator 函数，传入 tree（树）和 func（回调函数）两个参数，遍历 tree 数组，执行回调函数，如果当前节点存在 children，则递归调用。

```javascript
function treeIterator(tree, func) {
    tree.forEach((node) => {
        func(node)
        node.children && treeIterator(node.children, func)
    })
}

treeIterator(tree, (node) => {
    console.log(node.name)
})

/*
执行结果：
节点1
节点1-1
节点2
节点2-1
节点2-2
节点2-2-1
节点3
*/
```

### 2、循环实现

实现逻辑简述：

（1）定义 node 作为当前节点，curTree 为传入的树（不影响原数组 tree）；

（2）执行 while 循环，curTree 数组第一个元素从其中删除，并返回第一个元素赋值给 node；

（3）① 执行回调函数；② 如果当前节点存在子树，则追加到 curTree 数组的开头，继续执行循环，直到 curTree 没有元素为止。

```javascript
function treeIterator(tree, func) {
    let node,
        curTree = [...tree]
    while ((node = curTree.shift())) {
        func(node)
        node.children && curTree.unshift(...node.children)
    }
}

treeIterator(tree, (node) => {
    console.log(node.name)
})

/*
执行结果：
节点1
节点1-1
节点2
节点2-1
节点2-2
节点2-2-1
节点3
*/
```

## 广度优先遍历（BFS）

```javascript
function treeIterator(tree, func) {
    let node,
        curTree = [...tree]
    while ((node = curTree.shift())) {
        func(node)
        node.children && curTree.push(...node.children)
    }
}

treeIterator(tree, (node) => {
    console.log(node.name)
})
/*
执行结果：
节点1
节点2
节点3
节点1-1
节点2-1
节点2-2
节点2-2-1
*/
```

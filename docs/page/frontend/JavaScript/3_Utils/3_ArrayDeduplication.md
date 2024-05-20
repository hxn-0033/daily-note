# 数组去重

## 方式一：利用 Set 去重

```javascript
// 1.利用set去重
// Set是es6新增的数据结构，似于数组，但它的一大特性就是所有元素都是唯一的，没有重复的值，我们一般称为集合
// Array.from()就是将一个类数组对象或者可遍历对象转换成一个真正的数组，也是ES6的新增方法
let list = ['你是最棒的', 8, 8, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, '你是最棒的']
let newList = Array.from(new Set(list))
console.log('newList', newList)
```

## 方式二：利用 Map 去重

```javascript
//3.利用map去重
//map数据结构是es6中新出的语法，其本质也是键值对，只是其键不局限于普通对象的字符串
let list = ['你是最棒的2', 8, 8, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, '你是最棒的2']
let newList3 = []
let map = new Map()
list.forEach((item) => {
    // 如果map.has指定的item不存在，那么就设置key和value 这个item就是当前map里面不存在的key,把这个item添加到新数组
    // 如果下次出现重复的item，那么map.has(item等于ture 取反 !map.has(item)  不执行
    if (!map.has(item)) {
        map.set(item, ture)
        newList3.push(item)
    }
})
console.log('newList3', newList3)
```

## 方式三：单层 for / forEach 等方式 遍历数组 + indexOf/incloudes + 返回新数组

```javascript
//方式二
function fun(arr) {
    let arr1 = []
    for (let i = 0; i < arr.length; i++) {
        if (arr1.indexOf(arr[i]) > -1) {
            continue
        } else {
            arr1.push(arr[i])
        }
    }
    return arr1
}
```

## 方式四：双层 for 遍历数组 判断并删掉重复元素

```javascript
//方式三：
function fun(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; ) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1)
            } else {
                j++
            }
        }
    }
    return arr
}
```

## 方式五：利用 filter 方法 + indexOf 方法 / includes 方法

```javascript
//方法四：
function fun(arr) {
    return arr.filter((item, index) => arr.indexOf(item) == index)
}
```

## 方式六：遍历数组 + Object 键值对

```javascript
function unique(array) {
    const obj = {}
    return array.filter(function (item, index, array) {
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}
```

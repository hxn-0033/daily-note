# 获取随机数

```javascript
function getRandomNumber(min, max) {
    // 计算范围内的随机数
    let random = Math.random() * (max - min + 1) + min
    // 向下取整得到整数
    let randomNumber = Math.floor(random)
    // 返回随机数
    return randomNumber
}

// 生成 1 到 10 之间的随机整数
let number = getRandomNumber(1, 10)
console.log(number)
```

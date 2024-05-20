# 防抖节流

## 防抖

原理: 当持续触发事件时，xx 秒内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。

```javascript
function debounce(func, wait, immediate) {
    let timer = null // 定义一个定时器

    const debounced = function () {
        const context = this // 保存函数的上下文
        const args = arguments // 保存函数参数

        if (timer) clearTimeout(timer) // 清空之前的定时器

        const callNow = immediate && !timer // 判断是否立即执行 且 不存在定时器

        // 定义一个延迟执行函数
        const later = function () {
            timer = null // 清空定时器
            // 如果 immediate 参数为 false，则执行传入的函数
            if (!immediate) {
                func.apply(context, args)
            }
        }

        timer = setTimeout(later, wait) // 设置一个新的定时器

        // 如果立即执行，则调用传入的函数
        if (callNow) {
            func.apply(context, args)
        }
    }

    // 定义一个函数，用于取消防抖效果
    const cancelDebounce = function () {
        clearTimeout(timer)
        timer = null
    }

    // 取消防抖
    debounced.cancel = cancelDebounce

    return debounced
}
```

## 节流

原理: 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。

```javascript
function throttle(func, wait) {
    let timer = null // 定时器
    let startTime = Date.now() // 记录开始时间

    function throttled() {
        const curTime = Date.now() // 获取当前时间
        const remaining = wait - (curTime - startTime) // 计算剩余时间
        const context = this // 保存函数执行上下文
        const args = arguments // 保存函数参数

        if (timer) clearTimeout(timer) // 清除之前的定时器

        // 定义一个延迟执行函数
        const later = function () {
            // 如果剩余时间大于0，则设置定时器
            func.apply(context, args) // 在剩余时间后执行函数
            startTime = Date.now() // 更新开始时间
        }

        if (remaining <= 0) {
            // 如果剩余时间小于等于0，表示可以立即执行
            func.apply(context, args) // 执行函数
            startTime = Date.now() // 更新开始时间
        } else {
            timer = setTimeout(later, remaining)
        }
    }

    // 定义一个函数，用于取消节流效果
    const cancelThrottle = function () {
        clearTimeout(timer)
        timer = null
    }

    // 取消节流
    throttled.cancel = cancelThrottle

    return throttled
}
```

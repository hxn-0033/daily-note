# 继承的多种方式

## 原型链继承

```javascript
function Parent() {
    this.name = 'kevin'
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child() {}
Child.prototype = new Parent()
var child1 = new Child()
console.log(child1.getName()) // kevin
```

## 借用构造函数(经典继承)

```javascript
function Parent() {
    this.names = ['kevin', 'daisy']
}
function Child() {
    Parent.call(this)
}
var child1 = new Child()
child1.names.push('yayu')
console.log(child1.names) // ["kevin", "daisy", "yayu"]
var child2 = new Child()
console.log(child2.names) // ["kevin", "daisy"]
```

## 组合继承

原型链继承和经典继承双剑合璧。

```javascript
function Parent(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('kevin', '18')
child1.colors.push('black')
console.log(child1.name) // kevin
console.log(child1.age) // 18
console.log(child1.colors) // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20')
console.log(child2.name) // daisy
console.log(child2.age) // 20
console.log(child2.colors) // ["red", "blue", "green"]
```

## 寄生式继承

```javascript
function createObj(o) {
    var clone = Object.create(o)
    clone.sayName = function () {
        console.log('hi')
    }
    return clone
}
```

## ES6——class 继承

需要注意的是：class 关键字只是原型的语法糖，js 继承依然是基于原型实现的。

```javascript
class Parent {
    constructor(name) {
        this.name = name
        this.hobbies = ['sing', 'dance', 'rap']
    }
    getHobbies() {
        return this.hobbies
    }
    static getCurrent() {
        console.log(this)
    }
}
class Child extends Parent {
    constructor(name) {
        super(name)
    }
}
var c1 = new Child('c1')
var c2 = new Child('c2')
console.log(c1 instanceof Child) // true
console.log(c1 instanceof Parent) // true
```

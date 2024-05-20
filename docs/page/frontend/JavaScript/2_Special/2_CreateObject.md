# 创建对象的多种方式

## 1. 工厂模式

```javascript
function createPerson(name) {
    var o = new Object()
    o.name = name
    o.getName = function () {
        console.log(this.name)
    }
    return o
}
var person1 = createPerson('kevin')
```

缺点：对象无法识别，因为所有的实例都指向一个原型

## 2. 构造函数模式

```javascript
function Person(name) {
    this.name = name
    this.getName = function () {
        console.log(this.name)
    }
}

var person1 = new Person('kevin')
```

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，每个方法都要被创建一次

## 3. 对象字面量

```javascript
var person = {
    name: 'John',
    age: 30,
    sayHello: function () {
        console.log("Hello, I'm " + this.name)
    }
}
```

## 4. 原型模式

```javascript
function Person() {}
Person.prototype.name = 'keivn'
Person.prototype.getName = function () {
    console.log(this.name)
}
var person1 = new Person()
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

## 5. 混合构造函数和原型模式

```javascript
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name)
}
var person = new Person('John', 30)
```

## 5. 类来创建对象

```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayHello() {
        console.log("Hello, I'm " + this.name)
    }
}
var person = new Person('John', 30)
```

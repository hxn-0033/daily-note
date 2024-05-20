# 从原型到原型链

## 1、构造函数、prototype、constructor、\_\_proto\_\_

```javascript
// 1-构造函数：Person是一个构造函数
function Person() {}
const person = new Person() // new出来的实体对象

// 2-prototype：每个函数都有 prototype 属性，这个属性是一个指针，指向一个对象.
// 这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
Person.prototype.name = 'DontKai'
console.log(person.name) // DontKai

// 3-__proto__：每个对象(除了 null )都具有属性__proto__，指向该对象的原型。
console.log(person.__proto__ === Person.prototype) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true

// 4-constructor：每个原型都有一个 constructor 属性指向关联的构造函数。
console.log(Person.prototype.constructor === Person) // true

console.log(Person.prototype.__proto__ === Object.prototype) // true

console.log(Object.prototype.__proto__ === null) // true
```

## 2、总结

如图所示：

<div align=center>
    <img src=../assets/1_proto.png width=100% />
</div>

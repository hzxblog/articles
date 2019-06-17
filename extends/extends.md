# 继承

## 原型链继承

其本质就是直接重写原型对象，修改其指针。在demo-01中：

```javascript
function SuperType() {
  this.property = true;
  this.colors = ["red"];
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}

SubType.prototype = new SuperType();

// constructor 被重写了
console.log(SubType.prototype.constructor === SubType.prototype.constructor);

SubType.prototype.constructor = SubType;

SubType.prototype.getSubValue = function() {
  return this.subproperty;
};

const instance = new SubType();

console.log(instance.getSubValue());

instance.colors.push("white"); 
console.log(instance.colors); // [ 'red', 'white' ]

const instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'white' ]

```

重写了SubType的原型，所以SubType现在继承的SuperType的属性和方法，因为重写原型是SuperType的实例，所以constructor指向现在是SuperType，必须修改成SubType。

### 问题

#### 1. 引用类型的值会被实例共用

在demo-01中，我们操作了两个各自的引用类型值，可以很明显看出，引用类型的值会被实例共用，这应该是被极力避免的问题，每个实例都应该都自己的副本。

#### 2. 无法传参数给父类

没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。

## 借用构造函数

这个方法解决了原型继承的两个问题，它在子类型构造函数的内部调用超类型构造函数。通过使用call或apply方法来初始化对象，使每个实例都有自己的副本。

在demo-01中：

```javascript
// 借用构造函数
function SuperType(name) {
  this.name = name;
  this.colors = ["red"];
}

function SubType(name) {
  SuperType.call(this, name); // 调用超类型构造函数
}

const instance = new SubType();

instance.colors.push("white");
console.log(instance.colors);

const instance2 = new SubType();
console.log(instance2.colors);

const instance3 = new SubType("hanzx");
console.log(instance3.name);

```
从这个例子中在构造函数SubType中，我们调用了SuperType,实现了每个实例都有自己的副本元素的目的，同时传递了参数。

### 问题

#### 1. 方法都在构造函数中定义

为了使子类继承所有父类属性和方法，就必须把他们全部定义在父类的构造函数中。这样就无法避免在每次实例化时，都会重新创建具有相同功能方法的问题。


## 组合继承

将原型链和借用构造函数的技术组合到一块，原型链实现对原型属性和方法的继承，再通过借用构造函数来实现对实例属性的继承。

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["red"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = new SuperType();

SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function() {
  console.log(this.age);
};

const instance1 = new SubType("hanzx", 26);
instance1.colors.push("white");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

const instance2 = new SubType("hanss", 29);
instance2.colors.push("black");
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();
```
在 demo-04中SubType.prototype继承方法，SubType构造函数中继承SuperType的属性，同时定义自身属性。

## 原型式继承

道格拉斯·克罗克福德在[Prototypal Inheritance in JavaScrip](https://www.crockford.com/javascript/prototypal.html)提出来的。其思想是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型可，以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以得到进一步改造。

demo-04中：

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```
ECMAScript 5 通过新增 Object.create(prototype, own)方法规范化了原型式继承。第一个参数是新对象的原型对项。第二个参数是自身属性对象。

## 寄生式继承

寄生式继承就是原型式继承的进一步改造，创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

demo-05中：
```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnother(original) {
  const clone = object(original);
  clone.sayHi = function() {
    console.log("hi");
  };
  return clone;
}

```
在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。但这种继承方式使方法无法复用。

## 寄生组合式继承

通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式。

demo-06:

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subClass, superClass) {
  subClass.prototype = object(superClass.prototype);
  subClass.prototype.constructor = subClass;
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
  console.log(this.age);
};

```
在这里我们先用构造函数继承的父类的属性，之后我们只需要父类的原型，所以接用寄生式继承夫类的原型。

这里比组合继承的少调用了一次符构造函数，避免创建不必要的属性，同时能继承父类的原型；

引用： [JavaScript高级程序设计（第3版）](https://github.com/shihyu/awesome-books/blob/master/%E5%89%8D%E7%AB%AF/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC3%E7%89%88%EF%BC%89.pdf)

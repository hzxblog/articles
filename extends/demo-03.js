// 组合继承
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

/**
 * 1. 原型链继承方法
 * 2. 接用构造函数继承属性
 */

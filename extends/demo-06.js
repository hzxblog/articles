// 寄生组合式继承

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

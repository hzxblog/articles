// 原型链继承
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
console.log(SubType.prototype.constructor === SuperType);

SubType.prototype.constructor = SubType;

SubType.prototype.getSubValue = function() {
  return this.subproperty;
};


const instance = new SubType();
console.log(instance.getSubValue());

instance.colors.push("white");
console.log(instance.colors);

const instance2 = new SubType();
console.log(instance2.colors);

/**
 * 1. 引用类型的值被共享了
 * 2. 无法向超类中传递参数
 */

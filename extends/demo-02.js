// 借用构造函数
function SuperType(name) {
  this.name = name;
  this.colors = ["red"];
}

function SubType(name) {
  SuperType.call(this, name);
}

const instance = new SubType();

instance.colors.push("white");
console.log(instance.colors);


const instance2 = new SubType();
console.log(instance2.colors);

const instance3 = new SubType("hanzx");
console.log(instance3.name);

// 方法必须都在构造函数中定义

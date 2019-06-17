// 寄生式继承
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

// 无法复用函数

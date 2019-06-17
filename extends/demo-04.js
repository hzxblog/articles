// 原型式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

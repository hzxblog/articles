# 浏览器打印


## 调用浏览器打印功能
有以下两种调用方式：

### window.print()

这是一种调用系统对话框的方法，例如，`alert()`和`confirm()`等都是这类方法。
`print()`代表打开”打印对话框“，用于打印当前显示文档。

### document.execCommand('print')

这是document对象提供的一个用于操作可编辑区域的[方法](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)，它的第一个参数是执行命令的名称。之前用过`copy`（将当前选中内容复制到剪切版）指令。

### 打印样式

打印的样式会和当前html样式有很大的区别，若以必须给打印编写单独的样式，这里有两种方式：

### 打印样式表

通过在`link`上加上`media = "print"`来指定这是打印时应用的样式表。

```html
<link href="./print.css" media="print" rel="stylesheet" />
```

### @media 查询

除了常用的`@media screen`用于适配各种设备外，这里我们可以用 `@media print`，它是用于打印的。


```css
@media print {
  /*样式*/
}
```

## 打印事件监听

浏览器提供了`beforeprint`和`afterprint`两个监听事件。

```js
window.addEventListener('beforeprint', ()=> {
  // 打印预览调用之前
});
window.addEventListener('afterprint', ()=> {
  // 文档已开始打印或打印预览已关闭之后
});
```

## 特殊的CSS属性

`page-break-before`, `page-break-inside`， `page-break-after` 可以帮助我们定义在打印时文档的行为。

### 分页

在打印时，我们会要求各大块单独分页，这里用到`page-break-before`, 和 ` page-break-after`属性，它们分别定义在指定元素前和指定元素后添加分页符。

```
page-break-after: auto | always| avoid | left| right | initial | inherit;
page-break-before: auto | always| avoid | left| right | initial | inherit;
```

| 值 | 描述 |
|---------|---------|
|auto|	默认值。自动分页|
|always| 总是在元素后面（前面）插入分页符|
|avoid|避免在元素后面（前面）添加分页符|
|left| 在元素后面（前面）插入分页符，以便下一个页面格式化为左页面	|
|right	|在元素后面（前面）插入分页符，以便下一个页面格式化为右页面|
|initial|设置它的属性为默认值|
|inherit|重父元素继承这个属性|


::: danger 注意
不要在空div或绝对定位的元素中使用该属性
:::

### 避免分页

`page-break-inside`属性是设定在指定元素内是否应该避免分页。

```
page-break-inside: auto | avoid | initial | inherit;
```

| 值 | 描述 |
|---------|---------|
|auto|	默认值。自动分页|
|always| 总是在元素后面（前面）插入分页符|
|avoid|避免在元素内部分页|
|initial|设置它的属性为默认值|
|inherit|重父元素继承这个属性|

::: danger 注意
不要在绝对定位的元素中使用该属性
:::

## 兼容性

### 火狐浏览器table表格的显示不全

添加table样式

```css
table {
  border-spacing: 0 !important;
  border-collapse: unset !important;
}
```

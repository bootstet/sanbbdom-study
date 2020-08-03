// 1 .导入模块
import { init, h } from 'snabbdom'
// 2 .注册模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

let patch = init([
  style,
  eventlisteners
])
// 3 .使用h()函数的第二个参数传入模块需要的数据（对象）

let vnode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: {
    click: eventHandler
  }
}, [
  h('h1', 'hello snabbdom'),
  h('p', '这是p标签')
])
  
function eventHandler () {
  console.log('点击我了')
} 

let a = 3
if(a > 4) {
  console.log(1)
}else if(a > 2) {
  console.log(2)
}else if(a > 0) {
  console.log(0)
}else {
  console.log('else')
}

let app = document.querySelector('#app')

patch(app, vnode)
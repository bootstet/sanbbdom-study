import { h, init } from 'snabbdom'

let patch = init([])

let vnode = h('div#container', [
  h('h1', 'hello snabbdom'),
  h('p', '这是一个p标签')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

setTimeout(() => {
  vnode = h('div#container', [
    h('h1', 'hello world'),
    h('p', 'hello p')
  ])
  patch(oldVnode, vnode)

  //清空页面内容
  // patch(oldVnode, null )
  patch(oldVnode, h('!'))  // h('!')  创建注释节点
}, 2000);
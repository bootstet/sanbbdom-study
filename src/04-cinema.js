import { init, h } from 'snabbdom'

import style from 'snabbdom/modules/style'
import eventlisterners from 'snabbdom/modules/eventlisteners'


let patch = init([
  style,
  eventlisterners
])

let nextKey = 11

var originalData = [
  { rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', elmHeight: 0 },
  { rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', elmHeight: 0 },
  { rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.', elmHeight: 0 },
  { rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', elmHeight: 0 },
  { rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', elmHeight: 0 },
  { rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', elmHeight: 0 },
  { rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.', elmHeight: 0 },
  { rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', elmHeight: 0 },
  { rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', elmHeight: 0 },
  { rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...', elmHeight: 0 },
]


let vnode = h('div', [
  contentRender(),
  moveviews()
])

// 排序
function sortBy (prop) {
  originalData.sort((a, b) => {
    if(a[prop] > b[prop]) {
      return 1
    }
    if(a[prop] < b[prop]) {
      return -1
    }
    return 0
  })
  vnode = patch(vnode, render())
}


// 移除dom
function remove (item) {
  originalData = originalData.filter(m =>  m !== item)
  vnode = patch(vnode, render())
}
// 添加dom
function add () {
  let n = originalData[Math.floor(Math.random() * 10)]
  originalData.unshift({
    ...n,
    rank: nextKey++
  })
  vnode = patch(vnode, render())
}

// 顶部header渲染
function contentRender () {
  return h('div#content', [
    h('h1', 'Top 10 movies'),
    h('div#header', { style: {  }},
    [
      h('span', { style: { marginRight: '10px' }}, 'Sort by:'),
      h('span', { 
        style: { marginRight: '10px' },
        on: { click: [sortBy, 'rank']}
      }, 'Rank'),
      h('span', { 
        style: { marginRight: '10px' },
        on: { click: [sortBy, 'title']}
      }, 'Title'),
      h('span', {
        on: { click: [sortBy, 'desc']}
      },
      'Description'),
      h('span', { 
        style: { float: "right" },
        on: { click: [add]}
      }, 'Add')
    ]),
  ])
}

function render () {
  return h('div', 
   [
    contentRender(),
    moveviews()
  ])
}

function moveviews () {
  return  h('div#movies-list', { style: { marginTop: '10px' }}, 
    originalData.map(item => h('div.row', {
      style: { border: '1px solid #333' }
    }, [
      h('div', { style: { fontWeight: 'bold' } }, item.rank),
      h('div', item.title),
      h('div', item.desc),
      h('div.btn.rm-btn', { on: { click: [remove, item] } }, 'x'),
    ]))
  )
}

let app = document.querySelector('#app')

patch(app, vnode)
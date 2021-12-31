import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { ThemeProvider } from 'styled-components'
import { dark, light } from './theme'
import {
  AtomHour,
  AtomMinute,
  AtomList,
  Hour2MinuteChange,
  Minute2HourChange
} from './recoil'
import List from './components/List'

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, 
p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, 
ins, kbd, q, s, samp, small, 
strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, 
li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, 
tr, th, td, article, aside, canvas, details, embed, figure, figcaption, 
footer, header, hgroup, menu, nav, 
output, ruby, section, summary, 
time, mark, audio, 
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } /* HTML5 display-role reset for older browsers */ article, aside, details, figcaption, figure, footer, 
header, hgroup, menu, nav, 
section { display: block; } 
body { 
  line-height: 1; 
  background-color: ${props => props.theme.bgColor}
} 
ol, ul { list-style: none; } 
blockquote, q { quotes: none; } 
blockquote:before, blockquote:after, 
q:before, q:after { content: ''; content: none; } 
table { border-collapse: collapse; border-spacing: 0; }
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;
`
const ListsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  width: 70%;
`

function App () {
  const isDark = true
  const [Lists, setLists] = useRecoilState(AtomList)
  const [minute, setMinute] = useRecoilState(AtomMinute)
  const [hour, setHour] = useRecoilState(AtomHour)
  const minute2hour = useRecoilValue(Minute2HourChange)
  const hour2minute = useRecoilValue(Hour2MinuteChange)
  function onMinuteChange (evt: React.FormEvent<HTMLInputElement>) {
    setMinute(+evt.currentTarget.value)
    setHour(+evt.currentTarget.value / 60)
  }
  function onHourChange (evt: React.FormEvent<HTMLInputElement>) {
    setHour(+evt.currentTarget.value)
    setMinute(+evt.currentTarget.value * 60)
  }
  function getList (type: string) {
    return Lists.find(list => list.type === type) || { list: [] }
  }
  function onDragEnd ({ destination, source }: DropResult) {
    if (!destination || !source.droppableId) return
    if (source.droppableId === destination?.droppableId) {
      // 같은 리스트에서 카드 정렬
      if (!getList(source.droppableId)) return
      const editList = [...getList(source.droppableId).list]
      const item = editList.splice(source.index, 1)
      editList.splice(destination.index, 0, item[0])
      const targetIndex = Lists.findIndex(
        list => list.type === source.droppableId
      )
      setLists(oldList => {
        const newList = [...oldList]
        newList.splice(targetIndex, 1, {
          type: source.droppableId,
          list: editList
        })
        return newList
      })
    } else {
      // 다른 리스트로 카드 이동
      const sourceList = [...getList(source.droppableId).list]
      const destinationList = [...getList(destination.droppableId).list]
      const sourceMoveItem = sourceList.splice(source.index, 1)
      destinationList.splice(destination.index, 0, sourceMoveItem[0])
      // sortList(source.droppableId, sourceList)
      // sortList(destination.droppableId, destinationList)
      const sourceIndex = Lists.findIndex(
        list => list.type === source.droppableId
      )
      const destinationIndex = Lists.findIndex(
        list => list.type === destination.droppableId
      )
      setLists(oldList => {
        const newList = [...oldList]
        newList.splice(sourceIndex, 1, {
          type: source.droppableId,
          list: sourceList
        })
        return newList
      })
      setLists(oldList => {
        const newList = [...oldList]
        newList.splice(destinationIndex, 1, {
          type: destination.droppableId,
          list: destinationList
        })
        return newList
      })
    }
  }
  return (
    <>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <BodyWrapper>
          {/* <div>
            <input type='number' value={minute} onChange={onMinuteChange} />
            <input type='number' value={hour} onChange={onHourChange} />
          </div> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <ListsWrapper>
              {Lists.map((list, idx) => {
                return <List key={idx} listInfo={list} />
              })}
            </ListsWrapper>
          </DragDropContext>
        </BodyWrapper>
      </ThemeProvider>
    </>
  )
}

export default App

import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { ThemeProvider } from 'styled-components'
import { dark, light } from './theme'
import {
  AtomDoingList,
  AtomDoneList,
  AtomHour,
  AtomMinute,
  AtomToDoList,
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
  /* background-color: red; */
  width: 70%;
`

function App () {
  const isDark = true
  const [toDoList, setToDoList] = useRecoilState(AtomToDoList)
  const [doneList, setDoneList] = useRecoilState(AtomDoneList)
  const [doingList, setDoingList] = useRecoilState(AtomDoingList)
  const Lists = [toDoList, doneList, doingList]
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
  function sortList (type: string, newList: string[]) {
    if (type === 'ToDo') {
      setToDoList({ type: 'ToDo', list: newList })
    } else if (type === 'Doing') {
      setDoingList({ type: 'Doing', list: newList })
    } else {
      setDoneList({ type: 'Done', list: newList })
    }
  }

  function getList (type: string) {
    if (type === 'ToDo') {
      return toDoList
    } else if (type === 'Doing') {
      return doingList
    } else {
      return doneList
    }
  }

  function onDragEnd ({ destination, source }: DropResult) {
    console.log('source', source)
    console.log('destination', destination)
    if (!destination) return
    if (source.droppableId === destination?.droppableId) {
      // 같은 리스트에서 카드 정렬
      const newList = [...getList(source.droppableId).list]
      if (destination) {
        const item = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, item[0])
      }
      sortList(source.droppableId, newList)
    } else {
      // 다른 리스트로 카드 이동
      const sourceList = [...getList(source.droppableId).list]
      const destinationList = [...getList(destination.droppableId).list]
      const sourceMoveItem = sourceList.splice(source.index, 1)
      destinationList.splice(destination.index, 0, sourceMoveItem[0])
      console.log('sourceList', sourceList)
      console.log('destinationList', destinationList)
      sortList(source.droppableId, sourceList)
      sortList(destination.droppableId, destinationList)
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

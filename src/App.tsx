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
  AtomHour,
  AtomMinute,
  AtomToDoList,
  Hour2MinuteChange,
  Minute2HourChange
} from './recoil'
import Card from './Card'
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

const ListWrapper = styled.div`
  background-color: #c7ecee;
  width: 100%;
  padding: 10px;
  max-width: 480px;
  border-radius: 5px;
`

function App () {
  const isDark = true
  const [toDoList, setToDoList] = useRecoilState(AtomToDoList)
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
  function onDragEnd ({ destination, source }: DropResult) {
    setToDoList(oldList => {
      const newList = [...oldList]
      if (destination) {
        const item1 = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, item1[0])
      }
      return newList
    })
  }

  return (
    <>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <BodyWrapper>
          <div>
            <input type='number' value={minute} onChange={onMinuteChange} />
            <input type='number' value={hour} onChange={onHourChange} />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='drop1'>
              {provided => (
                <ListWrapper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {toDoList.map((toDo, idx) => {
                    return <Card toDo={toDo} key={idx} idx={idx} />
                  })}
                  {provided.placeholder}
                </ListWrapper>
              )}
            </Droppable>
          </DragDropContext>
        </BodyWrapper>
      </ThemeProvider>
    </>
  )
}

export default App

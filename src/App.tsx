import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  AtomHour,
  AtomMinute,
  Hour2MinuteChange,
  Minute2HourChange
} from './recoil'
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
body { line-height: 1; } 
ol, ul { list-style: none; } 
blockquote, q { quotes: none; } 
blockquote:before, blockquote:after, 
q:before, q:after { content: ''; content: none; } 
table { border-collapse: collapse; border-spacing: 0; }
`

function App () {
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
  function onDragEnd () {}
  return (
    <>
      <GlobalStyle />
      <div>
        {/* <form> */}
        <input type='number' value={minute} onChange={onMinuteChange} />
        <input type='number' value={hour} onChange={onHourChange} />
        {/* </form> */}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='drop1'>
          {() => {
            return (
              <ul>
                <Draggable index={0} draggableId='first'>
                  {() => {
                    return <li>Hello</li>
                  }}
                </Draggable>
                <Draggable index={1} draggableId='second'>
                  {() => {
                    return <li>Hello</li>
                  }}
                </Draggable>
                <Draggable index={2} draggableId='third'>
                  {() => {
                    return <li>Hello</li>
                  }}
                </Draggable>
              </ul>
            )
          }}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default App

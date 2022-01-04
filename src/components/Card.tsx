import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Item = styled.div`
  background-color: #f5f6fa;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`

type Props = {
  toDoId: string
  toDoText: string
  idx: number
}

function Card ({ toDoId, toDoText, idx }: Props) {
  return (
    <Draggable index={idx} draggableId={`${toDoText}${toDoId}`}>
      {provided => (
        <Item ref={provided.innerRef} {...provided.draggableProps}>
          <span {...provided.dragHandleProps}>🅾️</span>
          {toDoText}
        </Item>
      )}
    </Draggable>
  )
}

export default React.memo(Card)

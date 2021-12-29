import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Card from './Card'

const ListWrapper = styled.div`
  background-color: #c7ecee;
  width: 100%;
  padding: 10px;
  max-width: 480px;
  border-radius: 5px;
`
interface Props {
  List: string[]
}
function List ({ List }: Props) {
  return (
    <Droppable droppableId='drop1'>
      {provided => (
        <ListWrapper ref={provided.innerRef} {...provided.droppableProps}>
          {List.map((toDo, idx) => {
            return <Card toDo={toDo} key={idx} idx={idx} />
          })}
          {provided.placeholder}
        </ListWrapper>
      )}
    </Droppable>
  )
}

export default List

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import styled from 'styled-components'
import { IList } from '../recoil'
import Card from './Card'

const ListWrapper = styled.div`
  background-color: #dfe6e9;
  width: 100%;
  padding: 10px;
  max-width: 280px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`

interface Props {
  listInfo: IList
}

const Title = styled.div`
  padding: 10px;
  font-size: 20px;
  text-align: center;
  font-weight: bolder;

  &:hover {
    background-color: #00b894;
    color: whitesmoke;
  }
`

interface IDropzoneProp {
  isDraggingOver: boolean
  draggingFromThisWith: boolean
}
const Dropzone = styled.div<IDropzoneProp>`
  border-radius: 5px;
  flex-grow: 1;
  transition: background-color 0.5s;
  background-color: ${props =>
    props.isDraggingOver
      ? '#a4fcbf'
      : props.draggingFromThisWith
      ? '#94b9fd'
      : ''};
`
function List ({ listInfo }: Props) {
  return (
    <ListWrapper>
      <Title>{listInfo.type}</Title>
      <Droppable droppableId={`${listInfo.type}`}>
        {(provided, snapshot) => (
          <Dropzone
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {listInfo.list.map((toDo, idx) => {
              return <Card toDo={toDo} key={idx} idx={idx} />
            })}
            {provided.placeholder}
          </Dropzone>
        )}
      </Droppable>
    </ListWrapper>
  )
}

export default List

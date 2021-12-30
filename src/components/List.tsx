import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { AtomDoingList, AtomDoneList, AtomToDoList, IList } from '../recoil'
import Card from './Card'

const ListWrapper = styled.div`
  background-color: #dfe6e9;
  width: 100%;
  padding: 10px;
  max-width: 280px;
  border-radius: 5px;
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
function List ({ listInfo }: Props) {
  const setToDoList = useSetRecoilState(AtomToDoList)
  const setDoneList = useSetRecoilState(AtomDoneList)
  const setDoingList = useSetRecoilState(AtomDoingList)
  function changeList (newList: string[]) {
    if (listInfo.type === 'ToDo') {
      setToDoList({ type: 'ToDo', list: newList })
    } else if (listInfo.type === 'Doing') {
      setDoingList({ type: 'Doing', list: newList })
    } else {
      setDoneList({ type: 'Done', list: newList })
    }
  }
  function onDragEnd ({ destination, source }: DropResult) {
    const newList = [...listInfo.list]
    if (destination) {
      const item1 = newList.splice(source.index, 1)
      newList.splice(destination.index, 0, item1[0])
    }
    changeList(newList)
  }
  return (
    <ListWrapper>
      <Title>{listInfo.type}</Title>
      <Droppable droppableId={`${listInfo.type}`}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {listInfo.list.map((toDo, idx) => {
              return <Card toDo={toDo} key={idx} idx={idx} />
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ListWrapper>
  )
}

export default List

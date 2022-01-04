import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { AtomList, IList } from '../recoil'
import Card from './Card'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
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

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
`
interface IForm {
  task: string
}
const Form = styled.form`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
`

const ListWrap = styled.div`
  max-height: 80vh;
  overflow-y: scroll;
`
const ErrMsg = styled.p`
  color: hotpink;
`
function InputForm ({ type }: { type: string }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [list, setList] = useRecoilState(AtomList)
  function onSubmit ({ task }: IForm) {
    const newItem = {
      id: new Date() + '',
      text: task
    }
    setList(oldList => {
      const idx = oldList.findIndex(item => item.type === type)
      const newList = [...oldList]
      const addList = JSON.parse(JSON.stringify(oldList[idx]))
      addList.list.push(newItem)
      newList.splice(idx, 1, addList)
      return newList
    })
    setValue('task', '')
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        {...register('task', { required: 'input your task.' })}
      />
      {errors.task ? <ErrMsg>{errors.task.message}</ErrMsg> : null}
    </Form>
  )
}
function List ({ listInfo }: Props) {
  return (
    <ListWrapper>
      <Title>{listInfo.type}</Title>
      <InputForm type={listInfo.type} />
      <Droppable droppableId={`${listInfo.type}`}>
        {(provided, snapshot) => (
          <Dropzone
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ListWrap>
              {listInfo.list.map((task, idx) => {
                return (
                  <Card
                    toDoId={task.id}
                    toDoText={task.text}
                    key={idx}
                    idx={idx}
                  />
                )
              })}
              {provided.placeholder}
            </ListWrap>
          </Dropzone>
        )}
      </Droppable>
    </ListWrapper>
  )
}

export default List

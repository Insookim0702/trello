import { atom, selector } from 'recoil'

export interface IList {
  type: string
  list: IListItem[]
}

export interface IListItem {
  id: string
  text: string
}
export const AtomList = atom<IList[]>({
  key: 'List',
  default: [
    {
      type: 'ToDo',
      list: [
        { id: '0', text: '밥 먹기' },
        { id: '1', text: '책 읽기' },
        { id: '2', text: '집 가기' },
        { id: '3', text: '물 먹기' }
      ]
    },
    { type: 'Doing', list: [] },
    {
      type: 'Done',
      list: [
        { id: '4', text: '글쓰기' },
        { id: '5', text: '영화보기' }
      ]
    }
  ]
})

export const AtomMinute = atom({
  key: 'minute',
  default: 0
})

export const AtomHour = atom({
  key: 'hour',
  default: 0
})

export const Minute2HourChange = selector({
  key: 'minute2hourChange',
  get: ({ get }) => {
    const minute = get(AtomMinute)
    return minute / 60
  }
})

export const Hour2MinuteChange = selector({
  key: 'hour2minute',
  get: ({ get }) => {
    const hour = get(AtomHour)
    return hour * 60
  }
})

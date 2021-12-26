import { atom, selector } from 'recoil'

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

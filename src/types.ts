export type Hour = 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21

export type TimeInterval = {
  fromHour: Hour
  toHour: Hour
  title: string
}

export type Event = TimeInterval & {
  id: number
  overlapHours?: number
}

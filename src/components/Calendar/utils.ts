import { TimeInterval, Event } from 'types'

export const range = (start: number, end: number): Array<number> =>
  [...Array(end - start)].map((_, i) => i + start)

export const prepareEvents = (
  timeIntervals: Array<TimeInterval>,
): Array<Event> => {
  const events = timeIntervals.map((timeInterval, index) => ({
    ...timeInterval,
    id: index,
  }))

  return events.sort((event1, event2) => {
    const fromHourDiff = event1.fromHour - event2.fromHour
    const toHourDiff = event2.toHour - event1.toHour
    return fromHourDiff === 0 ? toHourDiff : fromHourDiff
  })
}

export const groupOverlappingEvents = (
  events: Array<Event>,
): Array<Array<Event>> =>
  // @ts-expect-error
  events.reduce(
    (eventGroups, event) => {
      const previousGroup = eventGroups[eventGroups.length - 1]
      const previousEvent = previousGroup[previousGroup.length - 1]

      if (previousEvent) {
        const eventHours = event.toHour - event.fromHour
        const diff = previousEvent.toHour - event.fromHour
        if (diff > 0) {
          previousGroup.push({
            ...event,
            overlapHours:
              event.toHour < previousEvent.toHour ? eventHours : diff,
          })
        } else {
          eventGroups.push([event])
        }
      }
      return eventGroups
    },
    [[events.shift()]],
  )

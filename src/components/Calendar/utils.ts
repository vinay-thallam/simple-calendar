import { TimeInterval, Event, Hour } from 'types'

export const range = (start: number, end: number): Array<number> =>
  [...Array(end - start)].map((_, i) => i + start)

export const convertTo12HrFormat = (hour: Hour): string =>
  `${hour % 12 || 12} ${hour >= 12 ? 'PM' : 'AM'}`

export const prepareEvents = (
  timeIntervals: Array<TimeInterval>,
): Array<Event> => {
  return timeIntervals
    .sort((timeInterval1, timeInterval2) => {
      const fromHourDiff = timeInterval1.fromHour - timeInterval2.fromHour
      const toHourDiff = timeInterval2.toHour - timeInterval1.toHour
      return fromHourDiff === 0 ? toHourDiff : fromHourDiff
    })
    .map((timeInterval, index) => ({
      ...timeInterval,
      id: index,
    }))
}

export const groupOverlappingEvents = (
  events: Array<Event>,
): Array<Array<Event>> =>
  // @ts-expect-error: when events array is empty, events.shift() returns undefined
  events.length
    ? events.reduce(
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
    : []

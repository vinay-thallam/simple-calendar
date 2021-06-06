/* eslint-disable */
import React, { FC, CSSProperties } from 'react'
import { useEventGroups } from 'providers/EventGroupsProvider'
import { convertTo12HrFormat } from './utils'
import { Event as EventT } from 'types'

const HOUR_SIZE = 40

type EventProps = {
  event: EventT
  groupIndex: number
}

export const Event: FC<EventProps> = ({ event, groupIndex }) => {
  const { deleteEvent } = useEventGroups()
  const eventDuration = event.toHour - event.fromHour

  const eventStyles: CSSProperties = {
    border: event.overlapHours ? '1px solid white' : 'none',
    height: HOUR_SIZE * eventDuration - 2,
    width: window.innerWidth - (72 + 100 * groupIndex),
    top: HOUR_SIZE * (event.fromHour - 9),
    left: 100 * groupIndex,
  }

  const overlapPortionStyles: CSSProperties = {
    height: event.overlapHours ? HOUR_SIZE * event.overlapHours - 4 : 0,
    width: window.innerWidth - (74 + 100 * groupIndex),
  }

  return (
    <div className="event" style={eventStyles}>
      {event.overlapHours ? (
        <div className="overlap-portion" style={overlapPortionStyles}>
          <EventDetail event={event} />
        </div>
      ) : (
        <EventDetail event={event} />
      )}
    </div>
  )
}

const EventDetail: FC<{ event: EventT }> = ({ event }) => (
  <div className="event-title">
    <div>{event.title}</div>
    <div>
      {convertTo12HrFormat(event.fromHour)} -{' '}
      {convertTo12HrFormat(event.toHour)}
    </div>
  </div>
)

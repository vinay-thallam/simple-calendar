import React, { FC } from 'react'
import { Event as EventT } from 'types'
import { Event } from './Event'

type EventGroupProps = { group: Array<EventT> }

// eslint-disable-next-line
export const EventGroup: FC<EventGroupProps> = ({ group }) => {
  console.log('group', group)
  return (
    <>
      {/* eslint-disable-next-line */}
      {group.map((event, index) => (
        <Event key={event.id} event={event} groupIndex={index} />
      ))}
    </>
  )
}

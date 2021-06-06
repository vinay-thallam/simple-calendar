import React, { FC } from 'react'
import { useEventGroups } from 'providers/EventGroupsProvider'
import { DayView } from './DayView'
import { EventGroup } from './EventGroup'
import './styles.css'

export const Calendar: FC = () => {
  const { eventGroups } = useEventGroups()

  console.log('eventGroups', eventGroups)
  return (
    <>
      <header className="header">Simple Calendar</header>
      <main className="main">
        <DayView />
        <section className="events-container">
          {eventGroups.map((group, index) => (
            <EventGroup key={index} group={group} />
          ))}
        </section>
      </main>
    </>
  )
}

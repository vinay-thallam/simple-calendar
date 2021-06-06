import React, { createContext, FC, useEffect, useState } from 'react'
import timeIntervalsData from 'data.json'
import {
  prepareEvents,
  groupOverlappingEvents,
} from 'components/Calendar/utils'
import { Event, TimeInterval } from 'types'

type ContextValue = {
  eventGroups: Array<Array<Event>>
  deleteEvent: (id: number) => void
}

const EventGroupsContext = createContext<ContextValue | null>(null)

// eslint-disable-next-line
export const EventGroupsProvider: FC = ({ children }) => {
  const [events, setEvents] = useState<Array<Event>>([])
  const [eventGroups, setEventGroups] = useState<Array<Array<Event>>>([])

  useEffect(() => {
    const events = prepareEvents(timeIntervalsData as Array<TimeInterval>)
    setEvents(events)
  }, [])

  useEffect(() => {
    const eventGroups = groupOverlappingEvents(events)
    setEventGroups(eventGroups)
  }, [events])

  const deleteEvent = (id: number) => {
    events.slice(id, 1)
    setEvents(events)
  }

  return (
    <EventGroupsContext.Provider
      value={{
        eventGroups,
        deleteEvent,
      }}
    >
      {children}
    </EventGroupsContext.Provider>
  )
}

export const useEventGroups = () => {
  const context = React.useContext(EventGroupsContext)!
  if (context === undefined) {
    throw new Error('useEventGroups must be used within a EventGroupsProvider')
  }

  return context
}

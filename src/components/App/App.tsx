import React, { FC } from 'react'
import { Calendar } from 'components/Calendar'
import { EventGroupsProvider } from 'providers/EventGroupsProvider'

export const App: FC = () => (
  <EventGroupsProvider>
    <Calendar />
  </EventGroupsProvider>
)

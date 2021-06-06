import React, { FC } from 'react'
import { DayView } from './DayView'
import { EventGroup } from './EventGroup'
import './styles.css'

export const Calendar: FC = () => (
  <>
    <header className="header">Simple Calendar</header>
    <main className="main">
      <DayView />
    </main>
  </>
)

import React, { FC } from 'react'
import { range, convertTo12HrFormat } from './utils'
import { Hour } from 'types'

const MIN_HOUR: Hour = 9
const MAX_HOUR: Hour = 21
const hours = range(MIN_HOUR, MAX_HOUR + 1)

export const DayView: FC = () => (
  <div className="container">
    <div className="hour-scale">
      {hours.map((hour) => {
        return (
          <div key={hour} className="hour-label">
            <span>{convertTo12HrFormat(hour as Hour)}</span>
          </div>
        )
      })}
    </div>
    <div className="hour-rules">
      {hours.map((hour) => {
        return <div key={hour} className="hour-rule"></div>
      })}
    </div>
  </div>
)

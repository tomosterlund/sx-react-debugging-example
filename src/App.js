import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import React, {useEffect, useState} from 'react';
import { getCalendarData, calendarData, dataLoading } from './commonSlice';
import { useDispatch, useSelector } from 'react-redux';

import '@schedule-x/theme-default/dist/index.css';
import {useCalendar} from "./useCalendar";

export default function App() {
  const eventsServicePlugin = useState(createEventsServicePlugin())[0];
  const calendarInfo = useSelector(calendarData);
  const calendarDataStatus = useSelector(dataLoading);
  const dispatch = useDispatch();
  const calendar = useCalendar({
    defaultView: viewMonthGrid.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [eventsServicePlugin],
    events: [],
    callbacks: {
      onSelectedDateUpdate() {
        dispatch(getCalendarData(2));
      },
    },
  });

  useEffect(() => {
    dispatch(getCalendarData(1));

    setTimeout(() => {
      console.log('hello')
      eventsServicePlugin.set([
        {
            id: 1,
            title: 'Meeting',
            start: '2024-07-16',
            end: '2024-07-16',
        }
      ])
      console.log(eventsServicePlugin.$app.calendarEvents.list.value)
      console.log(calendar.$app.calendarEvents.list.value)
    }, 1000)
  }, []);

  useEffect(() => {
    if (calendarDataStatus === 'success') {
      // eventsServicePlugin.set(calendarInfo);
      // console.log(calendarInfo)
      // console.log(calendar.$app.calendarEvents.list)
    }
  }, [calendarDataStatus]);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

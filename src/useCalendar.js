import {createCalendar} from "@schedule-x/calendar";
import {useState} from "react";

export const useCalendar = (calendarConfig) => {
    const [calendarApp, setCalendarApp] = useState((() => {
        console.log('creating calendar')

        return createCalendar(calendarConfig)
    })());
    return calendarApp;
}

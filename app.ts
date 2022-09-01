import calendar from "calendar-js";
import qrcode from "qrcode-terminal";
import moment from "moment";
import { Client } from "whatsapp-web.js";

interface WeekDays {
  weekday: string;
  date: Date;
  day: number;
  isInPrimaryMonth: boolean;
  isInLastWeekOfPrimaryMonth: boolean;
}

interface EmployersWithWeekDays {
  weekday: string;
  employer: string;
}

// @ts-ignore
const months = calendar().detailed(2022, 5, (data, calendar) => {
  return Object.assign(
    {
      weekday: calendar.weekdays[data.index.day],
    },
    data
  );
});

let counter = 0;
let results: EmployersWithWeekDays[] = [];
const employers = [
  "Jorge",
  "Kamilla",
  "Leandro",
  "Guilherme",
  "Wilton",
  "Elcimar",
  "Mateus",
  "Jonathan",
  "Lucas",
];

const portugueseWeekDay: Record<string, string> = {
  Monday: "Segunda-Feira",
  Tuesday: "Terça-Feira",
  Wednesday: "Quarta-Feira",
  Thursday: "Quinta-Feira",
  Friday: "Sexta-Feira",
};

months.calendar.map((arrayDays: WeekDays[]) => {
  arrayDays.map((days) => {
    let weekDayWithEmployer = {
      weekday: portugueseWeekDay[days.weekday],
      employer: employers[counter],
    };

    if (
      days.weekday === "Saturday" ||
      days.weekday === "Sunday" ||
      !days.isInPrimaryMonth
    ) {
      return;
    }
    counter++;

    if (counter >= employers.length) {
      counter = 0;
    }
    return results.push(weekDayWithEmployer);
  });
});

console.log(results);

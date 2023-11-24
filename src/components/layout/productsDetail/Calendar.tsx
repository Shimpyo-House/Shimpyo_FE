/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
// import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
// import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { css } from '@emotion/react';

export default function Calendar() {
  // const [value, setValue] = React.useState<Day | null>(null);
  const today = dayjs();
  const tomorrow = today.add(1, 'day');

  return (
    <div css={DayCalendar}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={['DateRangePicker', 'StaticDateRangePicker']}
        >
          <DemoItem label="날짜 선택" component="DateRangePicker">
            <DateRangePicker defaultValue={[today, tomorrow]} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

const DayCalendar = css`
  width: 100%;
  //   max-width: 1000px;

  display: flex;
  justify-content: flex-start;

  margin-top: 2.5rem;
`;

// import { Calendar } from 'react-date-range';
// import { Component } from 'react';
// class CalendarComponent extends Component {
//   handleSelect(date: any) {
//     console.log(date); // native Date object
//   }
//   render(){
//     return (<Calendar date= onChange= /> );
//   }
// }
// export default CalendarComponent;

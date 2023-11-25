/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-extraneous-dependencies */
import { Component } from 'react';
import { DateRange } from 'react-date-range';

interface CalendarState {
  startDate: Date;
  endDate: Date;
  key: string;
}

class CalendarComponent extends Component<{}, CalendarState> {
  constructor(props: any) {
    super(props);
    const today = new Date();
    this.state = {
      startDate: today,
      endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      key: 'selection',
    };
  }

  onRangeChange = (ranges: any) => {
    const { selection } = ranges;
    this.setState({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: selection.key,
    });
  };

  render() {
    const { startDate, endDate } = this.state;
    const ranges = {
      startDate,
      endDate,
      key: 'selection',
    };

    return (
      <div>
        <DateRange
          editableDateInputs
          onChange={this.onRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={[ranges]}
        />
        <br />
        <div>Start Date : {startDate.toString()}</div>
        <br />
        <div>End Date : {endDate.toString()}</div>
      </div>
    );
  }
}

export default CalendarComponent;

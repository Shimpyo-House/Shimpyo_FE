/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Component } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

interface CalendarState {
  startDate: Date;
  endDate: Date;
  key: string;
  showCalendar: boolean;
}

class CalendarComponent extends Component<{}, CalendarState> {
  constructor(props: any) {
    super(props);
    const today = new Date();
    this.state = {
      startDate: today,
      endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      key: 'selection',
      showCalendar: false,
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

  openCalendar = () => {
    this.setState({ showCalendar: true });
  };

  closeCalendar = () => {
    this.setState({ showCalendar: false });
  };

  render() {
    const { startDate, endDate, showCalendar } = this.state;
    const ranges = {
      startDate,
      endDate,
      key: 'selection',
    };

    const modalStyle = css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.5);
      display: ${showCalendar ? 'flex' : 'none'};
      justify-content: center;
      align-items: center;
      z-index: 1000;
      width: 100%;
      height: 100%;
    `;

    const modalContentStyle = css`
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    `;

    const closeButtonStyle = css`
      bottom: 0;
      background-color: #3d91ff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    `;

    return (
      <div>
        <button type="button" onClick={this.openCalendar}>
          날짜 선택하기
        </button>
        {showCalendar && (
          <div css={modalStyle}>
            <div css={modalContentStyle}>
              <DateRange
                editableDateInputs
                onChange={this.onRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[ranges]}
                minDate={addDays(new Date(), 0)}
                maxDate={addDays(new Date(), 14)}
              />
              <button
                type="button"
                onClick={this.closeCalendar}
                css={closeButtonStyle}
              >
                닫기
              </button>
            </div>
          </div>
        )}
        <br />
        <div>Start Date : {startDate.toString()}</div>
        <br />
        <div>End Date : {endDate.toString()}</div>
      </div>
    );
  }
}

export default CalendarComponent;

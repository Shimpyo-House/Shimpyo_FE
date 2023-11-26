/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsxImportSource @emotion/react */
import React, { Component } from 'react';
import { css } from '@emotion/react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays, format } from 'date-fns';

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
      endDate: addDays(today, 1),
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

    const nights = differenceInDays(endDate, startDate);
    const formattedEndDate = addDays(startDate, nights);

    const formattedStartDate = format(startDate, 'MM월 dd일');
    const formattedEndDateString = format(formattedEndDate, 'MM월 dd일');

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

    const selectButtonStyle = css`
      padding: 10px 20px;
      background-color: #3d91ff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-size: 16px;
      outline: none;

      &:hover {
        background-color: #2565cb;
      }

      &:active {
        transform: translateY(1px);
      }
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
        <button
          type="button"
          css={selectButtonStyle}
          onClick={this.openCalendar}
        >
          {`${formattedStartDate} ~ ${formattedEndDateString} (${nights}박)`}
        </button>
        <div css={modalStyle}>
          {showCalendar && (
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
                css={closeButtonStyle}
                onClick={this.closeCalendar}
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CalendarComponent;

/* eslint-disable no-alert */
import { SetStateAction, useState } from 'react';
import { css } from '@emotion/react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays, format } from 'date-fns';

interface CalendarProps {
  setNights: React.Dispatch<SetStateAction<number>>;
  onEnterExitDatesChange: (enterDate: string, exitDate: string) => void;
}

const CalendarComponent = ({
  setNights,
  onEnterExitDatesChange,
}: CalendarProps) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(addDays(today, 1));
  const [showCalendar, setShowCalendar] = useState(false);

  // const [newNights, setNewNights] = useState();

  const onRangeChange = (ranges: any) => {
    const { selection } = ranges;
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  };

  const openCalendar = () => {
    setShowCalendar(true);
  };

  const cancelCalendar = () => {
    setShowCalendar(false);
  };

  const closeCalendar = () => {
    if (startDate.toDateString() === endDate.toDateString()) {
      alert(
        '입실날짜와 퇴실날짜가 같을 수 없습니다. 최소 1박 이상 선택해주세요.',
      );
    } else {
      setShowCalendar(false);

      // 선택한 날짜에 따른 nights 값을 부모 컴포넌트로 전달
      const selectedNights = differenceInDays(endDate, startDate);
      setNights(selectedNights);

      // 변경된 날짜 정보 부모 컴포넌트로 전달
      const enterDate = format(startDate, 'yyyy-MM-dd');
      const exitDate = format(endDate, 'yyyy-MM-dd');
      console.log(enterDate, exitDate);
      onEnterExitDatesChange(enterDate, exitDate);
    }
  };

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
    // transition:
    //   transform 1s ease-in-out,
    //   opacity 1s ease-in-out;
    transform: translate(-50%, ${showCalendar ? '-50%' : '100%'});
    display: ${showCalendar ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
    width: 50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  `;

  const modalContentStyle = css`
    background-color: white;
    padding: 100%;
    border-radius: 15px;
    border: 2px solid #3d91ff;
  `;

  const selectButtonStyle = css`
    padding: 10px 20px;
    // background-color: #3d91ff;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 20px;
    font-weight: 600;
    outline: none;

    &:hover {
      font-weight: 900;
    }

    &:active {
      transform: translateY(1px);
    }
  `;

  const buttonContainer = css`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  `;

  const closeButtonStyle = css`
    width: 100%;
    bottom: 0;
    background-color: #3d91ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1rem;
    font-size: 1rem;
  `;

  const cancelButtonStyle = css`
    width: 100%;
    bottom: 0;
    background-color: #3d91ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 1rem;
    font-size: 1rem;
  `;

  const customStyle = css`
    .rdrMonth {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
    }

    .rdrDateDisplayWrapper {
      width: 600px;
    }

    .rdrCalendarWrapper {
      font-size: 14px;
    }

    .rdrDateDisplayItemActive input {
      font-size: 18px;
    }

    .rdrDateDisplayItem input {
      font-size: 18px;
    }
  `;

  return (
    <div>
      <button type="button" css={selectButtonStyle} onClick={openCalendar}>
        {`${formattedStartDate} ~ ${formattedEndDateString} (${nights}박)`}
      </button>
      <div css={modalStyle} style={{ display: showCalendar ? 'flex' : 'none' }}>
        {showCalendar && (
          <div css={modalContentStyle}>
            <div css={customStyle}>
              <DateRange
                editableDateInputs
                onChange={onRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[ranges]}
                minDate={addDays(new Date(), 0)}
                maxDate={addDays(new Date(), 30)}
              />
            </div>
            <div css={buttonContainer}>
              <button
                type="button"
                css={closeButtonStyle}
                onClick={closeCalendar}
              >
                선택
              </button>
              <button
                type="button"
                css={cancelButtonStyle}
                onClick={cancelCalendar}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;

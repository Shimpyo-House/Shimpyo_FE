/* eslint-disable no-alert */
import { SetStateAction, useState } from 'react';
import { css } from '@emotion/react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays, format } from 'date-fns';

const CalendarComponent = ({
  setNights,
}: {
  setNights: React.Dispatch<SetStateAction<number>>;
}) => {
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

  const closeCalendar = () => {
    if (startDate.toDateString() === endDate.toDateString()) {
      alert(
        '입실날짜와 퇴실날짜가 같을 수 없습니다. 최소 1박 이상 선택해주세요.',
      );
    } else {
      setShowCalendar(false);
      const selectedNights = differenceInDays(endDate, startDate);
      setNights(selectedNights); // 선택한 날짜에 따른 nights 값을 부모 컴포넌트로 전달
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

  const enterDate = format(startDate, 'yyyy-MM-dd');
  const exitDate = format(formattedEndDate, 'yyyy-MM-dd');

  console.log(enterDate);
  console.log(exitDate);

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
      <button type="button" css={selectButtonStyle} onClick={openCalendar}>
        {`${formattedStartDate} ~ ${formattedEndDateString} (${nights}박)`}
      </button>
      <div css={modalStyle}>
        {showCalendar && (
          <div css={modalContentStyle}>
            <DateRange
              editableDateInputs
              onChange={onRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={[ranges]}
              minDate={addDays(new Date(), 0)}
              maxDate={addDays(new Date(), 30)}
            />
            <button
              type="button"
              css={closeButtonStyle}
              onClick={closeCalendar}
            >
              선택
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;

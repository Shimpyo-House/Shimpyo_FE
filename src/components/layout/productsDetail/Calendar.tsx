/* eslint-disable no-alert */
import { SetStateAction, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays, format } from 'date-fns';
import swal from 'sweetalert';

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
    document.body.style.overflow = 'hidden';
  };

  const cancelCalendar = () => {
    setShowCalendar(false);
    document.body.style.overflow = 'auto';
  };

  const closeCalendar = () => {
    document.body.style.overflow = 'auto';
    if (startDate.toDateString() === endDate.toDateString()) {
      swal({
        title: '날짜 확인',
        text: '입실날짜와 퇴실날짜가 같을 수 없습니다. 최소 1박 이상 선택해주세요.',
        icon: 'error',
      });
    } else {
      setShowCalendar(false);

      // 선택한 날짜에 따른 nights 값을 부모 컴포넌트로 전달
      const selectedNights = differenceInDays(endDate, startDate);
      setNights(selectedNights);

      // 변경된 날짜 정보 부모 컴포넌트로 전달
      const enterDate = format(startDate, 'yyyy-MM-dd');
      const exitDate = format(endDate, 'yyyy-MM-dd');
      onEnterExitDatesChange(enterDate, exitDate);
    }
  };

  useEffect(() => {
    const handleHistoryChange = () => {
      setShowCalendar(false);
      document.body.style.overflow = 'auto';
    };

    window.addEventListener('popstate', handleHistoryChange);

    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
    };
  }, []);

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
    transform: translate(-50%, ${showCalendar ? '-50%' : '100vh'});
    display: ${showCalendar ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeOut 3s ease-out forwards;
  `;

  const modalContentStyle = css`
    background-color: white;
    // padding-right: 10rem;
    // padding-left: 10rem;
    padding-bottom: 1rem;
    margin-top: 3rem;
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

    &:active {
      transform: translateY(1px);
    }
  `;

  const closeButtonStyle = css`
    display: flex;
    width: 58%;
    height: 3rem;
    bottom: 0;
    background-color: #3d91ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 3rem;
    margin-right: auto;
    margin-left: auto;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
  `;

  const customStyle = css`
    .rdrMonth {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
    }

    .rdrDateDisplayWrapper {
      width: 450px;
      margin-top: 3rem;
    }

    .rdrCalendarWrapper {
      font-size: 12px;
    }

    .rdrDateDisplayItemActive input {
      font-size: 12px;
    }

    .rdrDateDisplayItem input {
      font-size: 12px;
    }

    .rdrCalendarWrapper {
      padding-right: 10rem;
      padding-left: 10rem;
    }
  `;

  const CalendarText = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  const closedButtonStyle = css`
    display: flex;
    color: black;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    position: absolute;
    margin-right: 1.5rem;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  `;

  const CalendarHeader = css`
    position: relative;
    padding-top: 3rem;
  `;

  return (
    <div>
      <button type="button" css={selectButtonStyle} onClick={openCalendar}>
        {`${formattedStartDate} ~ ${formattedEndDateString} (${nights}박)`}
      </button>
      <div css={modalStyle}>
        {showCalendar && (
          <div css={modalContentStyle}>
            <div css={customStyle}>
              <div css={CalendarHeader}>
                <div css={CalendarText}>날짜선택</div>
                <button
                  type="button"
                  css={closedButtonStyle}
                  onClick={cancelCalendar}
                >
                  X
                </button>
              </div>
              <DateRange
                editableDateInputs
                onChange={onRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[ranges]}
                minDate={addDays(new Date(), 0)}
                maxDate={addDays(new Date(), 40)}
              />
            </div>
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

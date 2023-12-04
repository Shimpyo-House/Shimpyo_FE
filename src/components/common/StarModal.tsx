/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { css } from '@emotion/react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import styled from '@emotion/styled';
import swal from 'sweetalert';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { axiosWithAccessToken } from '../../Axios';
import { loadingAtom } from '../../atoms/loading';

type ModalInfoType = {
  productId: number;
  productName: string;
  reservationProductId: number;
};

const registerStar = async ({
  productId,
  score,
  reservationProductId,
}: {
  productId: number;
  score: number;
  reservationProductId: number;
}) => {
  await axiosWithAccessToken.post('/api/stars', {
    productId,
    score,
    reservationProductId,
  });

};

const StarModal = ({
  isOpen,
  setIsOpen,
  modalInfo,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalInfo: ModalInfoType;
}) => {
  const [rating, setRating] = useState<number>(2.5);
  const setLoading = useSetRecoilState(loadingAtom);

  const handlerCloseButtonClick = async () => {
    setIsOpen(false);
  };

  const handlerButtonClick = async () => {
    try {
      setLoading({ isLoading: true, message: '별점을 등록중입니다.' });
      await registerStar({
        productId: modalInfo.productId,
        score: rating,
        reservationProductId: modalInfo.reservationProductId,
      });
      swal({ title: '성공적으로 별점이 등록됐습니다.', icon: 'info' });
    } catch (e: any) {
      if (e.response.status === 400) {
        swal({
          title: '체크아웃시간이 지나야 별점을 매길 수 있습니다',
          icon: 'error',
        });
      } else {
        swal({
          title: '예기치 못한 에러가 발생했습니다',
          icon: 'error',
        });
      }
    } finally {
      setIsOpen(false);
      setLoading({ isLoading: false, message: '' });
    }
  };

  return (
    <>
      <dialog open={isOpen} css={DialogStyle}>
        <Button css={CloseButtonStyle} onClick={handlerCloseButtonClick}>
          X
        </Button>
        <div css={StarContainer}>
          <h1>
            <b>{modalInfo.productName}</b> 이용은 어떠셨나요?
          </h1>
          <fieldset css={RatingField}>
            <StarInput setRating={setRating} value={5} isHalf={false} />
            <StarInput setRating={setRating} value={4.5} isHalf />
            <StarInput setRating={setRating} value={4} isHalf={false} />
            <StarInput setRating={setRating} value={3.5} isHalf />
            <StarInput setRating={setRating} value={3} isHalf={false} />
            <StarInput setRating={setRating} value={2.5} isHalf />
            <StarInput setRating={setRating} value={2} isHalf={false} />
            <StarInput setRating={setRating} value={1.5} isHalf />
            <StarInput setRating={setRating} value={1} isHalf={false} />
            <StarInput setRating={setRating} value={0.5} isHalf />
          </fieldset>
        </div>
        <div css={ButtonContainer}>
          <Button
            onClick={handlerButtonClick}
            variant="contained"
            css={ButtonStyle}
          >
            별점 등록
          </Button>
        </div>
      </dialog>
      {isOpen && (
        <div css={ModalBackground} onClick={handlerCloseButtonClick} />
      )}
    </>
  );
};

const StarInput = ({
  setRating,
  value,
  isHalf,
}: {
  setRating: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  isHalf: boolean;
}) => {
  return (
    <>
      <Input type="radio" name="rating" id={`star${value}`} value={value} />
      <Label
        onClick={() => {
          setRating(value);
        }}
        isHalf={isHalf}
        htmlFor={`star${value}`}
      >
        {isHalf ? <FaStarHalf size="48" /> : <FaStar size="48" />}
      </Label>
    </>
  );
};

const DialogStyle = css`
  position: fixed;

  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  width: 40rem;
  height: 20rem;

  border-style: none;

  z-index: 10001;
`;

const CloseButtonStyle = css`
  position: absolute;

  right: 1rem;
`;
const StarContainer = css`
  width: 100%;

  padding: 1rem;
`;

const RatingField = css`
  position: relative;

  width: 75%;

  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  margin-top: 3rem;

  border: none;

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;

const Input = styled.input`
  display: none;
`;

type LabelProps = {
  isHalf: boolean;
};

const Label = styled.label<LabelProps>`
  cursor: pointer;
  font-size: 1.5rem;
  color: lightgray;

  ${({ isHalf }) =>
    isHalf &&
    css`
      position: absolute;
      width: 24px;
      overflow: hidden;

      &:nth-of-type(10) {
        transform: translate(-216px);
      }
      &:nth-of-type(8) {
        transform: translate(-168px);
      }
      &:nth-of-type(6) {
        transform: translate(-120px);
      }
      &:nth-of-type(4) {
        transform: translate(-72px);
      }
      &:nth-of-type(2) {
        transform: translate(-24px);
      }
    `}
`;

const ButtonContainer = css`
  width: 100%;
  margin-top: 2rem;
  display: flex;
`;

const ButtonStyle = css`
  height: 3rem;

  margin: 0 auto;
`;

const ModalBackground = css`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 10000;
  background: rgb(0, 0, 0, 0.5);
`;
export default StarModal;

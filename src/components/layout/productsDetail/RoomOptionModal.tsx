import { css } from '@emotion/react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { RequestProductDetail } from '../../../types';

Modal.setAppElement('#root');

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  productDetail: RequestProductDetail;
  selectedRoomCode: number | null;
}

interface RoomOptionResponse {
  bathFacility: boolean;
  bath: boolean;
  homeTheater: boolean;
  airCondition: boolean;
  tv: boolean;
  pc: boolean;
  cable: boolean;
  internet: boolean;
  refrigerator: boolean;
  toiletries: boolean;
  sofa: boolean;
  cooking: boolean;
  table: boolean;
  hairDryer: boolean;
}

const RoomOptionModal = ({
  openModal,
  closeModal,
  productDetail,
  selectedRoomCode,
}: ModalProps) => {
  const selectedRoom = productDetail.rooms.find(
    (room) => room.roomCode === selectedRoomCode,
  );
  const serviceKey = (key: string) => {
    const keyKoreanName: Record<string, string> = {
      bathFacility: '샤워 시설',
      bath: '욕조',
      homeTheater: 'OTT 플랫폼',
      airCondition: '에어컨',
      tv: 'TV',
      pc: 'PC',
      cable: '케이블',
      internet: '무료 와이파이',
      refrigerator: '냉장고',
      toiletries: '화장실',
      sofa: '쇼파',
      cooking: '요리 시설',
      table: '식탁',
      hairDryer: '헤어 드라이기',
    };

    return keyKoreanName[key];
  };
  const serviceValue = (value: RoomOptionResponse) => (value ? '✅' : '❌');
  return (
    <Modal isOpen={openModal} style={ModalStyles}>
      <IoClose css={CloseButton} onClick={closeModal} />
      {selectedRoom && (
        <div css={RoomInfoContainer}>
          <h2 css={RoomInfoTitle}>객실 시설 및 서비스</h2>
          {Object.entries(selectedRoom.roomOptionResponse).map(
            ([key, value]) => (
              <span key={key}>
                {`${serviceValue(value)} ${serviceKey(key)} `}
                <br />
              </span>
            ),
          )}
        </div>
      )}
    </Modal>
  );
};

export default RoomOptionModal;

const ModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.05)',
    width: '100%',
    height: '100vh',
    zIndex: '90000',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '40rem',
    height: '40rem',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};

const CloseButton = css`
  width: 2rem;
  height: 2rem;

  margin-left: 94%;

  cursor: pointer;
`;

const RoomInfoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const RoomInfoTitle = css`
  margin-bottom: 1.5rem;
`;

import { css } from '@emotion/react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import ShowerIcon from '@mui/icons-material/Shower';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CastIcon from '@mui/icons-material/Cast';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ComputerIcon from '@mui/icons-material/Computer';
import CableIcon from '@mui/icons-material/Cable';
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
import WcIcon from '@mui/icons-material/Wc';
import ChairIcon from '@mui/icons-material/Chair';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import TableBarIcon from '@mui/icons-material/TableBar';
import AirIcon from '@mui/icons-material/Air';
import { RequestProductDetail } from '../../../types';

Modal.setAppElement('#root');

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  productDetail: RequestProductDetail;
  selectedRoomCode: number | null;
}

// interface RoomOptionResponse {
//   bathFacility: boolean;
//   bath: boolean;
//   homeTheater: boolean;
//   airCondition: boolean;
//   tv: boolean;
//   pc: boolean;
//   cable: boolean;
//   internet: boolean;
//   refrigerator: boolean;
//   toiletries: boolean;
//   sofa: boolean;
//   cooking: boolean;
//   table: boolean;
//   hairDryer: boolean;
// }

const getIcon = (key: string) => {
  switch (key) {
    case 'bathFacility':
      return <ShowerIcon />;
    case 'bath':
      return <BathtubIcon />;
    case 'homeTheater':
      return <CastIcon />;
    case 'airCondition':
      return <AcUnitIcon />;
    case 'tv':
      return <LiveTvIcon />;
    case 'pc':
      return <ComputerIcon />;
    case 'cable':
      return <CableIcon />;
    case 'internet':
      return <WifiIcon />;
    case 'refrigerator':
      return <KitchenIcon />;
    case 'toiletries':
      return <WcIcon />;
    case 'sofa':
      return <ChairIcon />;
    case 'cooking':
      return <SoupKitchenIcon />;
    case 'table':
      return <TableBarIcon />;
    case 'hairDryer':
      return <AirIcon />;
    default:
      return null;
  }
};

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

    console.log(selectedRoom?.roomOptionResponse);
    return keyKoreanName[key];
  };
  // const serviceValue = (value: RoomOptionResponse) => (value ? '✅' : '❌');

  return (
    <Modal isOpen={openModal} style={ModalStyles}>
      {selectedRoom && (
        <div css={RoomInfoContainer}>
          <div css={RoomInfoTitleWrapper}>
            <h2 css={RoomInfoTitle}>객실 시설 및 서비스</h2>
            <IoClose css={CloseButton} onClick={closeModal} />
          </div>
          {Object.entries(selectedRoom.roomOptionResponse).map(
            ([key, value]) => (
              <div key={key} css={ServiceRow}>
                {value ? (
                  <div css={IconTextWrapper}>
                    {getIcon(key)}
                    <span>{serviceKey(key)}</span>
                  </div>
                ) : (
                  <div css={IconTextWrapper}>
                    <span css={[Icon, StrikeThrough]}>{getIcon(key)}</span>
                    <span css={StrikeThrough}>{serviceKey(key)}</span>
                  </div>
                )}
              </div>
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
    height: '41rem',
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

const RoomInfoTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CloseButton = css`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-left: auto;
`;

const RoomInfoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const RoomInfoTitle = css`
  margin-left: auto;
  padding-left: 2rem;
`;

const ServiceRow = css`
  display: flex;
  align-items: center;
`;

const StrikeThrough = css`
  text-decoration: line-through;
  text-decoration-thickness: 0.1563rem;
`;

const IconTextWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Icon = css`
  display: inline-block;
`;

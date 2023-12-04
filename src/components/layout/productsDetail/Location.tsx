import { css } from '@emotion/react';
import { useEffect } from 'react';

const Location = ({
  address,
  productName,
}: {
  address: string;
  productName: string;
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=b92e72579927a4979cd3df30c71f2096';
    script.async = true;
    document.head.appendChild(script);

    const initMap = () => {
      const { kakao } = window as any;

      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      // 지도 생성
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체 생성
      const geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표 검색
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과 위치 마커 표시
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });

          const infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;border:1px solid gray;">${productName}</div>`,
          });
          infoWindow.open(map, marker);

          // 지도 중심 이동
          map.setCenter(coords);

          const createLink = () => {
            const mapbtn = document.getElementById('map-btn');
            mapbtn?.addEventListener('click', () => {
              const location = encodeURIComponent(address);
              const lat = encodeURIComponent(result[0].y);
              const lng = encodeURIComponent(result[0].x);
              const url = `https://map.kakao.com/link/to/${location},${lat},${lng}`;
              window.location.href = url;
            });
          };

          createLink();
        }
      });
    };
    // Kakao Map API 로드 후 initMap 함수 실행
    script.onload = initMap;
  }, [address]);

  return (
    <div>
      <div css={mapContainer}>
        <div id="map" style={{ width: '1210px', height: '550px' }} />
        <button type="button" id="map-btn">
          길찾기
        </button>
      </div>
    </div>
  );
};

export default Location;

const mapContainer = css``;

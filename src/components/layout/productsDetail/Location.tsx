import { useEffect } from 'react';

const LocationWithCustomOverlay = ({
  productName,
  address,
  images,
}: {
  productName: string;
  address: string;
  images: string[];
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=b92e72579927a4979cd3df30c71f2096';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window as any;

      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 지도 중심 임시 설정
        level: 3,
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });

          const overlayContent = `
            <div class="overlay" style="background-color: white; border: 1px solid #ccc; border-radius: 10px;">
              <div class="wrap">
                <div class="info">
                  <div class="title" style="background-color: #6195E6; border-top-left-radius: 10px;
                  border-top-right-radius: 10px; padding: 10px; font-weight: 700; color: white;">
                    ${productName}
                  </div>
                  <div class="body">
                    <div class="desc">
                      <div class="ellipsis" style="padding-top: 10px; padding-left: 10px; padding-right: 10px; font-weight:500;">${address}</div>
                      <button id="map-btn" style="cursor: pointer; color: blue; padding: 10px; font-weight: 500">길찾기</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;

          const overlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            map,
            position: marker.getPosition(), // 마커 위치로 오버레이 위치 설정
            yAnchor: 1,
            clickable: true,
          });

          kakao.maps.event.addListener(marker, 'click', () => {
            overlay.setMap(map);
          });

          // 오버레이를 처음에는 숨김
          overlay.setMap(null);

          // 마커의 위치로 지도 중심 변경
          map.setCenter(coords);

          // // closeOverlay 함수를 전역 객체에 추가
          // window.closeOverlay = () => {
          //   overlay.setMap(null);
          // };

          // 길찾기 버튼 클릭 시
          const createLink = () => {
            const mapbtn = document.getElementById('map-btn');
            console.log('11');

            const handleMapButtonClick = () => {
              const location = encodeURIComponent(address);
              const lat = encodeURIComponent(result[0].y);
              const lng = encodeURIComponent(result[0].x);
              const url = `https://map.kakao.com/link/to/${location},${lat},${lng}`;
              console.log(location, url);
              window.open(url, '_blank'); // 새 창으로 열기
            };

            // 기존 이벤트 핸들러 제거 후 새로운 핸들러 등록
            mapbtn?.removeEventListener('click', handleMapButtonClick);
            mapbtn?.addEventListener('click', handleMapButtonClick);
          };

          createLink();
        }
      });
    };
  }, [address, images, productName]);

  return (
    <div>
      <div id="map" style={{ width: '1210px', height: '500px' }} />
    </div>
  );
};

export default LocationWithCustomOverlay;

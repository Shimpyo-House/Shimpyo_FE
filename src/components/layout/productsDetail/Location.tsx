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
    let overlay: any;

    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=b92e72579927a4979cd3df30c71f2096';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window as any;

      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
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

          const overlayElement = document.createElement('div');
          overlayElement.className = 'overlay';
          overlayElement.style.backgroundColor = 'white';
          overlayElement.style.border = '1px solid #ccc';
          overlayElement.style.borderRadius = '10px';

          const wrap = document.createElement('div');
          wrap.className = 'wrap';

          const info = document.createElement('div');
          info.className = 'info';

          const title = document.createElement('div');
          title.className = 'title';
          title.style.backgroundColor = '#6195E6';
          title.style.borderTopLeftRadius = '10px';
          title.style.borderTopRightRadius = '10px';
          title.style.padding = '10px';
          title.style.fontWeight = '700';
          title.style.color = 'white';
          title.innerText = productName;

          const body = document.createElement('div');
          body.className = 'body';

          const desc = document.createElement('div');
          desc.className = 'desc';
          desc.style.paddingTop = '12px';
          desc.style.paddingBottom = '6px';
          desc.style.paddingLeft = '10px';
          desc.style.paddingRight = '10px';
          desc.style.fontWeight = '600';
          desc.innerText = address;

          const mapBtn = document.createElement('button');
          mapBtn.id = 'map-btn';
          mapBtn.style.cursor = 'pointer';
          mapBtn.style.color = 'blue';
          mapBtn.style.padding = '10px';
          mapBtn.style.fontWeight = '500';
          mapBtn.innerText = '길찾기';

          desc.appendChild(mapBtn);
          body.appendChild(desc);
          info.appendChild(title);
          info.appendChild(body);
          wrap.appendChild(info);
          overlayElement.appendChild(wrap);

          const createLink = () => {
            const location = encodeURIComponent(address);
            const lat = encodeURIComponent(result[0].y);
            const lng = encodeURIComponent(result[0].x);
            const url = `https://map.kakao.com/link/to/${location},${lat},${lng}`;
            window.open(url, '_blank');
          };

          mapBtn.onclick = () => {
            createLink();
          };

          overlay = new kakao.maps.CustomOverlay({
            content: overlayElement,
            map,
            position: marker.getPosition(),
            yAnchor: 1.5,
            clickable: true,
          });

          kakao.maps.event.addListener(marker, 'click', () => {
            overlay.setMap(map);
          });

          kakao.maps.event.addListener(map, 'click', () => {
            overlay.setMap(null);
          });

          overlay.setMap(null);
          map.setCenter(coords);
        }
      });
    };

    return () => {
      if (overlay) {
        overlay.setMap(null);
      }
    };
  }, [address, images, productName]);

  return (
    <div>
      <div id="map" style={{ width: '1210px', height: '500px' }} />
    </div>
  );
};

export default LocationWithCustomOverlay;

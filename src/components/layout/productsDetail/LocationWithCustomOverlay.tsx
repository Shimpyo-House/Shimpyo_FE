/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import { createRoot } from 'react-dom/client';

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
          overlayElement.style.zIndex = '1';

          const wrap = document.createElement('div');
          wrap.className = 'wrap';

          const info = document.createElement('div');
          info.className = 'info';

          const title = document.createElement('div');
          title.className = 'title';
          title.style.backgroundColor = '#6195E6';
          title.style.borderTopLeftRadius = '0.625rem';
          title.style.borderTopRightRadius = '0.625rem';
          title.style.padding = '0.625rem';
          title.style.fontWeight = '700';
          title.style.color = 'white';
          title.innerText = productName;

          const body = document.createElement('div');
          body.className = 'body';

          const desc = document.createElement('div');
          desc.className = 'desc';
          desc.style.display = 'flex';
          desc.style.alignItems = 'center';
          desc.style.justifyContent = 'space-between';
          desc.style.paddingTop = '0.75rem';
          desc.style.paddingBottom = '0.375rem';
          desc.style.paddingLeft = '0.625rem';
          desc.style.paddingRight = '0.625rem';
          desc.style.fontWeight = '600';

          const addressElement = document.createElement('div');
          addressElement.innerText = address;

          const mapBtn = document.createElement('div');
          mapBtn.id = 'map-btn';
          mapBtn.style.cursor = 'pointer';
          mapBtn.style.color = 'blue';
          mapBtn.style.fontWeight = '500';
          mapBtn.style.position = 'relative';
          mapBtn.style.marginLeft = '0.625rem';

          const mapIcon = (
            <IconButton onClick={() => createLink()} size="small">
              <TurnSlightRightIcon fontSize="small" />
            </IconButton>
          );

          createRoot(mapBtn).render(mapIcon);

          desc.appendChild(addressElement);
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
      <div css={mapContainer}>
        <div
          id="map"
          style={{
            width: '1210px',
            height: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '2rem',
          }}
        />
      </div>
    </div>
  );
};

export default LocationWithCustomOverlay;

const mapContainer = css`
  max-width: 1280px;
  position: relative;
  z-index: 0;
`;

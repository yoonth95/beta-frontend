import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import mapPinIcon from "@/assets/icon-map-pin.svg";

const apiKey = import.meta.env.VITE_APP_KAKAOMAP_API_KEY as string;

interface PropsType {
  lat: number;
  lng: number;
}

export default function LocationMap({ lat, lng }: PropsType) {
  useKakaoLoader({ appkey: apiKey });

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat,
        lng,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "400px",
      }}
      level={4} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat,
          lng,
        }}
        image={{
          src: mapPinIcon, // 마커이미지의 주소입니다
          size: {
            width: 29,
            height: 42,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 14.5,
              y: 42,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      />
    </Map>
  );
}

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

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
      />
    </Map>
  );
}

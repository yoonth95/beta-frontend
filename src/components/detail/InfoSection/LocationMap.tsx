import { useEffect, useState } from "react";
import mapPinIcon from "@/assets/icon-map-pin.svg";

const { kakao } = window;

interface PropsType {
  lat: number;
  lng: number;
}

export default function LocationMap({ lat = 127.055596615858, lng = 37.5069494959122 }: PropsType) {
  // const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);
    // setMap(kakaoMap);

    const imageSrc = mapPinIcon; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(29, 42); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(14.5, 42) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      image: markerImage,
    });
    marker.setMap(map);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
}

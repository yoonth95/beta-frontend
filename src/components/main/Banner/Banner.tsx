import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@/components/common";
import { useCarouselDragStore } from "@/stores/useCarouselDragStore";
import { getBannerImages } from "@/apis";
import styles from "./Banner.module.css";

const Banner = () => {
  const navigate = useNavigate();
  const { isDragging } = useCarouselDragStore();
  const { data, status, error } = useQuery({
    queryKey: ["bannerData"],
    queryFn: async () => await getBannerImages(),
  });

  if (status === "error") return <>{error.message}</>;

  const handleClickBannerImage = (showId: number) => (e: React.MouseEvent) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }
    navigate(`detail/${showId}`);
  };
  return (
    <>
      <Carousel index={0}>
        {status === "pending" ? (
          <>loading...</>
        ) : (
          data.map((item) => (
            <div onClick={handleClickBannerImage(item.show_id)} key={item.id}>
              <img src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.image_url}`} className={styles["banner-image"]} />
            </div>
          ))
        )}
      </Carousel>
    </>
  );
};

export default Banner;

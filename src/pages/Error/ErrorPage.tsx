import { Button } from "@/components/common";
import { useNavigate } from "react-router-dom";
import imgNotFound from "@/assets/image-notfound.png";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className="a11y-hidden">404 페이지</h1>
        <img src={imgNotFound} className={styles.image} />
        <section>
          <h2 className={styles.title}>페이지를 찾을 수 없습니다.</h2>
          <p className={styles["title-desc"]}>
            페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br /> 웹 주소가 올바른지 확인해 주세요.
          </p>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로
          </Button>
        </section>
      </main>
    </div>
  );
};

export default ErrorPage;

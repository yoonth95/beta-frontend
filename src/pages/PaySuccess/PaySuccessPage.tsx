import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CheckBoxIconSrc from "@/assets/checkbox-payment.svg";
import axios from "axios";

const PaySuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    const secretKey = import.meta.env.TOSS_PAYMENTS_SECRET_KEY as string;
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    const confirm = async () => {
      const { data, status } = await axios.post("https://api.tosspayments.com/v1/payments/confirm", requestData, {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
      });

      if (status !== 200) {
        navigate(`/payment/fail?code=${data.code}&message=${data.message}`);
        return;
      }
    };
    confirm();
  }, []);

  return (
    <div className="wrapper w-100">
      <div
        className="flex-column align-center confirm-success max-w-540 responsive"
        style={{
          display: "flex",
        }}
      >
        <img src={CheckBoxIconSrc} width="120" height="120" />
        <h2 className="title">결제를 완료했어요</h2>
        <div className="response-section w-100">
          <div className="flex justify-between">
            <span className="response-label">결제 금액</span>
            <span id="amount" className="response-text">
              {Number(searchParams.get("amount")).toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between">
            <span className="response-label">주문번호</span>
            <span id="orderId" className="response-text">
              {searchParams.get("orderId")}
            </span>
          </div>
        </div>

        <div className="w-100 button-group">
          <div className="flex" style={{ gap: "16px" }}>
            <Link to="/mypage/reservation" className="btn w-100 ">
              마이페이지에서 확인
            </Link>
            <Link to="/" className="btn w-100 red">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySuccessPage;

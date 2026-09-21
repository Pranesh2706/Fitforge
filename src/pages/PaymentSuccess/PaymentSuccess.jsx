import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const payment = location.state;

  /* =========================
     NO PAYMENT STATE
  ========================= */

  if (!payment) {
    return (
      <div className="payment-success-page">
        <div className="success-container error-container">
          <div className="success-icon error-icon">!</div>

          <p className="success-eyebrow">PAYMENT INFORMATION</p>

          <h1>
            NO PAYMENT
            <br />
            <span>FOUND.</span>
          </h1>

          <p className="success-message">
            We couldn't find a recent payment session.
          </p>

          <button
            className="success-button primary"
            onClick={() => navigate("/pricing")}
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     PAYMENT SUCCESS
  ========================= */

  return (
    <div className="payment-success-page">
      {/* =========================
          HEADER
      ========================= */}

      <header className="success-header">
        <div className="success-logo">
          FIT<span>FORGE</span>
        </div>

        <div className="success-secure">
          <span>🔒</span>
          Secure Payment
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="success-container">
        {/* =========================
            ANIMATED SUCCESS ICON
        ========================= */}

        <div className="success-icon">
          <svg className="success-check" viewBox="0 0 52 52" aria-hidden="true">
            <circle className="success-circle" cx="26" cy="26" r="24" />

            <path className="success-checkmark" d="M14 27l8 8 16-18" />
          </svg>
        </div>

        {/* =========================
            SUCCESS TITLE
        ========================= */}

        <p className="success-eyebrow">PAYMENT SUCCESSFUL</p>

        <h1>
          WELCOME TO
          <br />
          <span>FITFORGE.</span>
        </h1>

        <p className="success-message">
          {payment.customerName
            ? `Hey ${payment.customerName}, your membership is now active.`
            : "Your membership is now active."}
        </p>

        {/* =========================
            MEMBERSHIP CARD
        ========================= */}

        <div className="membership-card">
          {/* CARD TOP */}

          <div className="membership-card-top">
            <div>
              <p className="card-label">MEMBERSHIP PLAN</p>

              <h2>{payment.plan}</h2>
            </div>

            <div className="active-status">
              <span></span>
              ACTIVE
            </div>
          </div>

          <div className="membership-divider"></div>

          {/* MEMBERSHIP DETAILS */}

          <div className="membership-details">
            <div>
              <p>AMOUNT PAID</p>
              <strong>{payment.price}</strong>
            </div>

            <div>
              <p>BILLING</p>
              <strong>MONTHLY</strong>
            </div>

            <div>
              <p>STATUS</p>
              <strong>ACTIVE</strong>
            </div>
          </div>

          <div className="membership-divider"></div>

          {/* TRANSACTION DETAILS */}

          <div className="transaction-details">
            <div>
              <span>Payment ID</span>

              <strong>{payment.paymentId}</strong>
            </div>

            <div>
              <span>Order ID</span>

              <strong>{payment.orderId}</strong>
            </div>
          </div>
        </div>

        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div className="success-actions">
          <button
            className="success-button primary"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          <button
            className="success-button secondary"
            onClick={() => navigate("/programs")}
          >
            Explore Workouts
          </button>
        </div>

        {/* =========================
            FOOTER TEXT
        ========================= */}

        <p className="success-footer-text">
          Your membership is ready. Time to get stronger.
        </p>
      </main>
    </div>
  );
}

export default PaymentSuccess;

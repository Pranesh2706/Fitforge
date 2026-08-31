import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const payment = location.state;

  if (!payment) {
    return (
      <div className="payment-success-page">
        <div className="success-container">
          <div className="success-icon">!</div>

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
            className="success-button"
            onClick={() => navigate("/pricing")}
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-page">
      {/* Header */}

      <header className="success-header">
        <div className="success-logo">
          FIT<span>FORGE</span>
        </div>

        <div className="success-secure">
          <span>🔒</span>
          Secure Payment
        </div>
      </header>

      {/* Main */}

      <main className="success-container">
        <div className="success-icon">✓</div>

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

        {/* Membership Card */}

        <div className="membership-card">
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

        {/* Buttons */}

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

        <p className="success-footer-text">
          Your membership is ready. Time to get stronger.
        </p>
      </main>
    </div>
  );
}

export default PaymentSuccess;

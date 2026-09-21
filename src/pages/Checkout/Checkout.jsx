import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // Get selected plan from Pricing page
  const selectedPlan = location.state?.plan;

  // If user directly opens /checkout without selecting a plan
  if (!selectedPlan) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <div className="checkout-logo">
            FIT<span>FORGE</span>
          </div>

          <div className="secure-checkout">
            <span>🔒</span>
            Secure Checkout
          </div>
        </header>

        <main className="checkout-container">
          <div className="checkout-heading">
            <p className="eyebrow">MEMBERSHIP</p>

            <h1>
              NO PLAN
              <br />
              <span>SELECTED.</span>
            </h1>

            <p>
              Please select a membership plan before continuing to checkout.
            </p>

            <button
              className="pay-button"
              onClick={() => navigate("/pricing")}
              style={{ marginTop: "30px" }}
            >
              Choose a Plan
            </button>
          </div>
        </main>
      </div>
    );
  }

  const plan = selectedPlan;

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      alert("Please fill in all your details.");
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        alert("Razorpay failed to load. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Create order on backend
      const orderResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: plan.amount,
            plan: plan.name,
          }),
        },
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.message || "Unable to create payment order");
      }

      // 3. Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: orderData.order.amount,

        currency: orderData.order.currency,

        name: "FitForge",

        description: `${plan.name} Membership`,

        order_id: orderData.order.id,

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },

        theme: {
          color: "#b1f800",
        },

        // 4. Payment success
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,

                  razorpay_payment_id: response.razorpay_payment_id,

                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData.success) {
              alert("Payment verification failed.");
              return;
            }

            // Payment verified successfully
            navigate("/");
          } catch (error) {
            console.error("Verification error:", error);

            alert("Unable to verify payment.");

            setLoading(false);
          }
        },

        // 6. Razorpay modal closed
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // 7. Open Razorpay
      const razorpay = new window.Razorpay(options);

      // 8. Payment failed
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

        alert(
          response.error.description || "Payment failed. Please try again.",
        );

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);

      alert(error.message || "Something went wrong. Please try again.");

      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <header className="checkout-header">
        <div className="checkout-logo">
          FIT<span>FORGE</span>
        </div>

        <div className="secure-checkout">
          <span>🔒</span>
          Secure Checkout
        </div>
      </header>

      {/* Main */}
      <main className="checkout-container">
        {/* Heading */}
        <div className="checkout-heading">
          <p className="eyebrow">MEMBERSHIP</p>

          <h1>
            COMPLETE YOUR
            <br />
            <span>MEMBERSHIP.</span>
          </h1>

          <p>You're one step away from reaching your fitness goals.</p>
        </div>

        {/* Checkout Grid */}
        <div className="checkout-grid">
          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <section className="checkout-summary">
            <div className="checkout-section-label">YOUR MEMBERSHIP</div>

            <div className="selected-plan">
              <div>
                <p className="selected-plan-name">{plan.name}</p>

                <p className="selected-plan-description">{plan.description}</p>
              </div>

              <div className="selected-price">
                {plan.price}

                <span>{plan.period}</span>
              </div>
            </div>

            <div className="checkout-divider"></div>

            <p className="included-title">WHAT'S INCLUDED</p>

            <ul className="checkout-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="checkout-divider"></div>

            <div className="price-row">
              <span>Membership</span>
              <span>{plan.price}</span>
            </div>

            <div className="price-row">
              <span>Billing</span>
              <span>Monthly</span>
            </div>

            <div className="total-row">
              <span>Total</span>

              <strong>{plan.price}</strong>
            </div>

            <p className="billing-note">
              This is currently a test payment. No real money will be charged.
            </p>
          </section>

          {/* =========================
              CUSTOMER + PAYMENT
          ========================= */}

          <section className="checkout-payment">
            <div className="checkout-section-label">PAYMENT DETAILS</div>

            {/* Full Name */}
            <div className="form-group">
              <label>FULL NAME</label>

              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email + Phone */}
            <div className="form-row">
              <div className="form-group">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label>PHONE NUMBER</label>

                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="payment-info-box">
              <div className="payment-info-icon">🔒</div>

              <div>
                <strong>Secure Razorpay Checkout</strong>

                <p>
                  UPI, cards, net banking and other payment methods are securely
                  handled by Razorpay.
                </p>
              </div>
            </div>

            {/* Pay Button */}
            <button
              className={`pay-button ${loading ? "payment-loading" : ""}`}
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <span className="payment-loader-content">
                  <span className="payment-spinner"></span>
                  <span>Processing Payment...</span>
                </span>
              ) : (
                `Pay ${plan.price} & Start Membership`
              )}
            </button>

            {/* Security */}
            <div className="payment-security">
              <span>🔒</span>

              <p>
                Your payment is processed securely. FitForge never stores your
                card details.
              </p>
            </div>

            {/* Trust */}
            <div className="trust-items">
              <div>
                <span>✓</span>
                Secure Payments
              </div>

              <div>
                <span>✓</span>
                Instant Activation
              </div>

              <div>
                <span>✓</span>
                Cancel Anytime
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Checkout;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const plan = {
    name: "PRO",
    price: "₹999",
    amount: 999,
    period: "/ month",
    description: "For members who are serious about making progress.",
    features: [
      "All training programs",
      "Advanced progress tracking",
      "Personalized recommendations",
      "Nutrition guidance",
      "Trainer support",
    ],
  };

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
      // 1. Load Razorpay Checkout
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        alert("Razorpay failed to load. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Create order on our backend
      const orderResponse = await fetch(
        // "http://localhost:5000/api/payment/create-order",
        "https://fitforge-cilr.onrender.com/api/payment/create-order",
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

      // 3. Razorpay Checkout options
      const options = {
        key: "rzp_test_TWI1gmd1gCYe9g",

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

        handler: async function (response) {
          try {
            // 4. Send payment details to backend
            const verifyResponse = await fetch(
              // "http://localhost:5000/api/payment/verify",
              "https://fitforge-cilr.onrender.com/api/payment/verify",
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

            // 5. Payment verified successfully
            navigate("/payment-success", {
              state: {
                plan: plan.name,
                price: plan.price,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                customerName: customer.name,
              },
            });
          } catch (error) {
            console.error("Verification error:", error);
            alert("Unable to verify payment.");
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // 6. Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);

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
              className="pay-button"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Pay ${plan.price} & Start Membership`}
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

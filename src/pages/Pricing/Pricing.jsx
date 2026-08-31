import "./Pricing.css";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  const plans = [
    {
      name: "STARTER",
      price: "₹499",
      period: "/ month",
      description: "Everything you need to start your fitness journey.",
      features: [
        "Access to beginner programs",
        "Workout tracking",
        "Basic progress analytics",
        "Exercise library",
      ],
    },
    {
      name: "PRO",
      price: "₹999",
      period: "/ month",
      description: "For members who are serious about making progress.",
      popular: true,
      features: [
        "All training programs",
        "Advanced progress tracking",
        "Personalized recommendations",
        "Nutrition guidance",
        "Trainer support",
      ],
    },
    {
      name: "ELITE",
      price: "₹1,999",
      period: "/ month",
      description: "The complete FITFORGE experience with expert coaching.",
      features: [
        "Everything in Pro",
        "1-on-1 trainer guidance",
        "Personalized workout plans",
        "Weekly progress reviews",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="pricing-page">
      {/* Hero */}
      <section className="pricing-hero">
        <p className="eyebrow">SIMPLE. FLEXIBLE. POWERFUL.</p>

        <h1>
          INVEST IN YOUR
          <br />
          <span>STRONGEST SELF.</span>
        </h1>

        <p>
          Choose a plan that fits your goals and get everything you need to
          train consistently and make measurable progress.
        </p>
      </section>

      {/* Plans */}
      <section className="pricing-plans">
        <div className="section-heading">
          <p className="eyebrow">MEMBERSHIP</p>

          <h2>
            Choose your <span>plan.</span>
          </h2>

          <p>Start where you are. Upgrade whenever you're ready.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <article
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="popular-badge">MOST POPULAR</div>
              )}

              <p className="pricing-plan-name">{plan.name}</p>

              <h3>
                {plan.price}
                <span>{plan.period}</span>
              </h3>

              <p className="pricing-description">{plan.description}</p>

              <div className="pricing-divider"></div>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="pricing-button"
                onClick={() => navigate("/checkout")}
              >
                Get Started
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pricing-cta">
        <p className="eyebrow">NO LONG-TERM COMMITMENT</p>

        <h2>
          Start today.
          <br />
          <span>Get stronger tomorrow.</span>
        </h2>

        <p>Your first step is the only one that matters right now.</p>
      </section>
    </div>
  );
}

export default Pricing;

import { useEffect, useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // =================================
  // LOAD LOGGED-IN USER DATA
  // =================================
  useEffect(() => {
    const savedUser = localStorage.getItem("fitforge_user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.error("Unable to load user data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="contact-section" id="contact">
      {/* Background Number */}
      <div className="contact-bg-number">04</div>

      <div className="contact-container">
        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="contact-left">
          <div className="contact-eyebrow">
            <span></span>
            GET IN TOUCH
          </div>

          <h2>
            LET'S TALK
            <br />
            <span>FITNESS.</span>
          </h2>

          <p className="contact-intro">
            Have a question about our programs, membership plans, or training?
            Our team is ready to help you take the next step toward becoming
            stronger.
          </p>

          {/* Contact Information */}

          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-info-number">01</span>

              <div>
                <small>EMAIL US</small>

                <a href="mailto:hello@fitforge.com">hello@fitforge.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-number">02</span>

              <div>
                <small>CALL US</small>

                <a href="tel:+918056451650">+91 80564 51650</a>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-number">03</span>

              <div>
                <small>VISIT US</small>

                <p>
                  Chennai, Tamil Nadu
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Availability */}

          <div className="contact-availability">
            <span className="availability-dot"></span>

            <div>
              <strong>WE'RE HERE TO HELP</strong>

              <p>Monday – Saturday · 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* =================================
            RIGHT SIDE FORM
        ================================= */}

        <div className="contact-right">
          <div className="contact-form-top">
            <div>
              <span>01</span>
              <p>SEND A MESSAGE</p>
            </div>

            <span className="contact-form-label">FITFORGE SUPPORT</span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name + Email */}

            <div className="contact-form-row">
              <div className="contact-form-group">
                <label>FULL NAME</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone + Subject */}

            <div className="contact-form-row">
              <div className="contact-form-group">
                <label>PHONE NUMBER</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="contact-form-group">
                <label>SUBJECT</label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>

                  <option value="program">Training Programs</option>

                  <option value="membership">Membership</option>

                  <option value="trainer">Trainer Support</option>

                  <option value="payment">Payment & Billing</option>

                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}

            <div className="contact-form-group">
              <label>YOUR MESSAGE</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows="7"
                required
              ></textarea>
            </div>

            {/* Submit */}

            <button type="submit" className="contact-submit">
              <span>{submitted ? "MESSAGE SENT" : "SEND MESSAGE"}</span>

              <strong>{submitted ? "✓" : "↗"}</strong>
            </button>
          </form>

          {/* Success */}

          {submitted && (
            <div className="contact-message">
              <div className="message-icon">✓</div>

              <div>
                <strong>MESSAGE SENT</strong>

                <p>
                  Thanks for reaching out. We'll get back to you as soon as
                  possible.
                </p>
              </div>

              <button type="button" onClick={() => setSubmitted(false)}>
                ×
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;

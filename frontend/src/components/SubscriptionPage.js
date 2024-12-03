import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Subscription.css";

function SubscriptionPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedPlan = queryParams.get("plan");
    const planPrice = {
        frost_guard: "$249.99",
        blizzard_buster: "$299.99",
        arctic_shield: "$329.99",
    }[selectedPlan] || "N/A";

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        name: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Subscribed to ${selectedPlan} successfully!`);
    };

    return (
        <div className="subscription-page">
            <div className="background-overlay">
                <div className="subscription-container">
                    {/* Subscription Details Section */}
                    <div className="subscription-details">
                        <h2>Subscription Details</h2>
                        <div className="subscription-info">
                            <p><strong>Plan:</strong> {selectedPlan}</p>
                            <p><strong>Price:</strong> {planPrice}</p>
                        </div>
                        <div className="total-amount">
                            <p>Total Amount:</p>
                            <h1>{planPrice}</h1>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="payment-section">
                        <h2>Payment Method</h2>
                        <form className="payment-form" onSubmit={handleSubscribe}>
                            <div className="form-group">
                                <label htmlFor="name">Name on Card</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={paymentDetails.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={paymentDetails.cardNumber}
                                    onChange={handleInputChange}
                                    maxLength="19"
                                    required
                                />
                            </div>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        placeholder="123"
                                        value={paymentDetails.cvv}
                                        onChange={handleInputChange}
                                        maxLength="3"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;

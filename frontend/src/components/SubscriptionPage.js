import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Subscription.css";

function SubscriptionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const selectedPlan = queryParams.get("plan");

    // Define plan details
    const planDetails = {
        frost_guard: { name: "Frost Guard", price: 249.99 },
        blizzard_buster: { name: "Blizzard Buster", price: 299.99 },
        arctic_shield: { name: "Arctic Shield", price: 329.99 },
    }[selectedPlan] || { name: "Invalid Plan", price: 0 };

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

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (planDetails.name === "Invalid Plan") {
            alert("Please select a valid subscription plan.");
            return;
        }

        const token = localStorage.getItem("authToken");

        const subscriptionData = {
            planName: planDetails.name, // Plan name from normalized data
            cardNumber: paymentDetails.cardNumber,
            expiryDate: paymentDetails.expiryDate,
            cvv: paymentDetails.cvv,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/subscriptions/subscribe",
                subscriptionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                alert(`Subscribed to ${planDetails.name} successfully!`);
                navigate("/main"); // Redirect on success
            } else {
                alert("Subscription failed. Please try again.");
            }
        } catch (error) {
            console.error("Error subscribing:", error.response?.data || error.message);
            alert(error.response?.data?.error || "An error occurred during subscription.");
        }
    };

    return (
        <div className="subscription-page">
            <div className="background-overlay">
                <div className="subscription-container">
                    {/* Subscription Details Section */}
                    <div className="subscription-details">
                        <h2>Subscription Details</h2>
                        <div className="subscription-info">
                            <p><strong>Plan:</strong> {planDetails.name}</p>
                            <p><strong>Price:</strong> ${planDetails.price.toFixed(2)}</p>
                        </div>
                        <div className="total-amount">
                            <p>Total Amount:</p>
                            <h1>${planDetails.price.toFixed(2)}</h1>
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

import React from 'react';
import '../styles/Payment.css';


function Payment() {
    return (
        <div className="payment-container">
            <h2>Make a Payment</h2>
            <form className="payment-form">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" required />

                <label htmlFor="expiry">Expiry Date</label>
                <input type="month" id="expiry" name="expiry" required />

                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" required />

                <button type="submit">Pay Now</button>
            </form>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Payment;

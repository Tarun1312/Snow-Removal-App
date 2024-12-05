import React, { useState } from "react";
import "../styles/Booking.css";



function Booking() {
    const [formData, setFormData] = useState({
        serviceType: "",
        areaSize: "",
        additionalNotes: "",
        appointmentDate: "",
        comments: "",
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Reset error message

        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to book an appointment.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Corrected template literal
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setBookingSuccess(true);
                setSubmittedData(data.booking); // Display booking details
                setFormData({
                    serviceType: "",
                    areaSize: "",
                    additionalNotes: "",
                    appointmentDate: "",
                    comments: "",
                });
            } else {
                setErrorMessage(data.error || "Failed to create booking.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error.message);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    // Close popup and reset state
    const closePopup = () => {
        setBookingSuccess(false);
        setSubmittedData(null);
    };

    return (
        <div className="booking-page">
            <h1>Book Your Snow Removal Appointment</h1>
            <div className="booking-container">
                {/* Form Section */}
                <div className="form-section">
                    <form onSubmit={handleSubmit}>
                        {/* Service Details */}
                        <div className="form-group">
                            <h2>Service Details</h2>
                            <div className="form-row">
                                <select
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Service Type</option>
                                    <option value="Residential">Residential Snow Removal</option>
                                    <option value="Commercial">Commercial Snow Removal</option>
                                </select>
                                <select
                                    name="areaSize"
                                    value={formData.areaSize}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Area Size</option>
                                    <option value="<500">Less than 500 sq ft</option>
                                    <option value="500-1000">500 - 1000 sq ft</option>
                                    <option value=">1000">More than 1000 sq ft</option>
                                </select>
                            </div>
                            <textarea
                                name="additionalNotes"
                                placeholder="Additional Notes (Optional)"
                                value={formData.additionalNotes}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        {/* Appointment Details */}
                        <div className="form-group">
                            <h2>Appointment Details</h2>
                            <div className="form-row">
                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <textarea
                                name="comments"
                                placeholder="Comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn-submit">Submit</button>
                    </form>
                </div>

                {/* Contact Information Section */}
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>
                        <strong>Phone:</strong> 855-355-0022 <br />
                        <strong>Address:</strong> 506 Main St. N, Red Deer, Alberta, T4N 6K1 <br />
                        <strong>Business Hours:</strong> <br />
                        Monday - Friday: 9:00 AM - 7:00 PM <br />
                        Saturday: 9:00 AM - 5:00 PM <br />
                        Sunday: Closed
                    </p>
                    <button className="btn-directions">Get Directions</button>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
            )}

            {/* Popup for Booking Confirmation */}
            {bookingSuccess && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="checkmark">&#10004;</div>
                        <h3>Booking Confirmed</h3>
                        <p><strong>Service Type:</strong> {submittedData?.serviceType}</p>
                        <p><strong>Area Size:</strong> {submittedData?.areaSize}</p>
                        <p><strong>Appointment Date:</strong> {new Date(submittedData?.appointmentDate).toDateString()}</p>
                        <p><strong>Comments:</strong> {submittedData?.comments || "N/A"}</p>
                        <button onClick={closePopup} className="btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            )}
           
        </div>
    );
}

export default Booking;

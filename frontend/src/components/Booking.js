import React from "react";
import "../styles/Booking.css";

function Booking() {
    return (
        <div className="booking-page">
            <h1>Book Your Snow Removal Appointment</h1>
            <div className="booking-container">
                {/* Form Section */}
                <div className="form-section">
                    {/* Personal Information */}
                    <div className="form-group">
    <h2>Service Details</h2>
    <div className="form-row">
        <select required>
            <option value="">Select Service Type</option>
            <option value="residential">Residential Snow Removal</option>
            <option value="commercial">Commercial Snow Removal</option>
        </select>
        <select required>
            <option value="">Select Area Size</option>
            <option value="<500">Less than 500 sq ft</option>
            <option value="500-1000">500 - 1000 sq ft</option>
            <option value=">1000">More than 1000 sq ft</option>
        </select>
    </div>
    <textarea placeholder="Additional Notes (Optional)"></textarea>
</div>


                    {/* Service Details */}
                    <div className="form-group">
                        <h2>Service Details</h2>
                        <div className="form-row">
                            <select required>
                                <option value="">Select Service Type</option>
                                <option value="residential">Residential Snow Removal</option>
                                <option value="commercial">Commercial Snow Removal</option>
                            </select>
                            <select required>
                                <option value="">Select Area Size</option>
                                <option value="<500">Less than 500 sq ft</option>
                                <option value="500-1000">500 - 1000 sq ft</option>
                                <option value=">1000">More than 1000 sq ft</option>
                            </select>
                        </div>
                        <textarea placeholder="Additional Notes (Optional)"></textarea>
                    </div>

                    {/* Appointment Details */}
                    <div className="form-group">
                        <h2>Appointment Details</h2>
                        <div className="form-row">
                            <input type="date" required />
                        </div>
                        <textarea placeholder="Comments"></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-submit">Submit</button>
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
        </div>
    );
}

export default Booking;

import React, { useState } from 'react';

const BookingPage = () => { // Ensure the name is consistent
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    date: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your appointment is booked for ${formData.date}. Thank you for visiting!`);
  };

  return (
    <div className="booking-page">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Personal Information</h2>

        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name (required)"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name (required)"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email (required)"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone (required)"
            required
          />
        </div>

        <h2>Car Details</h2>
        <div className="form-group">
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="Make"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
          />
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
          />
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            placeholder="VIN"
          />
        </div>

        <h2>Appointment Information</h2>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Comments"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="booking-contact-info">
        <h3>Contact Information</h3>
        <p>Phone: 855-3X5-50X3</p>
        <p>Address: 506 Main St. N, Reddeer, Alberta L6V 1P9</p>
        <p>Business Hours:</p>
        <p>Monday - Friday: 9:00AM - 7:00PM</p>
        <p>Saturday: 9:00AM - 5:00PM</p>
        <p>Sunday: Closed</p>
        <img
          src="https://plus.unsplash.com/premium_photo-1682089468743-5a31e96f8dd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Car Consultation"
          className="contact-image"
        />
      </div>
    </div>
  );
};

export default BookingPage; // Correctly export as BookingPage

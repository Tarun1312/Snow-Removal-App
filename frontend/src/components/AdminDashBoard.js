import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsResponse = await axios.get("http://localhost:5000/api/admin/bookings", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const subscriptionsResponse = await axios.get("http://localhost:5000/api/admin/subscriptions", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(bookingsResponse.data);
                setSubscriptions(subscriptionsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error.message);
            }
        };

        fetchData();
    }, [token]);

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(bookings.filter((booking) => booking._id !== id));
            alert("Booking deleted successfully!");
        } catch (error) {
            console.error("Error deleting booking:", error.message);
        }
    };

    const handleCancelSubscription = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/subscriptions/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
            alert("Subscription canceled successfully!");
        } catch (error) {
            console.error("Error canceling subscription:", error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            {/* Bookings Section */}
            <section className="admin-section">
                <h2>Bookings</h2>
                {bookings.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Service</th>
                                <th>Appointment Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.userId?.name || "Unknown"}</td>
                                    <td>{booking.serviceType}</td>
                                    <td>{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteBooking(booking._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No bookings available</p>
                )}
            </section>

            {/* Subscriptions Section */}
            <section className="admin-section">
                <h2>Subscriptions</h2>
                {subscriptions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Plan</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((subscription) => (
                                <tr key={subscription._id}>
                                    <td>{subscription.userId?.name || "Unknown"}</td>
                                    <td>{subscription.planName}</td>
                                    <td>${subscription.price.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn-cancel"
                                            onClick={() => handleCancelSubscription(subscription._id)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No subscriptions available</p>
                )}
            </section>
        </div>
    );
}

export default AdminDashboard;

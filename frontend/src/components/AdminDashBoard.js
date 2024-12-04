import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [plans, setPlans] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const usersResponse = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const bookingsResponse = await axios.get("http://localhost:5000/api/admin/bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const plansResponse = await axios.get("http://localhost:5000/api/admin/plans", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(usersResponse.data);
            setBookings(bookingsResponse.data);
            setPlans(plansResponse.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Booking deleted successfully!");
            fetchAdminData(); // Refresh data
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleUpdatePlan = async (id, updatedPlan) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/plans/${id}`, updatedPlan, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Plan updated successfully!");
            fetchAdminData(); // Refresh data
        } catch (error) {
            console.error("Error updating plan:", error);
        }
    };

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setShowPopup(true);
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
            </header>

            <section className="admin-section">
                <h2>Users</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="admin-section">
                <h2>Bookings</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Service Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.userName}</td>
                                <td>{booking.serviceType}</td>
                                <td>{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn-view"
                                        onClick={() => handleViewBooking(booking)}
                                    >
                                        View
                                    </button>
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
            </section>

            <section className="admin-section">
                <h2>Subscription Plans</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan) => (
                            <tr key={plan._id}>
                                <td>{plan.name}</td>
                                <td>${plan.price}</td>
                                <td>{plan.details}</td>
                                <td>
                                    <button
                                        className="btn-update"
                                        onClick={() =>
                                            handleUpdatePlan(plan._id, {
                                                name: plan.name,
                                                price: plan.price + 10,
                                                details: plan.details,
                                            })
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {showPopup && selectedBooking && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Booking Details</h3>
                        <p><strong>Service Type:</strong> {selectedBooking.serviceType}</p>
                        <p><strong>Date:</strong> {new Date(selectedBooking.appointmentDate).toLocaleDateString()}</p>
                        <p><strong>Comments:</strong> {selectedBooking.comments}</p>
                        <button className="btn-close" onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Users ka data backend se lane ke liye function
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/user/getall");
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Users load karne mein dikkat aayi!");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div className="text-center mt-20 text-white">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-emerald-500">Admin Control Panel</h1>
                        <p className="text-gray-400">Manage your users and their performance</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
                        <span className="text-gray-400">Total Users: </span>
                        <span className="text-emerald-500 font-bold">{users.length}</span>
                    </div>
                </header>

                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Current Score</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{user.name || "N/A"}</td>
                                    <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-emerald-400 font-mono font-bold">
                                        {user.score || 0} {/* Score field database ke according check karein */}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-xs bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded transition-all">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
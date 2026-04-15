"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 1. Security Check: Sirf Admin hi is page ko dekh sake
    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || role !== 'admin') {
            toast.error("Unauthorised access!");
            router.push('/login');
        } else {
            fetchUsers();
        }
    }, []);

    // 2. Fetch Users Function
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

    // 3. Delete User Function
    const deleteUser = async (id) => {
        if (window.confirm("Are you sure? Is user ko delete kar diya jayega.")) {
            try {
                await axios.delete(`http://localhost:5000/user/delete/${id}`);
                toast.success("User removed successfully");
                // List ko refresh karna bina page reload kiye
                setUsers(users.filter(user => user._id !== id));
            } catch (error) {
                toast.error("Delete karne mein error aaya!");
            }
        }
    };

    // 4. Logout Function
    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
        toast.success("Logged out");
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-emerald-500 font-mono">
            FETCHING_DATA...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-emerald-500 tracking-tight">Admin Control Panel</h1>
                        <p className="text-gray-400 text-sm">Monitor user performance & system activity</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl shadow-lg">
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Total Users</span>
                            <p className="text-emerald-500 text-xl font-bold">{users.length}</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Users Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-800/50 text-gray-400 uppercase text-[10px] tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">XP / Score</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-emerald-500/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-200">{user.name || "Anonymous"}</span>
                                                <span className="text-xs text-gray-500">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                <span className="text-emerald-400 font-mono font-bold">{user.score || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => deleteUser(user._id)}
                                                className="opacity-0 group-hover:opacity-100 text-xs bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-md transition-all duration-300"
                                            >
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
        </div>
    );
};

export default AdminDashboard;
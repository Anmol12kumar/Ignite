"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar/page";

const CommunityWall = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const wallRef = useRef(null);

    // Fetch messages on component mount and set up auto-refresh
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("http://localhost:5000/communitywall");
                if (!res.ok) throw new Error("Failed to fetch messages");
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            } finally {
                setLoading(false);
            }
        };
        
        // Fetch immediately on mount
        fetchMessages();
        
        // Set up auto-refresh every 5 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);
        
        // Cleanup: clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        
        try {
            const res = await fetch("http://localhost:5000/communitywall/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    author_name: authorName || "Anonymous",
                    content: newMessage,
                    userId: null,
                })
            });
            
            if (!res.ok) throw new Error("Failed to send message");
            const savedMessage = await res.json();
            setMessages([savedMessage, ...messages]);
            setNewMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
            alert("Failed to send message. Please try again.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleLike = async (msg) => {
        try {
            const res = await fetch(`http://localhost:5000/communitywall/like/${msg._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) throw new Error("Failed to like");
            const updated = await res.json();
            setMessages(messages.map(m => m._id === msg._id ? updated : m));
        } catch (err) {
            console.error("Error liking message:", err);
        }
    };

    const handleDislike = async (msg) => {
        try {
            const res = await fetch(`http://localhost:5000/communitywall/dislike/${msg._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) throw new Error("Failed to dislike");
            const updated = await res.json();
            setMessages(messages.map(m => m._id === msg._id ? updated : m));
        } catch (err) {
            console.error("Error disliking message:", err);
        }
    };

    const handleCopy = (content, id) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return "just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    const getAvatarColor = (name) => {
        const colors = [
            "from-emerald-500 to-teal-600",
            "from-violet-500 to-purple-600",
            "from-amber-500 to-orange-600",
            "from-rose-500 to-pink-600",
            "from-cyan-500 to-blue-600",
            "from-lime-500 to-green-600",
            "from-fuchsia-500 to-pink-600",
            "from-sky-500 to-indigo-600",
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || "from-gray-700 to-gray-900";
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />

            {/* Background pattern */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/2 rounded-full blur-3xl" />
            </div>

            <div className="relative flex-1 container pt-20 pb-36 flex flex-col max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-500/2 text-emerald-400 text-xs font-medium mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        Live Community Wall
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">
                        Community <span className="text-emerald-400">Wall</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto">
                        Share prompts, ideas, or anything that inspires you. Like what you love, copy what you need.
                    </p>
                </div>

                {/* Stats bar */}
                <div className="flex items-center justify-center gap-6 mb-6 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-semibold text-sm">{messages.length}</span> posts
                    </div>
                    <div className="w-px h-3 bg-gray-700" />
                    <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-semibold text-sm">{messages.reduce((a, m) => a + m.likes, 0)}</span> likes
                    </div>
                </div>

                {/* Messages Wall - Masonry-like grid */}
                <div ref={wallRef} className="flex-1 overflow-y-auto px-2">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                <span className="text-gray-400 text-sm">Loading the wall...</span>
                            </div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="text-5xl">🧱</div>
                            <p className="text-gray-400 text-sm">The wall is empty. Be the first to leave your mark!</p>
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className="break-inside-avoid group relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-xl p-4 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]"
                                >
                                    {/* Author row */}
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${getAvatarColor(msg.author_name)} flex items-center justify-center text-xs font-bold text-white shadow-lg`}>
                                            {msg.author_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm font-semibold block truncate">{msg.author_name}</span>
                                            <span className="text-[10px] text-gray-400">{timeAgo(msg.created_at)}</span>
                                        </div>
                                        {/* Copy button */}
                                        <button
                                            onClick={() => handleCopy(msg.content, msg._id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md text-[10px] font-medium bg-secondary text-gray-400 hover:bg-gray-800 hover:bg-emerald-500 hover:text-white"
                                        >
                                            {copiedId === msg._id ? "✓ Copied" : "Copy"}
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <p className="text-sm text-white/90 whitespace-pre-wrap break-words leading-relaxed">
                                        {msg.content}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 mt-3 pt-2 border-t border-gray-700/30">
                                        <button
                                            onClick={() => handleLike(msg)}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20 transition-all"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                            <span className="font-medium">{msg.likes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleDislike(msg)}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-gray-400 hover:text-red-500 hover:bg-red-900/20 transition-all"
                                        >
                                            <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                            <span className="font-medium">{msg.dislikes}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Compose Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-xl border-t border-gray-700/60">
                <div className="max-w-4xl mx-auto py-3 px-4">
                    <div className="flex items-end gap-3 bg-gray-900/80 border border-gray-700/60 rounded-2xl p-2.5 shadow-[0_-4px_30px_-10px_rgba(0,0,0,0.5)]">
                        {/* Avatar */}
                        <div className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${getAvatarColor(authorName || "Anonymous")} flex items-center justify-center text-xs font-bold text-white`}>
                            {(authorName || "A").charAt(0).toUpperCase()}
                        </div>

                        {/* Name input */}
                        <input
                            type="text"
                            placeholder="Name"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-20 shrink-0 bg-transparent border-none text-xs text-white placeholder:text-gray-400 focus:outline-none"
                        />

                        <div className="w-px h-6 bg-gray-700/40 shrink-0" />

                        {/* Message input */}
                        <textarea
                            placeholder="Write on the wall..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-gray-400 resize-none focus:outline-none min-h-[36px] max-h-[120px] py-2"
                        />

                        {/* Send button */}
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className="shrink-0 h-9 w-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityWall;
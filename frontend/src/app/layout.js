import "../pages/globals.css";

export const metadata = {
    title: "Ignite - Learn Prompt Engineering",
    description: "Master the art of talking to AI",
};

export default function RootLayout({ children }) {
    return (
    <html lang="en">
        <body>{children}</body>
    </html>
    );
}
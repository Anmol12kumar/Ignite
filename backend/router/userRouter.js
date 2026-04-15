const nodemailer = require("nodemailer");

// Email bhejne ke liye transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Aapka gmail
        pass: process.env.EMAIL_PASS, // Aapka App Password
    },
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User nahi mila!" });
        }

        // Yahan hum ek simple message bhej rahe hain
        // Real project mein yahan ek unique link bheja jata hai
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request - Ignite",
            text: `Aapka password reset request receive hua hai. Filhal aapka password ye hai: ${user.password} \n\nKripya ise login ke baad badal lein.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email bhej diya gaya hai!" });
    } catch (error) {
        res.status(500).json({ message: "Email bhejne mein error!" });
    }
});
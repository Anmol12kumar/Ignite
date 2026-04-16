const nodemailer = require("nodemailer");

<<<<<<< HEAD
router.post("/add", (req, res) => {
    new User(req.body)
    .save()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email, password })
    .then(async (result) => {
        if (result) {
        const { _id, email, lastActiveDate } = result;

        const now = new Date();
        const last = new Date(lastActiveDate || 0);
        // --- STREAK LOGIC ---
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
        
        const diffDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Logged in the very next day
            result.streak += 1;
        } else if (diffDays > 1) {
            // Missed a day (or more)
            result.streak = 1;
        } else if (diffDays === 0 && result.streak === 0) {
            // First time ever or after a long break where it was 0
            result.streak = 1;
=======
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
>>>>>>> 518c759e846f26df1394ade5989bc0ac2eda40fb
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
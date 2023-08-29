const User = require("../models/user.model");

const requireAuthStudent = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let dbUser = await User.findOne({ token: token });
        if (!dbUser) {
            // console.log("not student");
            return res.status(401).json({ error: 'Unauthorized - token error' });
        }

        if (dbUser.role !== "student") {
            return res.status(401).json({ error: 'Unauthorized - user is not a student' });
        }
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ error: 'some error occurred . Try Again' });
    }
}

module.exports = requireAuthStudent;
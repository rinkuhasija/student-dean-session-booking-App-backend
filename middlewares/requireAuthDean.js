const User = require("../models/user.model");

const requireAuthDean = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let dbUser = await User.findOne({ token: token });

        if (!dbUser) {
            return res.status(401).json({ error: 'Unauthorized - token error' });
        }

        if (dbUser.role !== "dean") {
            return res.status(401).json({ error: 'Unauthorized - user is not a dean' });
        }

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ error: 'some error occurred . Try Again' });
    }
};

module.exports = requireAuthDean;
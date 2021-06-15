const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const UsersDb = require('../models/users');
const authController = {
    //POST :api/auth/login
    authLogin: async (req, res) => {
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "username is obligatory",
            })
        };
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "password is obligatory",
            })
        }
        try {
            const user = await UsersDb.findOne({ username });

            if (user) {
                //hash password
                const checkPassword = await argon2.verify(user.password, password);
                if (!checkPassword) {
                    return res.status(401).json({
                        success: false,
                        message: "username or password is incorrect"
                    })
                }

                // create token
                const userId = user.id;
                const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_MYSECRET);
                res.json({
                    success: true,
                    accessToken: token,
                    user: user
                });
                
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "username or password is incorrect"
                })
            }
            
        } catch (error) {
            console.log(error.message);
        }

    },

    //POST: /api/auth/register
    authRegister: async (req, res) => {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "username is obligatory",
            })
        };
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "password is obligatory",
            })
        }
        try {
            // check user
            const userCheck = await UsersDb.findOne({ username });
            if (userCheck) {
                return res.status(400).json({
                    success: false,
                    message: "username existed",
                })
            }
            //hash password
            const hashPassword = await argon2.hash(password);
            //save in db
            const user = new UsersDb({ username, password: hashPassword });
            user.save();
            const userId = user._id;

            // create token
            const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_MYSECRET);
            res.json({
                success: true,
                accessToken: token,
                user: user
            });

        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = authController;
//NOTE
/* Khi sử dựng models.find trong mongooes nếu ko có dữ liệu sẽ trả về
mảng chống, trong khi đó models.findOne sẽ trả về null
??? loai hoay hẳn hơn 30p mới vc
*/
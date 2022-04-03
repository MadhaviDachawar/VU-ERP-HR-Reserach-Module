import User from "./user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { transporter } from '../nodemailer/nodemailerConfig.js'

const ONE_HOUR = 60 * 60
const JWT_SECRECT = "JGUFsp3y9uNDAEFXvIwgaXLM4qaausY6"

export const addUser = async(user) => {
    try {
        var user = new User(user)
        console.log(user)
        user.save()

    } catch (error) {
        return res.status(401).json({
            title: "An error occurred",
            error: err,
        })
    }
}

export const login = async(req, res) => {
    await User.findOne({
        userName: req.body.userName,
    }).populate("Faculty").exec(
        function(err, user) {
            if (err) {
                return res.status(401).json({
                    title: "An error occurred",
                    error: err,
                })
            }
            if (!user) {
                return res.status(401).json({
                    title: "Login failed",
                    message: "No Such User Found",
                })
            }

            // if (!bcrypt.compareSync(req.body.password, user.password)) {
            //     return res.status(401).json({
            //         title: "Login failed",
            //         message: "Invalid login credentials",
            //     })
            // }

            var token = jwt.sign({
                    user: user,
                },
                JWT_SECRECT, { expiresIn: ONE_HOUR }
            )
            res.cookie("token", token)

            // console.log(user)

            return res.status(200).json({
                message: "Successfully Logged In",
                user: user,
            })
        }
    )
}

export const loggedInUser = async(req, res, next) => {

    switch (req.query.loginAction) {
        case "loggedInUser":
            try {
                const token = req.headers['set-cookie'][0].split("token=")[1]
                const name = req.query.name
                const userType = parseInt(req.query.userType)
                let decoded = jwt.verify(token, JWT_SECRECT)

                const decodedName = decoded.user.name[decoded.user.name.length - 1].firstName + ' ' + decoded.user.name[0].lastName

                if (name != decodedName || userType != decoded.user.userType) {
                    throw "Corrupted"
                }

                next()
            } catch (error) {
                console.log(error.message)

                if (error == "Corrupted")
                    return res.status(405).json({
                        title: "Session Data Corrupted",
                        message: "Session Corrupted Please Login Again",
                    })
                else
                    return res.status(405).json({
                        title: "Session Expired",
                        message: "Session Expired Please Login Again",
                    })
            }
            break
        case "skip":
            next()
            break
        default:
            next()
            break
    }
}

export const generateOTP = async(req, res) => {
    try {
        let user = await User.findOne({
            userName: req.body.userName
        })

        if (!user) {
            return res.status(500).json({
                message: 'User does not exist. Please enter correct username!'
            });
        }

        var otp = Math.floor(100000 + Math.random() * 900000)

        var otpToken = jwt.sign({
            userName: user.userName,
            otp: otp
        }, JWT_SECRECT, { expiresIn: ONE_HOUR * 0.05 });

        transporter.sendMail({
            from: '"VU-ERP" <noreply.vupune@gmail.com>', // sender address
            to: user.emails[0], // list of receivers
            subject: "VU-ERP Password Reset OTP", // Subject line
            html: `
               <p><b>OTP to reset your password is: </b>` + otp + `</p>
                    <p><i>Expires in 2 mins</i></p> `,
            text: "", // plain text body
        });

        return res.status(200).json({
            message: 'OTP sent succesfully to registered email!',
            token: otpToken
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error occured while sending OTP!',
            token: otpToken
        });
    }
}

export const resetPassword = async(req, res) => {

    let decoded = jwt.verify(req.body.otpToken, JWT_SECRECT)
        // console.log(decoded)
    if (!decoded) {
        console.log("jwt error")
        return res.status(500).json({
            message: 'OTP Expired'
        });
    }
    // console.log(req.body)

    if (!(decoded.otp == parseInt(req.body.otp))) {
        return res.status(500).json({
            message: 'Wrong OTP Entered! Please try again'
        });
    }
    User.findOne({
        userName: decoded.userName
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }

        var newvalue = {
            $set: {
                password: bcrypt.hashSync(req.body.password, 5),
            }
        };
        User.findByIdAndUpdate(user._id, newvalue, function() {
            if (err) {
                logger.error(err.stack);
                res.status(500).json({
                    status: 500,
                    error: err
                });
            } else {
                res.json({
                    status: 200,
                    msg: 'Password has been reset'
                })
            }
        });
    })
}
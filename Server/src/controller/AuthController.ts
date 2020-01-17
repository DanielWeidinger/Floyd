import { Request , Response , Router } from 'express';
import IControllable from './IControllable';
import { sign } from 'jsonwebtoken';
import { Mongoose } from 'mongoose';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export class AuthController implements IControllable {
    public router: Router = Router();
    private path: string;
    private mongoose: Mongoose;

    constructor(path: string, mongoose: Mongoose) {
        this.path = path;        
        this.mongoose = mongoose;

        this.initRoutes()
    }

    initRoutes(): void {

        this.router.post(this.path + '/register',
            check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
            check("password", "Please enter a valid password").isLength({
                min: 6
            }), this.handleSignUp);
        
        this.router.post(this.path + '/login', (req: Request, res: Response) => {
            res.send("Login route. Jo lol")
        });

        this.router.get(this.path + '/secret-route', (req: Request, res: Response) => {
            res.send('This is the secret content. Only logged in users can see that!');
        });
    }

    private async handleSignUp(req: Request, res: Response) {
        const errors = validationResult(req);

        console.log(req.body)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { username,password } = req.body;

        try {
                this.mongoose.Model.
            let user = await User.findOne({
                username
            });

            console.log(user)

            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            const passwordSalt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, passwordSalt);

            user = new User({
                username,
                passwordHash,
                passwordSalt
            });

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
}
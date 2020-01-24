import { Request , Response , Router } from 'express';
import IControllable from '../contracts/IControllable';
import { sign } from 'jsonwebtoken';
import { Mongoose } from 'mongoose';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { Config } from '../config/Config';

export class AuthController implements IControllable {
    public router: Router = Router();
    private path: string;

    constructor(path: string) {
        this.path = path;

        this.initRoutes()
    }

    initRoutes(): void {

        this.router.post(this.path + '/register',
            [
                check("username", "Please Enter a Valid Username")
                .not()
                .isEmpty(),
                check("password", "Please enter a valid password").isLength({
                    min: 6
                })
            ], 
            this.handleSignUp);
        
        this.router.post(this.path + '/login',
            [
                check("username", "Please Enter a Valid Username")
                .not()
                .isEmpty(),
                check("password", "Please enter a valid password").isLength({
                min: 6
                })
            ],
            this.handleLogin);

        this.router.get(this.path + '/secret-route', (req: Request, res: Response) => {
            res.send('This is the secret content. Only logged in users can see that!');
        });
    }

    private async handleSignUp(req: Request, res: Response) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({
              errors: errors.array()
          });
      }
      const { username, password } = req.body;

      try {
          let user = await User.findOne({
              username
          });
          if (user) {
              return res.status(400).json({
                  msg: "User Already Exists"
              });
          }

          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(password, salt);
          user = new User({
              username,
              passwordHash,
              salt
          });
          await user.save();

          const payload = {
              user: {
                  id: user.id
              }
          };

          sign(
              payload,
              Config.secret, {
                  expiresIn: Config.tokenExpiration
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

    private async handleLogin(req: Request, res: Response) {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        sign(
          payload,
          Config.secret,
          {
            expiresIn: Config.tokenExpiration
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }

}
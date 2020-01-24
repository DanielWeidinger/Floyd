import { Request, Response, Router } from 'express'
import IControllable from '../contracts/IControllable'
import User from '../models/User';

export class FloydController implements IControllable{
    public router: Router = Router();
    private path: string;

    constructor(path: string){
        this.path = path

        this.initRoutes()
    }

    initRoutes(): void {

        this.router.get(this.path, (req, res) => {
            res.send("Running")
        })

        this.router.get(this.path + "/contacts", (req: any, res) => {
            User.findById(req.user.id).exec((err, dbUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error('REST: User not found');
                }
                
                User.find({'_id': {
                    $in: dbUser.contacts
                }}).exec((err, dbContracts) => {
                    if(err){
                        throw err;
                    }

                    res.send({contracts: dbContracts.map(contact => contact.username)});
                });
            });
        });

        this.router.post(this.path + "/contact", (req: any, res) => {
            User.findById(req.user.id).exec((err, dbUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error('REST: User not found');
                }

                const newContact = req.body.contactUsername;

                User.findOne({'username': newContact}, (err, dbContact) => {
                    if(err){
                        throw err;
                    }
                    if(!dbContact){
                        throw new Error("REST: Contact not found!");
                    }
                    
                    dbUser.contacts.push(dbContact._id);
                    dbUser.save((err) => {
                        if(err){
                            throw err;
                        }

                        res.send({contacts: dbUser.contacts.map(contact => contact.username)});
                    });
                });
            });
        })

        this.router.post
    }
}

import { Request, Response, Router } from 'express'
import IControllable from '../contracts/IControllable'
import User from '../models/User';
import { UserDto } from '../models/User';
import Message, { MessageDto } from '../models/Message';
import Group, { GroupDto, IGroup } from '../models/Group';

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
        });

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
                }}).exec((err, dbContacts) => {
                    if(err){
                        throw err;
                    }

                    const payload: UserDto[] = dbContacts.map(contact => {
                        return {username: contact.username}
                    }); 

                    res.send(payload);
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
                        return res.status(400).json({message: "user not found"});
                    }
                    
                    User.exists({"_id": dbUser._id, "contacts": {$in: [dbContact._id]}}, (err, exists) => {
                        if(err){
                            throw err;
                        }


                        if(exists){
                            return res.status(400).json({message: "already added to contacts!"});
                        }

                        dbUser.contacts.push(dbContact._id);
                        dbUser.save((err) => {
                        if(err){
                            throw err;
                        }
    
                        return res.send({username: newContact});
                    });
                    })
                });
            });
        });

        this.router.get(this.path + "/messages", (req: any, res) => {
            User.findById(req.user.id).exec((err, dbUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error('REST: User not found');
                }

                Message.find({"$and": [{"$or": [{recipient: dbUser.username}, { username: dbUser.username}] },
                                                {read: true}]}, (err, dbMessages) => {
                    if(err){
                        throw err;
                    }

                    const messages: MessageDto[] = dbMessages.map(message => {
                        return {
                            username: message.username,
                            recipient: message.recipient,
                            text: message.text,
                            timestamp: message.timestamp,
                            read: message.read,
                            multipleRecipients: message.multipleRecipients
                        };
                    });
                    return res.send(messages);
                });
            });
        });
<<<<<<< HEAD
=======

        this.router.get(this.path + "/groups", (req: any, res) => {
            User.findById(req.user.id).exec((err, dbUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error('REST: User not found');
                }
                
                Group.find({'_id': {
                    $in: dbUser.groups
                }}).exec((err, dbGroups) => {
                    if(err){
                        throw err;
                    }

                    const payload: GroupDto[] = dbGroups.map(group => {
                        return {id: group.id,
                                name: group.name,
                                users: group.users}
                    }); 

                    res.send(payload);
                });
            });
        });

        this.router.post(this.path + "/group", (req: any, res) => {
            User.findById(req.user.id).exec((err, dbUser) => {
                if(err){
                    throw err;
                }

                if(!dbUser){
                    throw new Error('REST: User not found');
                }

                const groupName: string = req.body.name;
                const groupMembers: string[] = req.body.groupMembers;

                if (!groupName || !groupMembers || groupMembers.length < 1) {
                    return res.status(400).json({message: "bad group config"});
                }

                User.find({"username": {$in: groupName}}, (err, dbMembers) => {
                    if(err) {
                        throw err;
                    }

                    if(!dbMembers){
                        return res.status(400).json({message: "no group member was found!"});
                    }


                    const newGroup: IGroup = new Group({
                        name: groupName,
                        users: dbMembers.map(member => member.username)
                    });

                    newGroup.save((err, dbNewGroup) => {
                        if(err) {
                            throw err;
                        }

                        const payload: GroupDto = {
                            id: dbNewGroup._id,
                            name: dbNewGroup.name,
                            users: dbNewGroup.users
                        }

                        return res.send(payload)
                    })
                });
            });
        });
>>>>>>> ada4a113bea8de4b1ad43160921ed8725048c385
    }
}

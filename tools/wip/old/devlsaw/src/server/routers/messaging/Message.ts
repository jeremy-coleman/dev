import {BaseRoute} from '../BaseRoute';
import {Request, Response, Router} from 'express';
import {Conversation as ConversationModel} from '../../models/conversation';
import {Messages as MessagesModel} from '../../models/messages';
import {Group as GroupModel} from '../../models/group';

export class Message extends BaseRoute {


    public newDirectConversationAction(router: Router): void {
        router.post('/new-direct-conversation', (req: Request, res: Response) => {
            if (true) { //@TODO
                const newConversation = {
                    type: 'direct',
                    fromUserId: req.body.user._id,
                    recipient: '5937e04e19d6c078c368f0fa'//req.body.interlocutorId,
                };
                ConversationModel.findOneOrCreate(newConversation, (err, conversation) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                        res.json({success: false, message: 'unable to create new conversation'});
                    } else {
                        res.json({success: true, conversation: conversation});
                    }
                });
            }
        });
    }

    public getRecentInterlocutorsAction(router: Router): void {
        router.get('/get-interlocutors', (req: Request, res: Response) => {
            const limit = 15;
            const offset = parseInt(req.params.offset);
            ConversationModel.getConversations(req.body.user._id, offset, limit).subscribe(
                interlocutorUsers => {
                    res.json({success: true, conversationList: interlocutorUsers});
                },
                error => {
                    res.status(400);
                    res.json({success: false, message: 'Something went wrong'});

                })
        });
    }

    public getGroupConversationsAction(router: Router): void {
        router.get('/get-group-conversations', (req: Request, res: Response) => {
            GroupModel.find({members: {$elemMatch: {$eq: req.body.user._id} } }, {sort: {name: 1}}, (err: Error, groups: any) => {
                if (err) {
                    res.status(400);
                    res.json({success: false, message: 'something went wrong'});
                } else {
                    res.json({success: true, groups: groups});
                }
            });
        });
    }


    public getConversationMessagesAction(router: Router): void {
        router.get('/get-messages',(req: Request, res: Response) => {
            const limit = 30;
            MessagesModel.find({conversationId: req.query.id},
                '_id senderId conversationId messageBody updatedAt'
            )
            .sort({updatedAt: -1})
            .skip(parseInt(req.query.offset))
            .limit(limit)
            .populate('senderId','_id photoURL displayName')
            .exec((err: Error, messages: any) => {
                if (err) {
                    res.status(400);
                    res.json({success: false, message: 'something went wrong'});
                } else {
                    let messagesResponse: Array<{_id: string; senderId: string; conversationId: string;
                                                message: string;  updatedAt: Date; displayName: string,
                                                photoURL: string}> = [];
                    messages.map((message)=>{
                        messagesResponse.push({
                            _id: message._id.toString(),
                            senderId: message.senderId._id.toString(),
                            conversationId: message.conversationId.toString(),
                            message: message.messageBody,
                            updatedAt: message.updatedAt,
                            displayName: message.senderId.displayName,
                            photoURL: message.senderId.photoURL
                        });
                    });
                    res.json({success: true, message: messagesResponse});
                }
            });
        });
    }

}


import {User} from '../../models/user';
import {ISeeder} from './ISeeder';
import {GoogleService} from '../../services/google.service';
import * as readline from 'readline';

export class UserSeeder implements ISeeder {

    seed(): Promise<any> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('Enter the auth code here: ', (auth_code) => {
                rl.close();
                auth_code = auth_code.toString().trim();
                const googleService = new GoogleService();
                googleService.getToken(auth_code, (err, tokens) => {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    }

                    googleService.authorize(tokens.access_token, tokens.refresh_token);

                    googleService.getGUser((err, gUser)=>{
                        if (err) {
                            console.log(err);
                            process.exit(1);
                        }
                        const users = [];
                        for(let i=0; i<10; i++) {
                            users.push(
                            {
                                accessToken: tokens.access_token,
                                refreshToken: tokens.refresh_token,
                                displayName: gUser.name.concat('_').concat(i.toString()),
                                email: 'email_'.concat(i.toString()).concat(gUser.email),
                                photoURL: gUser.photoURL,
                                uid: gUser.id.concat(i.toString())
                            });
                        }
                        User.create(users, (err, success) => {
                            if (err) throw err;
                            console.info(`\x1b[32m`, 'UserSeeder seeded.');
                            resolve(success);
                        });
                    });
                });
            });
        });

    }

}
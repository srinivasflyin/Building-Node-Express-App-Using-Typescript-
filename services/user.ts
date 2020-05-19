import { User } from '../utilities/classesAndInterfaces'
//const users: [User]= [{ id: 1, firstname: 'john',lastname: 'steve', gender: 'male', email: 'john@gmail.com' }, { id: 2, firstname: 'fell',lastname: 'jacob', gender: 'male', email: 'fell@gmail.com' }]
//const userData = () => users;

export class UserService {
    public users: Array<User> = [];
    constructor () {
        this.users = [{ id: 1, firstname: 'john',lastname: 'steve', gender: 'male', email: 'john@gmail.com' }, { id: 2, firstname: 'fell',lastname: 'jacob', gender: 'male', email: 'fell@gmail.com' }];
    }
    userData = () => this.users;
    singleUser = (id: number) => {
        let matchedUser = this.users.find(user => {
            return user.id == id;
        });
        return matchedUser ? matchedUser : undefined;
    };
    
    
    deleteUser = (id: number) => {
        return new Promise((resolve, reject) => {
            if (id) {
                const index = this.users.findIndex((item) => {
                    return item.id == id;
                });
                this.users.splice(index, 1);
                resolve({ status: 'success' });
            } else {
                reject({ status: 'fail' });
            }
        })
    };
    
    
    createUser = (data: User) => {
        return new Promise((resolve, reject) => {
            if (data && typeof data == 'object' && Object.keys(data).length > 0) {
                data.id = this.users[this.users.length-1].id +1;
                this.users.push(data);
                resolve({ status: 'success' });
            } else {
                reject({ status: 'fail' });
            }
        })
    };
    
    
    
    updateUser = (data: User) => {
        return new Promise((resolve, reject) => {
            let valid = false;
            if (data && typeof data == 'object' && Object.keys(data).length > 0) {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].id == Number(data.id)) {
                        this.users[i] = data;
                        valid = true;
                        break;
                    }
                }
    
            }
    
            if (valid) {
                resolve({ status: 'success' });
            } else {
                reject({ status: 'fail' });
            }
        });
    };
}

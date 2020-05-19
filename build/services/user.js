"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
//const users: [User]= [{ id: 1, firstname: 'john',lastname: 'steve', gender: 'male', email: 'john@gmail.com' }, { id: 2, firstname: 'fell',lastname: 'jacob', gender: 'male', email: 'fell@gmail.com' }]
//const userData = () => users;
var UserService = /** @class */ (function () {
    function UserService() {
        var _this = this;
        this.users = [];
        this.userData = function () { return _this.users; };
        this.singleUser = function (id) {
            var matchedUser = _this.users.find(function (user) {
                return user.id == id;
            });
            return matchedUser ? matchedUser : undefined;
        };
        this.deleteUser = function (id) {
            return new Promise(function (resolve, reject) {
                if (id) {
                    var index = _this.users.findIndex(function (item) {
                        return item.id == id;
                    });
                    _this.users.splice(index, 1);
                    resolve({ status: 'success' });
                }
                else {
                    reject({ status: 'fail' });
                }
            });
        };
        this.createUser = function (data) {
            return new Promise(function (resolve, reject) {
                if (data && typeof data == 'object' && Object.keys(data).length > 0) {
                    data.id = _this.users[_this.users.length - 1].id + 1;
                    _this.users.push(data);
                    resolve({ status: 'success' });
                }
                else {
                    reject({ status: 'fail' });
                }
            });
        };
        this.updateUser = function (data) {
            return new Promise(function (resolve, reject) {
                var valid = false;
                if (data && typeof data == 'object' && Object.keys(data).length > 0) {
                    for (var i = 0; i < _this.users.length; i++) {
                        if (_this.users[i].id == Number(data.id)) {
                            _this.users[i] = data;
                            valid = true;
                            break;
                        }
                    }
                }
                if (valid) {
                    resolve({ status: 'success' });
                }
                else {
                    reject({ status: 'fail' });
                }
            });
        };
        this.users = [{ id: 1, firstname: 'john', lastname: 'steve', gender: 'male', email: 'john@gmail.com' }, { id: 2, firstname: 'fell', lastname: 'jacob', gender: 'male', email: 'fell@gmail.com' }];
    }
    return UserService;
}());
exports.UserService = UserService;

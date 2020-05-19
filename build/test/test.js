"use strict";
// at the top of a test file or in a test helper
var td = require("testdouble");
var expect = require("chai").expect;
var tdChai = require("testdouble-chai");
var request = require('supertest');
var express = require('express');
var app = express();
//chai.use(tdChai(td)); // make sure to call tdChai with td to inject the dependency
//var expect = Chai.expect;
var mockdata = require('./mockdata');
var userDetails = mockdata.users;
var usersRouter = require('../routes/users');
var bodyParser = require('body-parser');
describe('module replace', function () {
    var userModule;
    beforeEach(function () {
        userModule = td.replace('../services/user', td.object());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use('/users', usersRouter);
    });
    it('test user data', function (done) {
        td.when(userModule.userData()).thenReturn(userDetails);
        request(app)
            .get('/users')
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.statusCode).to.be.equal(200);
            expect(res.body.metaData).to.be.deep.equal(userDetails);
            done();
        });
    });
    it('should get single user data', function (done) {
        td.when(userModule.singleUser(1)).thenReturn({
            name: 'fabio',
            role: 'admin',
            id: 1
        });
        request(app)
            .get('/users/1')
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.statusCode).to.be.equal(200);
            done();
        });
    });
    it('should throw an error for unmatched id', function (done) {
        td.when(userModule.singleUser(0)).thenReturn();
        request(app)
            .get('/users/0')
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.statusCode).to.be.equal(404);
            done();
        });
    });
    it('should create new user', function (done) {
        td.when(userModule.createUser({
            name: 'david',
            role: 'admin',
            id: 9
        }))
            .thenResolve({ status: 'success' });
        request(app)
            .post('/users/create-user')
            .send({ data: {
                name: 'david',
                role: 'admin',
                id: 9
            } })
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.statusCode).to.be.equal(200);
            done();
        });
    });
    it('should update the user specific data', function (done) {
        td.when(userModule.updateUser({
            name: 'fabio heuser',
            role: 'admin',
            id: 1
        }))
            .thenResolve({
            status: 'success'
        });
        request(app)
            .post('/users/update')
            .send({
            name: 'fabio heuser',
            role: 'admin',
            id: 1
        })
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.statusCode).to.be.equal(200);
            done();
        });
    });
    it('should return error for unmatched data', function (done) {
        td.when(userModule.updateUser({
            name: 'fabio heuser',
            role: 'admin',
            id: 111
        })).thenReject({ status: 'fail' });
        request(app)
            .post('/users/update')
            .send({
            name: 'fabio heuser',
            role: 'admin',
            id: 111
        })
            .expect(200)
            .end(function (err, res) {
            if (err)
                return done(err);
            expect(res.body.statusCode).to.be.equal(500);
            done();
        });
    });
    afterEach(function () { td.reset(); });
});

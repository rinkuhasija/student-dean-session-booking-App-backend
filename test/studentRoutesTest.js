const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);
const API = process.env.BASEURL

describe('Student Routes', () => {
    it('should register a new student', (done) => {
        chai.request(API)
            .post('/api/v1/auth/register/student')
            .send({
                name: 'John Hoe',
                universityId: '12346',
                password: 'testpassword',
                role: 'student'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal('Student registered successfully');
                done();
            });
    });

    it('should not register a new student with missing fields', (done) => {
        chai.request(API)
            .post('/api/v1/auth/register/student')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('All fields are required');
                done();
            });
    });

    it('should not register a new student if already exists', (done) => {
        chai.request(API)
            .post('/api/v1/auth/register/student')
            .send({
                name: 'Jane Smith',
                universityId: '12345', // Use an existing universityId
                password: 'testpassword',
                role: 'student'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Student already exists');
                done();
            });
    });

});

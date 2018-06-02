import {BaseTest} from '../BaseTest';

describe('/GET user/profile/info', () => {

    const test = new BaseTest();
    let JWT: string;
    before((done) => {
        test.getJWT().then((token) => {
            JWT = token;
            done();
        });

    });

    it('it should return user info', (done) => {
        test.chai.request(test.server)
            .get(`${test.route}user/profile/info`)
            .set('Authorization', JWT)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user');
                res.body.should.have.property('groups');
                done();
            });
    });


    it('it should return user friends list', (done) => {
        test.chai.request(test.server)
            .get(`${test.route}user/profile/get-friends`)
            .set('Authorization', JWT)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('friends');
                done();
            });

    });
});
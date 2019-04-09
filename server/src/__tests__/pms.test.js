import request from 'supertest';

import db from 'models';
import app from 'src';

describe('State endpoints', () => {
  afterAll(() => {
    app.close();
  });

  describe('State Endpoints', () => {
    describe('/POST State endpoints', () => {
      it('should create a state', (done) => {
        request(app)
          .post('/api/v1/pms/state')
          .send({ name: 'Lagos' })
          .expect(201)
          .end((err, res) => {
            const { message, data, success } = res.body;
            if (err) throw err;
            expect(message).toEqual('State successfully created');
            expect(success).toEqual(true);
            expect(data.name).toEqual('Lagos');
            done();
          });
      });
      it('should return error when creating an existing state', (done) => {
        request(app)
          .post('/api/v1/pms/state')
          .send({ name: 'Lagos' })
          .expect(400)
          .end((err, res) => {
            const { message, data, success } = res.body;
            if (err) throw err;
            expect(message).toEqual('State details already exist');
            expect(success).toEqual(false);
            expect(data.name).toEqual('Lagos');
            done();
          });
      });
      it('should return error when name is not supplied when creating a state', (done) => {
        request(app)
          .post('/api/v1/pms/state')
          .send()
          .expect(422)
          .end((err, res) => {
            const { message } = res.body;
            if (err) throw err;
            expect(message).toEqual('Please check your credentials');
            done();
          });
      });
    });

    describe('/GET state endpoints', () => {
      it('should get all states', (done) => {
        request(app)
          .get('/api/v1/pms/state')
          .expect(200)
          .end((err, res) => {
            const { message, data, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('States successfully retrieved');
            expect(data.length).toBeGreaterThan(0);
            expect(success).toEqual(true);
            done();
          });
      });
      it('should return error when endpoints do not exist', (done) => {
        request(app)
          .get('/api/v1/pms/sdfsf')
          .expect(404)
          .end((err, res) => {
            const { message, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('That endpoint do not exist');
            expect(success).toEqual(false);
            done();
          });
      });
    });

    describe('/PUT state endpoints', () => {
      it('should updates state details successfully', (done) => {
        request(app)
          .put('/api/v1/pms/state/1')
          .expect(200)
          .end((err, res) => {
            const { message, data, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('State successfully updated');
            expect(data.length).toBeGreaterThan(0);
            expect(success).toEqual(true);
            done();
          });
      });

      it('should return error when updating a non-existing state details', (done) => {
        request(app)
          .put('/api/v1/pms/state/100')
          .expect(404)
          .end((err, res) => {
            const { message, data, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('State not found');
            expect(data.length).toEqual(0);
            expect(success).toEqual(false);
            done();
          });
      });
    });

    describe('/DELETE state endpoint', () => {
      it('should return error when trying to delete a non-existing state', (done) => {
        request(app)
          .delete('/api/v1/pms/state/9000')
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            const { message, data, success } = res.body;

            if (err) throw err;

            expect(message).toEqual('State not found');
            expect(data.length).toEqual(0);
            expect(success).toEqual(false);
            done();
          });
      });

      it('should delete a state successfully', (done) => {
        request(app)
          .delete('/api/v1/pms/state/1')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            const { message, data, success } = res.body;

            if (err) throw err;

            expect(message).toEqual('State successfully deleted');
            expect(data.length).toBeGreaterThan(0);
            expect(success).toEqual(true);
            done();
          });
      });

      it('should return error when trying to delete with invalid stateId', (done) => {
        request(app)
          .delete('/api/v1/pms/state/as')
          .expect(422)
          .end((err, res) => {
            if (err) throw err;
            const { message } = res.body;

            if (err) throw err;

            expect(message).toEqual('Please check your credentials');
            done();
          });
      });
    });
  });


  describe('City endpoints', () => {
    let stateId;
    let cityId;

    beforeAll(async (done) => {
      const response = await db.State.create({
        name: 'Kano',
      });
      stateId = response.id;
      done();
    });

    describe('/POST City endpoints', () => {
      it('should create a city successfully', (done) => {
        request(app)
          .post('/api/v1/pms/city')
          .send({
            name: 'Ikorodu',
            totalMale: 50,
            totalFemale: 10,
            stateId,
          })
          .expect(201)
          .end((err, res) => {
            const { message, data, success } = res.body;
            cityId = data.id;

            if (err) throw done(err);
            expect(message).toEqual('City successfully created');
            expect(success).toEqual(true);
            expect(data.name).toEqual('Ikorodu');
            done();
          });
      });

      it('should return error when creating an existing city', (done) => {
        request(app)
          .post('/api/v1/pms/city')
          .send({
            name: 'Ikorodu',
            totalMale: 50,
            totalFemale: 10,
            stateId,
          })
          .expect(400)
          .end((err, res) => {
            const { message, data, success } = res.body;
            if (err) throw err;
            expect(message).toEqual('City details already exist');
            expect(success).toEqual(false);
            expect(data.name).toEqual('Ikorodu');
            done();
          });
      });
      it('should return error when name request is not supplied when creating a city', (done) => {
        request(app)
          .post('/api/v1/pms/city')
          .send({
            totalMale: 50,
            totalFemale: 10,
            stateId,
          })
          .expect(422)
          .end((err, res) => {
            const { message } = res.body;
            if (err) throw err;
            expect(message).toEqual('Please check your credentials');
            done();
          });
      });
    });

    describe('/GET city endpoints', () => {
      it('should get all cities', (done) => {
        request(app)
          .get('/api/v1/pms/city')
          .expect(200)
          .end((err, res) => {
            const { message, data, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('Cities successfully retrieved');
            expect(data.length).toBeGreaterThan(0);
            expect(success).toEqual(true);
            done();
          });
      });
    });

    describe('/PUT city endpoints', () => {
      it('should updates city details successfully', (done) => {
        request(app)
          .put(`/api/v1/pms/city/${cityId}`)
          .send({
            name: 'Ikeja',
          })
          .expect(200)
          .end((err, res) => {
            const { message, data, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('City successfully updated');
            expect(data.length).toBeGreaterThan(0);
            expect(success).toEqual(true);
            done();
          });
      });

      it('should return error when updating a non-existing city details', (done) => {
        request(app)
          .put('/api/v1/pms/city/100')
          .expect(404)
          .end((err, res) => {
            const { message, data, success } = res.body;

            if (err) throw err;
            expect(message).toEqual('City not found');
            expect(data.length).toEqual(0);
            expect(success).toEqual(false);
            done();
          });
      });
    });

    describe('/DELETE city endpoint', () => {
      it('should return error when trying to delete a non-existing state', (done) => {
        request(app)
          .delete('/api/v1/pms/city/9000')
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            const { message, data, success } = res.body;

            if (err) throw err;

            expect(message).toEqual('City not found');
            expect(data.length).toEqual(0);
            expect(success).toEqual(false);
            done();
          });
      });

      it('should delete a city detail successfully', (done) => {
        request(app)
          .delete(`/api/v1/pms/city/${cityId}`)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            const { message, data, success } = res.body;

            if (err) throw err;

            expect(message).toEqual('City successfully deleted');
            expect(data.length).toBeGreaterThan(0);
            expect(success).toEqual(true);
            done();
          });
      });

      it('should return error when trying to delete with invalid cityId', (done) => {
        request(app)
          .delete('/api/v1/pms/city/as')
          .expect(422)
          .end((err, res) => {
            if (err) throw err;
            const { message } = res.body;

            if (err) throw err;

            expect(message).toEqual('Please check your credentials');
            done();
          });
      });
    });
  });
});

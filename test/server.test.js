/**
 * Test Mock REST routes for...
 * accounts:
 *      createAccount
 *      deleteAccount
 *      Login
 *      Logout
 * funds:
 *      createFund
 *      getFund
 */

const expect = require('chai').expect;
const request = require('supertest');
const server = require('../api/server.js');

describe('API Testing', () => {
  it('sends Account Created status if the request body is valid', () => {
    const account = {
      username: "username",
      password: "password-here",
      isManager: false
    }

    request(server)
      .post('/accounts')
      .send(account)
      .expect(201);
  });
  it('sends Account Deleted status if the accountId parameter is valid', () => {
    const accoundId = 1;

    request(server)
      .delete('/account/' + accoundId)
      .expect(204);
  });
  it('sends Authenticated status if the accountId parameter and request body are valid', () => {
    const accountId = 1;

    request(server)
      .put('/account/' + accountId + '/login')
      .expect(200);
  });
  it('sends Logged Out status if the accountId paramert is valid', () => {
    const accountId = 1;

    request(server)
      .put('/account/' + accountId + '/logout')
      .expect(200);
  });
  it('sends a response body for createFund request if the request body is valid', () => {
    const fund = {
        "title": "string",
        "description": "string",
        "ownerId": 0,
        "members": [
          {
            "username": "string",
            "password": "string",
            "isManager": true
          }
        ],
        "capital": {
          "ETH": 0,
          "SOL": 0,
          "AVAX": 0,
          "XRP": 0
        }
    }

    request(server)
      .put('/funds')
      .expect(201)
      .responseType('application/json');
  });
  it('sends a response body for getFund request if the request body and the fundId are valid', () => {
    const fund = {
      "title": "string",
      "description": "string",
      "ownerId": 0,
      "members": [
        {
          "username": "string",
          "password": "string",
          "isManager": true
        }
      ],
      "capital": {
        "ETH": 0,
        "SOL": 0,
        "AVAX": 0,
        "XRP": 0
      }
    }

    const fundId = 1;

    request(server)
      .get('funds/' + fundId)
      .expect(200);
  });
});
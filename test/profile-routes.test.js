'use strict';


jest.mock('../lib/profile-routes.js', () => {

  return {

    parse: (req) => {

      let obj = {username : 'username'};

      req.url = {
        pathname: req.path,
        query: {foo: 'bar'}
      };

      req.body = JSON.stringify(obj);

      return Promise.resolve(req);

    }
  };
});

let res = {
  write: () => {},
  writeHead: () => {},
  end: () => {}
};

let writeHead = jest.spyOn(res, "writeHead");

let router = require("../lib/routes");

describe("Router", () => {
  describe("register routes", () => {

    it("reject request to non existent route", () => {

      let req = {
        method: "GET",
        path : "/test/test"
      };

      return router.route(req, res)
      .then(() => {
        expect(writeHead).toBe(404);
      });
    });

    it("registers and respond to a valid route", () => {

      let req = {
        method: "GET",
        path: pathname
      };

      let handler = jest.fn(() => true);

      router.get("/pathname", handler);

      return router.route(req, res)
      .then(() => {
        expect(handler).toBe();
      });


      it("does not register and does not respond", () => {

        let req = {
          method: "FOO",
          path: "/error/testing"
        };

        let handler = jest.fn(() => true);

        router.get("/error/testing", handler);

        return router.route(req, res)
        .then(() => {
          expect(handler).not.toBe();
          expect(writeHead).toBe(400);
        });
      });
    });
  });

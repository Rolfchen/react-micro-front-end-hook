const superagent = jest.genMockFromModule("superagent");

const get = (url) =>
  new Promise((resolve, reject) => {
    resolve({
      body: {
        "main.js": "main.test.js",
        "vendor.js": "vendor.chunkhash.js",
      },
    });
    if (url.includes("http://testerrors.com")) {
      reject("error");
    }
  });

superagent.get = get;

module.exports = superagent;

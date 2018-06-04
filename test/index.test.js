const puppeteer = require('puppeteer');
const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

// backend tests
describe('users', () => {
  let database;
  let User;

  before(async () => {
    User = 'meow';
  })

  beforeEach(async () => {
    console.log(User);
  })

  afterEach(async () => {
    console.log("hello")
  })

  describe('#find()', () => {
    it('should find a user', async () => {
      expect(User).to.eql("meow");
    });
  });


  after(async () => {
    console.log("all done")
  })
});

// backend tests
describe('users', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch(isDebugging())
    page = await browser.newPage()
    await page.goto(`http://localhost:3000/`);
  })

  beforeEach(async () => {
    console.log("yeh");
  })

  afterEach(async () => {
    console.log("hello")
  })

  describe("Index basics", () => {
    it("Should have one h1",  async () => {
       const h1Text = await page.evaluate(
         () => document.getElementsByTagName('h1')[0].innerText
       );
       expect(h1Text).to.eql("Hello World!");
    })
  })

  after(async () => {
    console.log("all done")
  })
});

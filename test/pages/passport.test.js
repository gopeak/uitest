import faker from 'faker';
import puppeteer from 'puppeteer';


import routes from '../routes';
import $browser from '../config/browser';
import $config from '../config/index';

let browser = null;
let page = null;
beforeAll(async () => {
    browser = await puppeteer.launch({
        ...$browser
    })
    page = await browser.newPage()
})

let defaultUsername = $config.page.username;
let defaultPassword = $config.page.password;

let $signInUsername = "#user_login";
let $signInPassword = "#user_password";
let $signInSubmit = "#login_submit_btn";
let $signInRemember = "#user_remember_me";

// 登录
const signIn = async remember => {
    await page.goto(routes.index)
    await page.type($signInUsername, defaultUsername);
    await page.type($signInPassword, defaultPassword);
    if (remember) {
        await page.click($signInRemember);
    }
    await page.click($signInSubmit);
}

describe('入口', () => {
    let regInfo = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        display_name: faker.name.findName(),
        username: faker.name.firstName()
    }
    test('#PASSPORT-1-入口页面', async () => {
        await page.goto(routes.index)
        await page.waitForSelector($signInSubmit)
        await page.waitForSelector($signInUsername)
        await page.waitForSelector($signInPassword)
        await browser.close();
    })

    test('#PASSPORT-2-注册', async () => {
        await page.goto(routes.index)
        await page.click('#li-register');
        await page.type('#new_display_name', regInfo.display_name);
        await page.type('#username', regInfo.username);
        await page.type('#new_user_email', regInfo.email);
        await page.type('#new_user_email_confirmation', regInfo.email);
        await page.type('#new_user_password', regInfo.password);
        await page.click("#register_submit_btn");
        await page.waitForSelector('.user-avatar')
        await page.close();
    })

    test('#PASSPORT-3-找回密码', async () => {

    })

    test('#PASSPORT-4-记住密码', async () => {
        let newPage = null;
        await signIn(true)
        await page.waitForSelector('.user-avatar')
        await page.close();
        newPage = await browser.newPage()
        await newPage.goto(routes.index)
        await newPage.waitForSelector('.user-avatar')
        await browser.close();
    })
})


describe('首页', () => {
    test('#INDEX-1-首页', async () => {
        let $nums = ".extra-item-num";
        await signIn()
        await page.waitForSelector('.user-avatar')
        const nums = await page.$$eval($nums, items => {
            return items.map(item => Number(item.innerText))
        })
        for (let num of nums) {
            expect(num).toBeGreaterThanOrEqual(0)
        }
        await browser.close();
    })
})
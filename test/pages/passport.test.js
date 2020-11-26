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




describe('首页', () => {
    test('#PASSPORT-1-入口页面', async () => {
        await page.goto(routes.index)
        await page.waitForSelector('#login_submit_btn')
        await page.waitForSelector('#user_login')
        await page.waitForSelector('#user_password')
        await browser.close();
    })
})

describe('注册及找回密码', () => {
    let regInfo = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        display_name: faker.name.findName(),
        username: faker.name.firstName()
    }
    test('#PASSPORT-2-注册', async () => {
        await page.goto(routes.index)
        await page.click('#li-register');
        await page.type('#new_display_name', regInfo.display_name);
        await page.type('#username', regInfo.username);
        await page.type('#new_user_email', regInfo.email);
        await page.type('#new_user_email_confirmation', regInfo.email);
        await page.type('#new_user_password', regInfo.password);
        await page.click("#register_submit_btn");
        await page.waitForNavigation()
    })
    test('#PASSPORT-3-找回密码', async () => {
        await page.click('.forgot-password');
        await page.type('#user_email', regInfo.email);
        await page.click("#commit");
        let res = await page.evaluate(res => {
            console.log(12345)
            return res
        })
    })
})
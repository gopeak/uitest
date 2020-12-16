import faker from 'faker';
import puppeteer from 'puppeteer';


import routes from '../routes';
import $browser from '../config/browser';
import $config from '../config/index';

import UserModel from '../models/user'



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
    await page.type($signInUsername, defaultUsername);
    await page.type($signInPassword, defaultPassword);
    if (remember) {
        await page.click($signInRemember);
    }
    await page.click($signInSubmit);
}

describe('入口', () => {

    test('#PASSPORT-1-入口页面', async () => {

        // 通过email获取验证码
        let verifyCode = await UserModel.queryVerificationCode('19018891771@masterlab.org')
        console.log(verifyCode)

        await page.goto(routes.index)
        await page.waitForSelector($signInSubmit)
        await page.waitForSelector($signInUsername)
        await page.waitForSelector($signInPassword)
        await browser.close();
    })

    test('#PASSPORT-2-注册', async () => {
        let regInfo = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            display_name: faker.name.findName(),
            username: faker.name.firstName()
        }
        await page.goto(routes.index)
        await page.waitForSelector('#li-register')
        await page.click('#li-register');
        await page.type('#new_display_name', regInfo.display_name);
        await page.type('#username', regInfo.username);
        await page.type('#new_user_email', regInfo.email);
        await page.type('#new_user_email_confirmation', regInfo.email);
        await page.type('#new_user_password', regInfo.password);
        await page.click("#register_submit_btn");
        // await page.waitForSelector('.user-avatar');
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

    test('#INDEX-2-搜索', async () => {
        await signIn()
        let $rows = ".search-result-row a";
        await page.waitForSelector('#search')
        await page.type('#search', "");
        await page.keyboard.press('Enter');
        await page.waitForSelector($rows);
        await page.click($rows);
        await browser.close();
    })
})

describe('用户', () => {
    test('#USER-1-个人资料页', async () => {
        await signIn()
        let avatar = await page.waitForSelector('.header-user-dropdown-toggle');
        let link = await page.waitForSelector('.profile-link');
        await avatar.click()
        await link.click()
        await page.waitForSelector(".avatar-holder");
        await page.waitFor(1000);
        const times = await page.$$eval(".js-timeago", items => {
            return items.map(item => item.innerText)
        })

        if (times.length) {
            await browser.close();
        } else {
            throw new Error("数据为空")
        }
    })
})
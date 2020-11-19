import faker from 'faker';
import puppeteer from 'puppeteer';

import routes from '../routes';
import $browser from '../config/browser';
import $config from '../config/index';



let browser = null;
let page = null;
beforeAll(async () => {
    browser = await puppeteer.launch({ ...$browser })
    page = await browser.newPage()
})

describe('首页', () => {
    test('跳转至登录页', async () => {
        await page.goto(routes.public.index)
        await page.waitForSelector('#new_user')
    })

    test('注册', async () => {
        await page.goto(routes.public.index)

        let user = {
            email: faker.internet.email(),
            password: 'testtest',
            display_name: faker.name.findName(),
            username: faker.name.firstName()
        }
        let email = user.email;

        await page.click('#li-register');
        await page.type('#new_display_name', user.display_name);
        await page.type('#username', user.username);
        await page.type('#new_user_email', email);
        await page.type('#new_user_email_confirmation', email);
        await page.type('#new_user_password', user.password);

        await page.click("#register_submit_btn");

        // await page.waitForSelector('#new_new_user')
        // await page.waitForSelector('#register_submit_btn')
        // let display = await page.$eval('#new_new_user', el => el.innerHTML);
        // expect(display).toMatch('register_submit_btn');
    })
})

describe('入口', () => {
    test('登录验证', async () => {
        await page.goto(routes.public.index)
        const submit_btn = '#login_submit_btn';
        await page.waitForSelector(submit_btn);
        await page.type('#user_login', $config.page.username);
        await page.type('#user_password', $config.page.password);
        await page.click(submit_btn);
        await page.waitForSelector('.extra-item-num');
    })
})

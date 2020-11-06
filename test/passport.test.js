import faker from 'faker'
import puppeteer from 'puppeteer'

const appUrlBase = 'http://masterlab.ink'
const routes = {
    public: {
        index:appUrlBase,
        register: `${appUrlBase}/register`,
        login: `${appUrlBase}/login`,
        find_password:`${appUrlBase}/passport/find_password`,
        noMatch: `${appUrlBase}/asdf`,
    },
    private: {
        dashboard: `${appUrlBase}/dashboard`,
        org: `${appUrlBase}/org`,
        projects: `${appUrlBase}/projects`,

    },
    admin: {
        info: `${appUrlBase}/admin/main`,
    },
}
const user = {
    email: faker.internet.email(),
    password: 'testtest',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobile: faker.phone.phoneNumber(),
    companyName: faker.company.companyName(),
}

let browser
let page
beforeAll(async () => {
    browser = await puppeteer.launch(
        {headless: false,defaultViewport:{width :1440,height:900}}
    )
    page = await browser.newPage()
})

describe('首页', () => {
    test('跳转至登录页', async () => {
        await page.goto(routes.public.index)
        await page.waitForSelector('#new_user')
    })

    test('注册', async () => {
        await page.goto(routes.public.index)
        await page.click('#li-register');
        await page.waitForSelector('#new_new_user')
        await page.waitForSelector('#register_submit_btn')
        let display = await page.$eval('#new_new_user', el => el.innerHTML);
        expect(display).toMatch('register_submit_btn');
    })

})

describe('入口', () => {
    test('登录验证', async () => {
        await page.goto(routes.public.index)
        const submit_btn = '#login_submit_btn';
        await page.waitForSelector(submit_btn);
        await page.type('#user_login', 'master');
        await page.type('#user_password', 'testtest');
        await page.click(submit_btn);
        await page.waitForSelector('.extra-item-num');
    })
})

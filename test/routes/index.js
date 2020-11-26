import config from '../config/index';
const root = config.base_url;
const passportRoot = config.base_url + '/passport/';

let routes = {
    public: {
        index: root
    },
    private: {
        dashboard: `${root}/dashboard`,
        org: `${root}/org`,
        projects: `${root}/projects`,

    },
    admin: {
        info: `${root}/admin/main`,
    },
    index: root,
    passport: {
        login: `${passportRoot}/login`,
        register: `${passportRoot}/login`,
        find_password: `${passportRoot}/find_password`,
    }
}

export default routes
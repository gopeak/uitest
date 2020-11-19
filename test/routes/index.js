import config from '../config/index';
const root = config.base_url;

let routes = {
    public: {
        index:root,
        register: `${root}/register`,
        login: `${root}/login`,
        find_password:`${root}/passport/find_password`,
        noMatch: `${root}/asdf`,
    },
    private: {
        dashboard: `${root}/dashboard`,
        org: `${root}/org`,
        projects: `${root}/projects`,

    },
    admin: {
        info: `${root}/admin/main`,
    },
}

export default routes
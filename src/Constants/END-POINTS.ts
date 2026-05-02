
const BASE_URL = 'https://upskilling-egypt.com:3007';

const BASE_AUTH = `${BASE_URL}/api/auth`;

export const AUTH_URLS = {
    login: `${BASE_AUTH}/login`,
    register: `${BASE_AUTH}/register`,
    forgetpass: `${BASE_AUTH}/forgot-password`,
    resetpass: `${BASE_AUTH}/reset-password`,
    changepass: `${BASE_AUTH}/change-password`,
    logout: `${BASE_AUTH}/logout`
}
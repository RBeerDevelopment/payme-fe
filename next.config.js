const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,
    images: {
        domains: [
            "payee-dev.s3.eu-central-1.amazonaws.com"
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};
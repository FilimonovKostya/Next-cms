const contentfulManagement = require("contentful-management");

module.exports = function () {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: 'CFPAT-PdgNqTTj7eBju4m6IzAzt5422N3ipODFBJYGhhNme-Y',
    })

    return contentfulClient
        .getSpace('gg9vrj4o28f1')
        .then(space => space.getEnvironment('master'))
}
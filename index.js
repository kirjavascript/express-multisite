let config = {
    dev: ~process.argv.indexOf('--dev'),
    devSite: 'wheresvarek.com',
    port: {
        dev: 8000,
        prod: 80,
        express: 9000
    }
}

require('./modules/bounce')(config);
require('./modules/express')(config);
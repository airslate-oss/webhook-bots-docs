const https = require('https');

// add new subscription
const subscribeReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/webhook-bot/v2/subscription',
        method: 'POST',
        headers: {
            Authorization: 'your-token'
        }
    },
    res => {
        res.on('data', d => process.stdout.write(d))
    }
);

const data = new TextEncoder().encode(
    JSON.stringify({
        data: {
            type: 'subscriptions',
            attributes: {
                callback_url: 'https://your-callback-url-t'
            }
        }
    })
);

subscribeReq.write(data);
subscribeReq.end();

// view subscriptions
const viewReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/webhook-bot/v2/subscription',
        method: 'GET',
        headers: {
            Authorization: 'your-token'
        }
    },
    res => {
        res.on('data', d => process.stdout.write(d))
    }
);

viewReq.end();

// delete subscription by id
const deleteReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/webhook-bot/v2/subscription/{UID}',
        method: 'DELETE',
        headers: {
            Authorization: 'your-token'
        }
    },
    res => {
        res.on('data', d => process.stdout.write(d))
    }
);

deleteReq.end();

// view slate-addon statistics
const statsReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/webhook-bot/v2/stats',
        method: 'GET',
        headers: {
            Authorization: 'your-token'
        }
    },
    res => {
        res.on('data', d => process.stdout.write(d))
    }
);

statsReq.end();

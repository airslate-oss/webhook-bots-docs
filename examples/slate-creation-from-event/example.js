const https = require('https');

// view flow documents
const docReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/slate-creation-from-event-bot/documents',
        method: 'GET',
        headers: {
            Authorization: 'your-token'
        }
    },
    res => {
        res.on('data', d => process.stdout.write(d))
    }
);

docReq.end();

// create a request to create and prefill the slate
const slateCreateReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/slate-creation-from-event-bot/create-slate',
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
            type: 'slate_creation_requests',
            attributes: {
                callback_url: 'https://your-callback-url'
            }
        },
        meta: {
            fields: [
                {
                    id: '{FIELD_UID}',
                    name: 'field_name',
                    value: 'value'
                }
            ]
        }
    })
);

slateCreateReq.write(data);
slateCreateReq.end();

// check request status
const statusReq = https.request(
    {
        hostname: 'bots.airslate.com',
        path: '/slate-creation-from-event-bot/create-slate/{UID}',
        method: 'GET',
        headers: {
            Authorization: 'your-token'
        }
    },
    res => {
        res.on('data', d => process.stdout.write(d))
    }
);

statusReq.end();

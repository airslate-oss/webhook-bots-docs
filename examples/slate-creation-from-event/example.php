<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    'base_uri' => 'https://bots.airslate.com/',
    'headers' => [
        'Authorization' => 'your-token'
    ]
]);

$documentsUrl = '/slate-creation-from-event-bot/documents';
$createSlateUrl = '/slate-creation-from-event-bot/create-slate';

// view flow documents
$documentsResponse = $client->get($documentsUrl);
$documentsData = json_decode($documentsResponse->getBody()->getContents(), true);
// extract flow document field data
$fieldUid = $documentsData[0]['included'][0]['id'];
$fieldName = $documentsData[0]['included'][0]['attributes']['name'];

// create a request to create and prefill the slate
$body = [
    "data" => [
        "type" => "slate_creation_requests",
        "attributes" => [
            "callback_url" => 'https://your-callback-url'
        ]
    ],
    'meta' => [
        'fields' => [
            [
                'id' => $fieldUid,
                'name' => $fieldName,
                'value' => 'value',
            ]
        ]
    ]
];
$createSlateResponse = $client->post($createSlateUrl, ['json' => $body]);

// check request status
$requestUid = json_decode($createSlateResponse->getBody()->getContents(), true)['data']['id'];
$slateStatusResponse = $client->get($createSlateUrl . '/' . $requestUid);

echo $slateStatusResponse->getBody()->getContents();

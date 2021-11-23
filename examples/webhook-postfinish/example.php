<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    'base_uri' => 'https://bots.airslate.com/',
    'headers' => [
        'Authorization' => 'your-token'
    ]
]);

$url = '/webhook-bot/v2/subscription';
$statsUrl = '/webhook-bot/stats';

$body = [
    "data" => [
        "type" => "subscriptions",
        "attributes" => [
            "callback_url" => 'https://your-callback-url'
        ]
    ]
];

// add new subscription
$subscribeResponse = $client->post($url, ['json' => $body]);

// view subscriptions
$viewResponse = $client->get($url);
echo $viewResponse->getBody()->getContents();

// delete subscription by id
$id = json_decode($subscribeResponse->getBody()->getContents(), true)['data']['id'];
$client->delete($url . '/' . $id);

// view slate-addon statistics
$statsResponse = $client->get($statsUrl);
echo $statsResponse->getBody()->getContents();

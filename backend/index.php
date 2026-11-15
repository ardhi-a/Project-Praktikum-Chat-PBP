<?php

declare(strict_types=1);

$router = require __DIR__ . '/bootstrap/index.php';

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestPath = parse_url($requestUri, PHP_URL_PATH);

$basePath = rtrim(
    str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')),
    '/'
);

if (
    $basePath !== ''
    && strpos($requestPath, $basePath) === 0
) {
    $requestPath = substr($requestPath, strlen($basePath));
}

$router->dispatch(
    $_SERVER['REQUEST_METHOD'] ?? 'GET',
    $requestPath ?: '/'
);

<?php

namespace Lib;

function responseJson(
    array $data = [],
    int $statusCode = 200,
    string $message = ''
): void {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode([
        'status' => $statusCode,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}
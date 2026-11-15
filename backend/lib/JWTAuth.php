<?php

declare(strict_types=1);

namespace Lib;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use function Lib\responseJson;

class JWTAuth
{
    // Membuat JWT Token setelah login berhasil
    public static function generate(string $userId): string
    {
        $secret = getenv('JWT_SECRET');

        if (!$secret) {
            throw new \RuntimeException('JWT_SECRET is not configured');
        }

        $issuedAt = time();
        $expire = (int) (getenv('JWT_EXPIRE') ?: 3600);

        $payload = [
            'iss' => 'chat-app',
            'iat' => $issuedAt,
            'exp' => $issuedAt + $expire,
            'sub' => $userId,
        ];

        return JWT::encode($payload, $secret, 'HS256');
    }

    // Memeriksa apakah JWT Token valid
    public static function verify(string $token): array
    {
        $secret = getenv('JWT_SECRET');

        if (!$secret) {
            throw new \RuntimeException('JWT_SECRET is not configured');
        }

        $decoded = JWT::decode(
            $token,
            new Key($secret, 'HS256')
        );

        return (array) $decoded;
    }

    // Mengambil dan memverifikasi token dari request
    public static function authenticate(): array
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (!preg_match('/^Bearer\s+(\S+)$/i', $header, $matches)) {
            responseJson(
                statusCode: 401,
                message: 'Authorization token is required'
            );
        }

        try {
            return self::verify($matches[1]);
        } catch (\Throwable $e) {
            responseJson(
                statusCode: 401,
                message: 'Invalid or expired token'
            );
        
            return [];
        }
    }
}
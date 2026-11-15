<?php

declare(strict_types=1);

namespace Controllers;

use Models\User;
use Lib\JWTAuth;
use function Lib\responseJson;

class AuthController
{
    public static function login(): void
    {
        // Membaca data JSON dari request
        $input = file_get_contents('php://input');

        if ($input === false) {
            responseJson(
                statusCode: 500,
                message: 'Unable to read request body'
            );
        }

        $data = json_decode($input, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
            responseJson(
                statusCode: 400,
                message: 'Request body must be valid JSON'
            );
        }

        // Mengambil nomor telepon dan password
        $phone = $data['phone'] ?? null;
        $password = $data['password'] ?? null;

        // Validasi data
        if (
            !is_string($phone) || trim($phone) === ''
            || !is_string($password) || $password === ''
        ) {
            responseJson(
                statusCode: 422,
                message: 'Phone and password are required'
            );
        }

        // Mencari pengguna berdasarkan nomor telepon
        $user = User::findByPhone(trim($phone));

        if (
            $user === null
            || !password_verify($password, $user['password_hash'])
        ) {
            responseJson(
                statusCode: 401,
                message: 'Invalid phone number or password'
            );
        }

        $token = JWTAuth::generate($user['id']);

        // Mengirim data pengguna tanpa password hash
        responseJson(
            data: [
                'id' => $user['id'],
                'name' => $user['name'],
                'phone' => $user['phone'],
                'profile_picture' => $user['profile_picture'],
                'token' => $token,
                'token_type' => 'Bearer',
                'expires_in' => (int) (getenv('JWT_EXPIRE') ?: 3600),
            ],
            statusCode: 200,
            message: 'Login successful'
        );
    }
}

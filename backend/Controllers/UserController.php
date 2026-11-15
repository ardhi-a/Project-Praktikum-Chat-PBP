<?php

declare(strict_types=1);

namespace Controllers;

use Models\User;
use function Lib\responseJson;

class UserController
{
    public static function register(): void
    {
        $input = file_get_contents('php://input');
        if ($input === false) {
            responseJson(statusCode: 500, message: 'Unable to read request body');
        }

        $data = json_decode($input, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
            responseJson(statusCode: 400, message: 'Request body must be a valid JSON object');
        }

        $name = $data['name'] ?? null;
        $phone = $data['phone'] ?? null;
        $password = $data['password'] ?? null;
        $profilePicture = $data['profile_picture'] ?? null;

        if (
            !is_string($name) || trim($name) === ''
            || !is_string($phone) || trim($phone) === ''
            || !is_string($password) || strlen($password) < 8
            || !is_string($profilePicture)
        ) {
            responseJson(
                statusCode: 422,
                message: 'name, phone, and profile_picture are required strings'
            );
        }

        if (!preg_match('/^\+?[0-9]{10,15}$/', trim($phone))) {
            responseJson(
                statusCode: 422,
                message: 'Phone number must contain 10-15 digits'
            );
        }
        
        $id = '';

        try {
            $id = User::create([
                'name' => trim($name),
                'phone' => trim($phone),
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                'profile_picture' => $profilePicture,
            ]);
        } catch (\PDOException $e) {
            if (
                isset($e->errorInfo[1])
                && (int) $e->errorInfo[1] === 1062
            ) {
                responseJson(
                    statusCode: 409,
                    message: 'Phone number already registered'
                );
            }

            error_log($e->getMessage());

            responseJson(
                statusCode: 500,
                message: 'Internal server error'
            );
        }

        responseJson(
            data: ['id' => $id],
            statusCode: 201,
            message: 'User registered successfully'
        );
    }
}
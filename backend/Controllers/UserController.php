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
        $profilePicture = $data['profile_picture'] ?? null;

        if (
            !is_string($name) || trim($name) === ''
            || !is_string($phone) || trim($phone) === ''
            || !is_string($profilePicture)
        ) {
            responseJson(
                statusCode: 422,
                message: 'name, phone, and profile_picture are required strings'
            );
        }

        $id = User::create([
            'name' => trim($name),
            'phone' => trim($phone),
            'profile_picture' => $profilePicture,
        ]);

        responseJson(
            data: ['id' => $id],
            statusCode: 201,
            message: 'User registered successfully'
        );
    }
}
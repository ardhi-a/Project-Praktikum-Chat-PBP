<?php

declare(strict_types=1);

namespace Models;

use Lib\DB;

class User
{
    public static function create(array $attributes): int
    {
        $db = DB::getInstance();
        $statement = $db->prepare(
            'INSERT INTO users (name, phone, profile_picture)
             VALUES (:name, :phone, :profile_picture)'
        );
        $statement->execute([
            ':name' => $attributes['name'],
            ':phone' => $attributes['phone'],
            ':profile_picture' => $attributes['profile_picture'],
        ]);

        return (int) $db->lastInsertId();
    }
}
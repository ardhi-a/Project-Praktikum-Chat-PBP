<?php

declare(strict_types=1);

namespace Models;

use Lib\DB;

class User
{
    public static function create(array $attributes): string
    {
        // Membuat ID unik sepanjang 32 karakter
        $id = bin2hex(random_bytes(16));

        $db = DB::getInstance();

        $statement = $db->prepare(
            'INSERT INTO users (id, name, phone, password_hash, profile_picture)
             VALUES (:id, :name, :phone, :password_hash, :profile_picture)'
        );

        $statement->execute([
            ':id' => $id,
            ':name' => $attributes['name'],
            ':phone' => $attributes['phone'],
            ':password_hash' => $attributes['password_hash'],
            ':profile_picture' => $attributes['profile_picture'],
        ]);

        return $id;
    }

    public static function findByPhone(string $phone): ?array
    {
        $db = DB::getInstance();

        $statement = $db->prepare(
            'SELECT id, name, phone, password_hash, profile_picture
            FROM users
            WHERE phone = :phone
            LIMIT 1'
        );

        $statement->execute([
            ':phone' => $phone,
        ]);

        $user = $statement->fetch(\PDO::FETCH_ASSOC);

        return $user ?: null;
    }

    
}
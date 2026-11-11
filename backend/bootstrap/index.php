<?php

declare(strict_types=1);

require_once __DIR__ . '/loadEnv.php';
require_once __DIR__ . '/response.php';

use Lib\Router;

$envPath = dirname(__DIR__) . '/.env';
if (is_file($envPath)) {
    \Lib\loadEnv($envPath);
}

spl_autoload_register(static function (string $class): void {
    $prefixes = [
        'Controllers\\' => dirname(__DIR__) . '/controllers/',
        'Lib\\' => dirname(__DIR__) . '/lib/',
        'Models\\' => dirname(__DIR__) . '/models/',
    ];

    foreach ($prefixes as $prefix => $directory) {
        if (strncmp($class, $prefix, strlen($prefix)) !== 0) {
            continue;
        }

        $file = $directory . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
        if (is_file($file)) {
            require $file;
        }

        return;
    }
});

$router = new Router();
$registerRoutes = require dirname(__DIR__) . '/routes/api.php';
$registerRoutes($router);

return $router;
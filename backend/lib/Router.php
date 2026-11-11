<?php

declare(strict_types=1);

namespace Lib;

use function Lib\responseJson;

class Router
{
    private array $routes = [];

    public function get(string $path, callable $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    public function add(string $method, string $path, callable $handler): void
    {
        $path = $this->normalizePath($path);
        $parameterNames = [];
        $quotedPath = preg_quote($path, '~');
        $pattern = preg_replace_callback(
            '/\\\\\{([a-zA-Z_][a-zA-Z0-9_]*)\\\\\}/',
            static function (array $matches) use (&$parameterNames): string {
                $parameterNames[] = $matches[1];
                return '([^/]+)';
            },
            $quotedPath
        );

        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'pattern' => '~^' . $pattern . '$~',
            'parameters' => $parameterNames,
            'handler' => $handler,
        ];
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH);
        $path = $this->normalizePath(is_string($path) ? $path : '/');
        $method = strtoupper($method);
        $allowedMethods = [];

        foreach ($this->routes as $route) {
            if (!preg_match($route['pattern'], $path, $matches)) {
                continue;
            }

            $allowedMethods[] = $route['method'];
            if ($route['method'] !== $method) {
                continue;
            }

            array_shift($matches);
            $parameters = array_map('rawurldecode', $matches);
            call_user_func_array($route['handler'], $parameters);
            return;
        }

        if ($allowedMethods !== []) {
            $allowedMethods = array_values(array_unique($allowedMethods));
            header('Allow: ' . implode(', ', $allowedMethods));
            responseJson(statusCode: 405, message: 'Method not allowed');
        }

        responseJson(statusCode: 404, message: 'Route not found');
    }

    private function normalizePath(string $path): string
    {
        $normalized = rtrim($path, '/');
        return $normalized === '' ? '/' : $normalized;
    }
}

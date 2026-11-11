<?php
namespace Lib;

function loadEnv(string $path): void
{
    if (!file_exists($path)) {
        throw new \InvalidArgumentException(sprintf('%s does not exist', $path));
    }

    if (!is_readable($path)) {
        throw new \RuntimeException(sprintf('%s is not readable', $path));
    }

    // Read file lines, ignoring new lines and skipping empty lines
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        // Skip comments starting with #
        if (strpos($line, '#') === 0) {
            continue;
        }

        // Split by the first '=' character to separate key and value
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            
            $name = trim($name);
            $value = trim($value);

            // Strip surrounding quotes if they exist
            if (preg_match('/^"([^"]*)"$/', $value, $matches) || preg_match('/^\'([^\']*)\'$/', $value, $matches)) {
                $value = $matches[1];
            }

            // Bind values to environment superglobals and system variables
            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                putenv(sprintf('%s=%s', $name, $value));
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}

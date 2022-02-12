<?php

namespace LiveUsers;

class Router
{
    private $registeredRoutes = [];

    public function registerRoute($paths, $callback)
    {
        foreach ($paths as $path) {
            array_push($this->registeredRoutes, [$path, $callback]);
        }
    }

    public function handleRoutes()
    {
        $request = $_SERVER['REQUEST_URI'];

        // Find router and execute callback.
        foreach ($this->registeredRoutes as $route) {
            if ($request == $route[0]) {
                $route[1]();
                return;
            }
        }

        // No routes found, return 404 status code.
        http_response_code(404);
        echo '404 Not Found';
    }
}

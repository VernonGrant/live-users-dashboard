<?php

namespace LiveUsers;

class Router {

    private $_registeredRoutes;

    public function __construct() {
        $this->registeredRoutes = [];
    }

    public function registerRoute($paths, $callback) {
        // If paths is a string.
        if (is_array($paths) === false) {
            array_push($this->registeredRoutes, [$paths, $callback]);
            return;
        }

        // If paths is an array.
        foreach ($paths as $path) {
            array_push($this->registeredRoutes, [$path, $callback]);
        }
    }

    public function handleRoutes() {
        $request = $_SERVER['REQUEST_URI'];

        // Find router and execute callback.
        foreach ($this->registeredRoutes as $route) {
            if ( $request == $route[0] ) {
                $route[1]();
                return;
            }
        }

        // No routes found, return 404 status code.
        http_response_code(404);
        echo '404 Not Found';
    }
}

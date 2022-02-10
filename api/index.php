<?php

require __DIR__ . '/bootstrap.php';

use LiveUsers\Router;

// Setup router and register our routes.

$router = new Router();

$router->registerRoute(['/api/enter/', '/api/enter' ], function () {
    http_response_code(200);
    echo 'Entering';
});

$router->registerRoute(['/api/users/', '/api/users' ], function () {
    http_response_code(200);
    echo 'Users';
});

$router->handleRoutes();

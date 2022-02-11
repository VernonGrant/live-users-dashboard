<?php

require __DIR__ . '/bootstrap.php';

use LiveUsers\Router;
use LiveUsers\Models\UsersModel;

// Setup router and register our routes.

$router = new Router();

$router->registerRoute(['/api/enter/', '/api/enter' ], function () {
    // Post requests only.
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') goto ERROR;

    // Setup user model.
    $userModel = new UsersModel();
    $userModel->constructFromArray($_POST);

    if ($userModel->validate()) {
        $userModel->onEntrance();
        $userModel->update();

        // Respond with the users data.
        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        echo $userModel->toJson();
    } else {
        ERROR:
        http_response_code(400);
        echo 'Bad Request';
    }
});

$router->registerRoute(['/api/exit/', '/api/exit' ], function () {
    http_response_code(200);
    echo 'Set user online state to offline';
});

$router->registerRoute(['/api/users/', '/api/users' ], function () {
    http_response_code(200);
    echo 'Get all users';
});

$router->handleRoutes();

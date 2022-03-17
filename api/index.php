<?php

require __DIR__ . '/bootstrap.php';

use LiveUsers\Router;
use LiveUsers\Models\UsersModel;

// Clean posted data array.

$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

// Setup router and register routes.

$router = new Router();

$router->registerRoute(['/api/enter/', '/api/enter'], function () {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        goto ERROR;
    }

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
    }
});

$router->registerRoute(['/api/exit/', '/api/exit'], function () {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        goto ERROR;
    }

    $userModel = new UsersModel();
    $userModel->constructFromArray($_POST);

    if ($userModel->exists()) {
        $userModel->online = false;
        $userModel->update();
        http_response_code(200);
    } else {
        ERROR:
        http_response_code(400);
    }
});

$router->registerRoute(['/api/users/', '/api/users'], function () {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        goto ERROR;
    }

    $userModel = new UsersModel();
    $userModel->constructFromArray($_POST);

    // We check if the current request is from an exiting user.
    if ($userModel->exists()) {
        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        echo $userModel->getOnlineUsersJson();
    } else {
        ERROR:
        http_response_code(400);
        echo 'Bad Request';
    }
});

$router->handleRoutes();

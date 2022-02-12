<?php

$loader = require __DIR__ . '/../vendor/autoload.php';
$loader->addPsr4('LiveUsers\\', __DIR__ . '/core');

// Global constants.

require __DIR__ . '/config.php';

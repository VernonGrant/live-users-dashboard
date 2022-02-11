<?php

$loader = require __DIR__ . '/../vendor/autoload.php';
$loader->addPsr4('LiveUsers\\', __DIR__ . '/core');

// Global constants.

define('DATA_FILE_PATH', __DIR__ . '/data/data.json');

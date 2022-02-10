<?php

// Use simple PHP autoloading.

spl_autoload_register(function ($class) {
    include 'core/' . $class . '.php';
});

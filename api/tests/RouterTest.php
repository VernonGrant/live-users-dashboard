<?php declare(strict_types=1);

namespace LiveUsers\Tests;

use LiveUsers\Router;

use PHPUnit\Framework\TestCase;

/**
 * @covers LiveUsers\Router
 */
final class RouterTest extends TestCase
{
    public function testRegisterRoutes()
    {
        $router = new Router();

        $this->assertEmpty($router->getRegisteredRoutes());

        $router->registerRoute([ '/my/route' ], function () {
            // Example callback.
        });

        $this->assertNotEmpty($router->getRegisteredRoutes());
        $this->assertEquals('/my/route', $router->getRegisteredRoutes()[0][0]);
    }
}

<?php declare(strict_types=1);

namespace LiveUsers\Tests;

use PHPUnit\Framework\TestCase;

/**
 * @covers \LiveUsers\Test
 */
final class SampleTest extends TestCase
{
    public function testHello(): void
    {
        $this->assertEquals('Hello World', Test::hello());
    }
}

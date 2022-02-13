<?php declare(strict_types=1);

namespace LiveUsers\Tests;

use LiveUsers\Models\UsersModel;

use PHPUnit\Framework\TestCase;

/**
 * @covers LiveUsers\Models\UsersModel
 */
final class UsersModelTest extends TestCase
{
    public function testConstructFromArray()
    {
        $user = new UsersModel();

        $user->constructFromArray([
            'name' => 'Jhon',
            'email' => 'jhon@example.com'
        ]);

        $this->assertEquals($user->name, 'Jhon');
        $this->assertEquals($user->email, 'jhon@example.com');
    }
}

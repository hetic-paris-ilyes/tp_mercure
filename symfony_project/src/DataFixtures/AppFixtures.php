<?php

namespace App\DataFixtures;

use App\Factory\UserFactory;
use App\Factory\MessageFactory;
use App\Factory\ChatFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(10);
        ChatFactory::createMany(3);
    }
}

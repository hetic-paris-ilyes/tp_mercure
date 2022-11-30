<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/chat/{user}', name: 'chat_user', methods: 'POST')]
    public function chatUser(User $user, HubInterface $hub)
    {
        // requete chat_user (1,2) existe ?  renvoie id room
        // redirigier vers url /topic/idRoom
        // si oui getmessages(idroom) 
      




        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId()
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Ping sent'
        ]);
    }
}
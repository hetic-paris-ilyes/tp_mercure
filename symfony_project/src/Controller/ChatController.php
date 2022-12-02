<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Chat;
use App\Factory\MessageFactory;
use App\Repository\ChatRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

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

    #[Route('/test', name: 'chat_test', methods: 'GET')]
    public function getChatRoom(UserRepository $userRepository, ChatRepository $chatRepository, Request $request)
    {
        $user_1 = $_GET["userTo"];
        $user_2 = $_GET["myUser"];
        
        $chatroom = $chatRepository->getChatsByUsers($user_1,$user_2);
        if($chatroom !== null){
            var_dump("Conversation existante");
            $idChat = $chatroom["id"];
            //TODO Récupération des messages de la discussion
            //TODO Renvoyer resultat en front avec redirection
        }
        else{
            var_dump("Pas de conv");
            $idChat = $chatRepository->newChat($user_1, $user_2, $userRepository);
            
            //TODO Création du chat?
            // Soit on créer le chat lorsqu'on clique sur l'utilisateur ou sinn lorsqu'on envoi un message...A revoir
        }


        return $this->json([
            'test' => $idChat
        ], 200, [], ['groups' => 'main']);
    }
}
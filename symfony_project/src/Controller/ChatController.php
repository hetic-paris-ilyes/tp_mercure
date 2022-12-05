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
    #[Route('/getChatRoom', name: 'chat_test', methods: 'GET')]
    public function getChatRoom(UserRepository $userRepository, ChatRepository $chatRepository, Request $request)
    {
        $user_1 = $_GET["userTo"];
        $user_2 = $_GET["myUser"];
        
        $chatroom = $chatRepository->getChatsByUsers($user_1,$user_2);
        if($chatroom !== null){
            var_dump("Conversation existante");
            $idChat = $chatroom["id"];
            //return $this->redirectToRoute('chat_messages', ['id' => $idChat]);
        }
        else{
            var_dump("Pas de conv");
            $idChat = $chatRepository->newChat($user_1, $user_2, $userRepository);
            //return $this->redirectToRoute('chat_messages', ['id' => $idChat]);
        }
        return $this->json([
            'id_chat' => $idChat]);
    }

    #[Route('/chat/{id}', name: 'chat_messages', methods: 'GET')]
    public function getChatMessages(ChatRepository     $chatRepository,
                                    int             $id): \Symfony\Component\HttpFoundation\JsonResponse
    {
        return $this->json([
            'chat' => $chatRepository->getAllMessagesOrderByDate($id)
        ], 200, [], ['groups' => 'main']);
    }

    #[Route('/chat/{id}/createMessage', name: 'chat_post', methods: 'POST')]
    public function chatMessage(HubInterface $hub,Request $request)
    {
        $post_data = json_decode($request->getContent(), true);
        //$date = $post_data['date'];
        var_dump($post_data);
        /*$update = new Update(
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
*/
        return $this->json([
            'message' => 'Ping sent'
        ]);
    }

}
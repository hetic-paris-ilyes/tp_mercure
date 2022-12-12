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

        $chatroom = $chatRepository->getChatsByUsers($user_1, $user_2);
        if ($chatroom !== null) {
            var_dump("Conversation existante");
            $idChat = $chatroom["id"];
            //return $this->redirectToRoute('chat_messages', ['id' => $idChat]);
        } else {
            var_dump("Pas de conv");
            $idChat = $chatRepository->newChat($user_1, $user_2, $userRepository);
            //return $this->redirectToRoute('chat_messages', ['id' => $idChat]);
        }
        return $this->json([
            'id_chat' => $idChat
        ]);
    }

    #[Route('/chat/{id}', name: 'chat_messages', methods: 'GET')]
    public function getChatMessages(
        ChatRepository     $chatRepository,
        int             $id
    ): \Symfony\Component\HttpFoundation\JsonResponse {
        return $this->json([
            'chat' => $chatRepository->getAllMessagesOrderByDate($id)
        ], 200, [], ['groups' => 'main']);
    }

    #[Route('/chat/createMessage', name: 'chat_post', methods: 'POST')]
    public function chatMessage(HubInterface $hub, Request $request, MessageRepository $messageRepository,  UserRepository $userRepository, ChatRepository $chatRepository)
    {
        $post_data = json_decode($request->getContent(), true);
        $content = $post_data['content'];
        $chatId = intval($post_data['chatId']);
        $authorId = intval($post_data['authorId']);

        if ($content == null || $chatId == null || $authorId == null) {
            var_dump(("Il manque un champ"));
        }

        $messageId = $messageRepository->newMessage($authorId, $chatId, $content, $userRepository, $chatRepository);

        return $this->json([
            'message' => 'Message sent', $messageId
        ]);
    }

    #[Route('/allChat', name: 'chat_all', methods: 'GET')]
    public function getAllChats(ChatRepository $chatRepository)
    {
        $user_1 = intval($_GET["myUser"]);
        $chats = $chatRepository->findByUser(intval($user_1));

        return $this->json([
            'Chats' => $chats
        ]);
    }
}

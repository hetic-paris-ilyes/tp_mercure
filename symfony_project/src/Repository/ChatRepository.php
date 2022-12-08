<?php

namespace App\Repository;

use App\Entity\Chat;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Chat|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chat|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chat[]    findAll()
 * @method Chat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chat::class);
    }

    /**
     * @throws NonUniqueResultException
     */
    public function getChatsByUsers ($id1, $id2){
        return $this->createQueryBuilder('c')
            ->select("c.id")
            ->innerJoin('c.users',  'u', "WITH", 'u.id = :id')
            ->innerJoin('c.users',  'u2', "WITH", 'u2.id = :id2')
            ->setParameter('id', $id1)
            ->setParameter('id2', $id2)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function newChat ($id1, $id2, UserRepository $userRepository){

        $entityManager = $this->getEntityManager();
        $newChat = new Chat();
        $newChat->setLabel("Chat test");

        $user1 = $userRepository->findOneById($id1);
        $user2 = $userRepository->findOneById($id2);

        $newChat->addUser($user1);
        $newChat->addUser($user2);
        $entityManager->persist($newChat);
        $entityManager->flush();

        return $newChat->getId();
    }

    public function getAllMessagesOrderByDate(int $chat_id)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :val')
            ->setParameter('val', $chat_id)
            ->innerJoin('c.messages', 'messages')
            ->addSelect('messages')
            ->orderBy('messages.createdAt', 'ASC')
            ->getQuery()
            ->getArrayResult();
    }

    public function findOneById($id): ?Chat
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    // /**
    //  * @return Chat[] Returns an array of Chat objects
    //  */
    /*
    public function findByUser($user_id)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user_id = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Chat
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

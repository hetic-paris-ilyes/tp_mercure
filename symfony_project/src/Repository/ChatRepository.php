<?php

namespace App\Repository;

use App\Entity\Chat;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
    public function getChatsByUsers (){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT o1
            FROM App\Entity\Chat o1
            INNER JOIN App\Entity\User o2 WITH o2.id = o1.id
            INNER JOIN  App\Entity\User o3 WITH o3.id = o1.id
            WHERE o2.id = 21
            AND o3.id = 22'
        );

        return $query->getOneOrNullResult();
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

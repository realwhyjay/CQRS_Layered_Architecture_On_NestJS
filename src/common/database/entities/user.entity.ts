import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'first_name', length: 256 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 256 })
  lastName: string;

  @Column('varchar', { name: 'phone', length: 16 })
  phone: string;

  @Column('varchar', { name: 'email', length: 128 })
  email: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'date',
    default: null,
  })
  deletedAt: Date;
}

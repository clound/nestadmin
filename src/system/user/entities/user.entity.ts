import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_tb')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 20, default: '', comment: '名称' })
    username: string;

    @Column({ type: 'int', default: 0, comment: '年龄' })
    age: number;

    @Column({ type: 'int', default: 0, comment: '性别' })
    sex: number;

    @Column({ type: 'varchar', length: 20, default: '', comment: '地址' })
    address: string;
}

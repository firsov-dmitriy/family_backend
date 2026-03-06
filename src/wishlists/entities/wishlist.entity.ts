import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'wishlists' })
export class Wishlist {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'MacBook Air M3' })
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @ApiProperty({ example: 'https://www.apple.com/macbook-air/' })
  @Column({ type: 'varchar', length: 2048 })
  url!: string;

  @ApiProperty({ example: 'Tbilisi' })
  @Column({ type: 'varchar', length: 120 })
  city!: string;
}

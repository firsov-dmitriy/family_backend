import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ example: 'MacBook Air M3' })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ example: 'https://www.apple.com/macbook-air/' })
  @IsUrl()
  @MaxLength(2048)
  url!: string;

  @ApiProperty({ example: 'Tbilisi' })
  @IsString()
  @MaxLength(120)
  city!: string;
}

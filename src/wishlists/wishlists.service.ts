import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = this.wishlistsRepository.create(createWishlistDto);
    return this.wishlistsRepository.save(wishlist);
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistsRepository.findOne({ where: { id } });

    if (!wishlist) {
      throw new NotFoundException(`Wishlist with id=${id} not found`);
    }

    return wishlist;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    Object.assign(wishlist, updateWishlistDto);
    return this.wishlistsRepository.save(wishlist);
  }

  async remove(id: number): Promise<void> {
    const result = await this.wishlistsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Wishlist with id=${id} not found`);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {
    const products = await this.productRepository.find({
      order: { name: 'ASC' },
    });
    return products.map((p) => ({
      ...p,
      missingLetter: this.getMissingLetter(p.name),
    }));
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return {
      ...product,
      missingLetter: this.getMissingLetter(product.name),
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) throw new NotFoundException('Product not found');
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return this.productRepository.remove(product);
  }

  private getMissingLetter(name: string): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const used = new Set(
      name
        .toLowerCase()
        .replace(/[^a-z]/g, '')
        .split(''),
    );
    for (const letter of alphabet) {
      if (!used.has(letter)) return letter;
    }
    return '_';
  }
}

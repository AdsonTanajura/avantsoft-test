import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    createProductDto.sku = createProductDto.sku.toUpperCase();
    const exists = await this.productRepository.findOneBy({
      sku: createProductDto.sku,
    });
    if (exists) {
      throw new BadRequestException('SKU must be unique');
    }

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
    if (updateProductDto.sku) {
      const exists = await this.productRepository.findOneBy({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sku: updateProductDto.sku,
      });
      if (exists && exists.id !== id) {
        throw new BadRequestException('SKU must be unique');
      }
    }

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

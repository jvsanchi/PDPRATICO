import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductEntity } from "src/entities/product.entity";
import { RoleEnum } from "src/enum/roles.enum";
import { RolesGuard } from "src/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/roles/roles.decorator";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Product created successfully",
    type: ProductEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Invalid input" })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of products",
    type: [ProductEntity],
  })
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Get(":id")
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Product found",
    type: ProductEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product not found",
  })
  async findOne(@Param("id") id: number): Promise<ProductEntity> {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Put(":id")
  @ApiOperation({ summary: "Update a product by ID" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Product updated successfully",
    type: ProductEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product not found",
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Invalid input" })
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.MASTER, RoleEnum.ADMIN)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a product by ID" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Product deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product not found",
  })
  async remove(@Param("id") id: number): Promise<void> {
    await this.productService.remove(id);
  }
}

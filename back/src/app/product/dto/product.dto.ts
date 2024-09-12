import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDecimal,
  IsInt,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { StockLimits } from "./stock-limits"; // Importe a classe StockLimits

export class CreateProductDto {
  @ApiProperty({
    description: "Código EAN/GTIN do produto",
    example: "1234567890123",
  })
  @IsNotEmpty()
  @IsString()
  eanGtin: string;

  @ApiProperty({
    description: "Nome do produto",
    example: "Produto Exemplo",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Foto ou thumbnail do produto",
    example: "http://example.com/photo.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({
    description: "Categoria do produto",
    example: "Eletrônicos",
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: "Subcategoria do produto",
    example: "Celulares",
    required: false,
  })
  @IsOptional()
  @IsString()
  subcategory?: string;

  @ApiProperty({
    description: "Marca do produto",
    example: "Marca Exemplo",
  })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({
    description: "Localização física do produto",
    example: "Armazém A",
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: "Preço de venda do produto",
    example: 199.99,
  })
  @IsNotEmpty()
  @IsDecimal()
  salePrice: number;

  @ApiProperty({
    description: "Preço de custo do produto",
    example: 149.99,
  })
  @IsNotEmpty()
  @IsDecimal()
  costPrice: number;

  @ApiProperty({
    description: "Quantidade atual em estoque",
    example: 100,
  })
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @ApiProperty({
    description: "Unidade de medida do produto",
    example: "kg",
  })
  @IsNotEmpty()
  @IsString()
  unitOfMeasure: string;

  @ApiProperty({
    description: "Limites de estoque do produto",
    type: StockLimits,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StockLimits)
  stockLimits?: StockLimits;

  @ApiProperty({
    description: "Observações adicionais sobre o produto",
    example: "Produto com desconto especial",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: "ID do usuário associado ao produto",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // Todos os campos são opcionais
}

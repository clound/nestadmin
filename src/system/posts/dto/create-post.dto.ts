import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ description: '文章标题' })
    @IsNotEmpty({ message: '文章标题必填' })
    readonly title: string;

    @IsNotEmpty({ message: '缺少作者信息' })
    @ApiProperty({ description: '作者' })
    readonly author: string;

    @ApiPropertyOptional({ description: '内容' })
    @IsString()
    readonly content: string;

    @ApiPropertyOptional({ description: '文章封面' })
    @IsString()
    readonly cover_url: string;
}


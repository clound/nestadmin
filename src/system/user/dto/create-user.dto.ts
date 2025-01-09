import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'username', description: '用户名' })
    @IsNotEmpty({ message: '用户名不能为空' })
    @IsString({ message: '用户名必须是字符串' })
    readonly username: string;

    @ApiProperty({ example: 18 })
    @IsNotEmpty({ message: '年龄不能为空' })
    @IsNumber({}, { message: '年龄必须是数字' })
    @Min(0, { message: '年龄不能小于0' })
    @Max(120, { message: '年龄不能大于120' })
    readonly age: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: '性别不能为空' })
    @IsNumber({}, { message: '性别必须是数字' })
    @Min(0, { message: '性别值无效' })
    @Max(1, { message: '性别值无效' })
    readonly sex: number;

    @ApiProperty({ example: 'address' })
    @IsNotEmpty({ message: '地址不能为空' })
    @IsString({ message: '地址必须是字符串' })
    readonly address: string;
}
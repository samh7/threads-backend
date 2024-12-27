import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        name: "password",
        description: "User's password",
        example: "password"
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}

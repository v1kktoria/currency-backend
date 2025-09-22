import { Expose } from "class-transformer";

export class UserDto {
    @Expose({ name: "base_currency" })
    base_currency!: string;

    @Expose()
    favorites!: string[];
}
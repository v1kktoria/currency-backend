import { Expose } from "class-transformer";

export class UserDto {
    @Expose({ name: "base_currency" })
      base_currency!: string;

    @Expose()
      favorites!: string[];

    @Expose({ name: "created_at" })
      created_at!: Date;

    @Expose({ name: "updated_at" })
      updated_at!: Date;
}
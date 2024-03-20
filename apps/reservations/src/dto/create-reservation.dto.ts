import { Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator'
import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
  //@IsDate()
  @Type(() => Date)
  startDate: Date;

  //@IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}

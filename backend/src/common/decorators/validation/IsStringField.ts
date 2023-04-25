import { IsOptional, IsString } from 'class-validator';
import { OptionInterface } from './decorators.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function IsStringField(options: OptionInterface) {
  const decoratorsToApply = [];

  decoratorsToApply.push(
    IsString({
      message: options.message || 'must be a string',
    }),
  );

  if (options.required) {
    decoratorsToApply.push(
      ApiProperty({
        description: options.description,
      }),
    );
  } else {
    decoratorsToApply.push(
      ApiPropertyOptional({
        description: options.description,
      }),
      IsOptional(),
    );
  }

  return applyDecorators(...decoratorsToApply);
}

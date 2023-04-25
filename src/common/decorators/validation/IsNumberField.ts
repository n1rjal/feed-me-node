import { IsOptional, Max, Min } from 'class-validator';
import { OptionInterface } from './decorators.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

interface NumberFieldOptionInterface extends OptionInterface {
  min?: number;
  max?: number;
}

export function IsNumberField(options: NumberFieldOptionInterface) {
  const decoratorsToApply = [];

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

  if (options.max) {
    decoratorsToApply.push(
      Max(options.max, {
        message: `Maximum allowed value is ${options.max}`,
      }),
    );
  }

  if (options.min) {
    decoratorsToApply.push(
      Min(options.min, {
        message: `Minimum allowed value is ${options.min}`,
      }),
    );
  }

  return applyDecorators(...decoratorsToApply);
}

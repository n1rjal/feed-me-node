import { applyDecorators } from '@nestjs/common';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface OptionInterface {
  required: boolean;
  description?: string;
  message?: string;
}

/**
 * The function applies decorators to validate and describe an enum field in TypeScript.
 * @param {T} enumObj - The enum object that contains the possible values for the field.
 * @param {OptionInterface} options - The `options` parameter is an object that contains additional
 * configuration options for the `IsEnumField` function. It has the following properties:
 * @returns A set of decorators that can be applied to a class property to validate that it is one of
 * the values in the provided enum object. The returned decorators include `IsEnum` from the
 * `class-validator` library, as well as `ApiProperty` and `ApiPropertyOptional` from the
 * `@nestjs/swagger` library, depending on whether the field is required or optional.
 */
export function IsEnumField<T extends object>(
  enumObj: T,
  options: OptionInterface,
) {
  const defaultMessage = `must be a one of these values: ${Object.values(
    enumObj,
  )}`;
  const decoratorsToApply = [
    IsEnum(enumObj, {
      message: options.message || defaultMessage,
    }),
  ];

  if (options.required) {
    decoratorsToApply.push(
      ApiProperty({
        enum: enumObj,
        description: options.description,
      }),
    );
  } else {
    decoratorsToApply.push(
      ApiPropertyOptional({
        enum: enumObj,
        description: options.description,
      }),
      IsOptional(),
    );
  }

  return applyDecorators(...decoratorsToApply);
}

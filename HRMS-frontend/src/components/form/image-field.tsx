import { AcceptedImageMimeTypes } from '@/lib/constants';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import NextImageWithFallback from '../NextImageWithFallback';
import { buttonVariants } from '../ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type ComponentProps<T extends FieldValues> = {
  name: Path<T>;
  title: string;
  control: Control<T>;
};

const ImageField = <T extends FieldValues>({ control, name, title }: ComponentProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // explicitly tell TS what this field value is
        const value = field.value as File | string | undefined;

        return (
          <Field className='w-fit'>
            <FieldLabel>{title}</FieldLabel>
            <FieldContent>
              <div className='space-y-2'>
                {value && (
                  <div>
                    <NextImageWithFallback
                      src={value instanceof File ? URL.createObjectURL(value) : value}
                      alt='Image'
                      width={200}
                      height={200}
                      className='rounded-md object-cover border'
                    />
                  </div>
                )}
                <div className='flex gap-2 items-center'>
                  <Label className={buttonVariants()} htmlFor={name}>
                    Upload
                  </Label>
                  <Input
                    id={name}
                    className='hidden'
                    accept={AcceptedImageMimeTypes.join(', ')}
                    type='file'
                    onChange={e => {
                      const file = e.target.files?.[0];
                      e.target.value = '';
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </div>
              </div>
            </FieldContent>
            {fieldState?.invalid && (
              <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
            )}
          </Field>
        );
      }}
    />
  );
};

export default ImageField;

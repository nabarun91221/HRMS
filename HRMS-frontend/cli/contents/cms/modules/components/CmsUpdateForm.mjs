export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
'use client';
import ImageField from '@/components/form/image-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { imageSchema, stringSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { T${pascalCaseName}Schema } from '../schema';

type TComponentProps = {
  onSubmit: (values: ${camelCaseName}FormSchemaType) => void;
  initialData?: T${pascalCaseName}Schema['${pascalCaseName}Response'];
  isSubmitting: boolean;
};

const ${camelCaseName}FormSchema = z.object({
  image: z.union([imageSchema, z.string()], { error: 'Image is required' }),
  name: stringSchema('Name'),
});

export type ${camelCaseName}FormSchemaType = z.infer<typeof ${camelCaseName}FormSchema>;

const ${pascalCaseName}CmsUpdateForm = ({ onSubmit, isSubmitting, initialData }: TComponentProps) => {
  const form = useForm<${camelCaseName}FormSchemaType>({
    resolver: zodResolver(${camelCaseName}FormSchema),
    defaultValues: {
      name: '',
      ...initialData,
    },
  });

  const { handleSubmit, control, reset } = form;

  const handleReset = () => {
    reset();
  };

  return (
      <Card>
        <CardContent className='space-y-4 max-w-[500px]'>
          <FieldGroup>
            <ImageField
              control={control}
              name='image'
              title='Image'
            />
            <Controller
              control={control}
              name='name'
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder='Enter Name' {...field} />
                  {fieldState?.invalid && (
                    <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='flex gap-2'>
          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting && <Spinner />}
            Submit
          </Button>

          <Button variant={'outline'} disabled={isSubmitting} onClick={handleReset}>
            Reset
          </Button>
        </CardFooter>
      </Card>
  );
};

export default ${pascalCaseName}CmsUpdateForm;


        `;
};

export default page;

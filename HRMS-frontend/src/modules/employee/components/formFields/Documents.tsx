import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldError, FieldGroup } from '@/components/ui/field';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { AcceptedAllFileTypesMimeTypes } from '@/lib/constants';
import { useUploadFile } from '@/modules/fileHandle/hooks';
import { fileSchema } from '@/utils/zod';
import { Icon } from '@iconify-icon/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { employeeFormSchemaType } from '../EmployeeCreateUpdateForm';

const Documents = () => {
  const { control } = useFormContext<employeeFormSchemaType>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'documents',
  });

  const { mutate: uploadFile, isPending } = useUploadFile();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = fileSchema('document').safeParse(file);
      if (!result.success) {
        toast.error(result.error.issues?.[0].message);
        return;
      }

      uploadFile(
        { pdf: file },
        {
          onSuccess: data => {
            append({
              name: data.name,
              fileUrl: data.fileUrl,
              publicId: data.publicId,
            });
          },
          onError: () => {
            toast.error('Error uploading file');
          },
        }
      );
    }

    e.target.value = '';
  };

  // const onRemoveClick = (id: string, index: number) => {
  //   deleteFile(id, {
  //     onSuccess: () => {
  //       remove(index);
  //     },
  //     onError: () => {
  //       toast.error('Error deleting file');
  //     },
  //   });
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name='documents'
            render={({ fieldState }) => (
              <Field>
                <FieldContent>
                  {fields.length ? (
                    fields.map((field, index) => (
                      <Item variant='outline' key={field.id}>
                        <ItemMedia variant='icon'>
                          <Icon icon={'lucide:file'} />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{field.name}</ItemTitle>
                        </ItemContent>
                        <ItemActions>
                          <Button variant='ghost' size='icon' onClick={() => remove(index)}>
                            <Icon icon={'lucide:trash'} />
                          </Button>
                        </ItemActions>
                      </Item>
                    ))
                  ) : (
                    <p className='text-sm text-muted-foreground'>No documents</p>
                  )}
                </FieldContent>
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Label
          className={`${buttonVariants()} ${isPending ? 'cursor-not-allowed pointer-events-none opacity-50' : ''}`}
          htmlFor='documents'
        >
          {isPending && <Spinner />}
          Upload
        </Label>
        <Input
          id='documents'
          accept={AcceptedAllFileTypesMimeTypes.join(', ')}
          type='file'
          hidden
          onChange={onFileChange}
        />
      </CardFooter>
    </Card>
  );
};

export default Documents;

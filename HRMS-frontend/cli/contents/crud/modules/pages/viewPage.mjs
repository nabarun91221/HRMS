export const page = ({ camelCaseName, pascalCaseName, normalCaseName }) => {
  return `
  
'use client';

import Loading from '@/components/Loading';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import NextImageWithFallback from '@/components/NextImageWithFallback';
import PageHeader from '@/components/page-header';
import ViewValue from '@/components/view-value';
import { mediaUrl2 } from '@/lib/utils';
import { Icon } from '@iconify-icon/react';
import { useParams, useRouter } from 'next/navigation';
import { useGet${pascalCaseName} } from '../hooks';

const ${pascalCaseName}ViewPage = () => {
  const params = useParams();

  const router = useRouter();

  const id = params?.id as string;

  const { data, isLoading } = useGet${pascalCaseName}(id);

  const ${camelCaseName}Details = data && data?.data;

  if (isLoading) return <Loading />;

  if (!${camelCaseName}Details) {
    return (
      <div className='h-full w-full gap-2 flex justify-center items-center'>
        <Icon icon={'lucide:alert-circle'} className='text-2xl text-red-500' />
        ${normalCaseName} not found
      </div>
    );
  }


  return (
    <div className='space-y-4 @container'>
      <div>
        <PageHeader
          title={'${normalCaseName} Details'}
          backButton={true}
          onBackClick={() => router.back()}
        />
      </div>

      <Card>
        <CardContent>
            <div className='grid gap-4  grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 w-full'>
              <div className='space-y-2 col-span-3'>
                <Label>Image</Label>
                <NextImageWithFallback
                  width={200}
                  height={200}
                  alt=''
                  src={mediaUrl2(${camelCaseName}Details?.image)}
                />
              </div>
              <div className='space-y-2 col-span-1'>
                <Label>Name</Label>
                <ViewValue value={${camelCaseName}Details?.name} />
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ${pascalCaseName}ViewPage;

        `;
};

export default page;

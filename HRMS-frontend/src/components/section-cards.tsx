import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SectionCards({
  cards,
}: {
  cards: {
    title: string;
    value: string | number;
  }[];
}) {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {cards?.map((card, index) => (
        <Card key={index} className='@container/card'>
          <CardHeader>
            <CardDescription>{card?.title}</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {card?.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

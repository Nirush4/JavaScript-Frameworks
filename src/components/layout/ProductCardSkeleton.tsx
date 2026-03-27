import { Skeleton } from '@mantine/core';

export default function ProductCardSkeleton({ type }: { type?: 'input' }) {
  if (type === 'input') {
    return <Skeleton height={32} radius='sm' />;
  }

  return (
    <div className='space-y-3'>
      <Skeleton height={220} radius='md' />
      <Skeleton height={16} width='70%' />
      <Skeleton height={14} width='90%' />
      <Skeleton height={16} width='40%' />
    </div>
  );
}

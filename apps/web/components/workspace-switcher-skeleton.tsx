import { Skeleton } from '@repo/ui/components/ui/skeleton';
import React from 'react';

const WorkspaceSwitcherSkeleton: React.FC = () => {
    return (
        <div className='flex items-center gap-1'>
            <Skeleton className="w-[20px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[16px] rounded-full" />
        </div>
    );
};

export default WorkspaceSwitcherSkeleton;

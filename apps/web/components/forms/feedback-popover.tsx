import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { Textarea } from '@repo/ui/components/ui/textarea';
import React from 'react';
import { Icons } from '../icons';
import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/ui/button';

const FeedbackPopover: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => {
    return (
        <Popover {...props}>
            <PopoverTrigger className={className}>Feedback</PopoverTrigger>
            <PopoverContent className={cn(className, "p-0")}>
                <div className='p-2'>
                    <Textarea className='focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xs ' placeholder="Your feedback..." />
                    <div className='flex justify-end mt-2 text-xs items-center gap-1'>
                        <Icons.markdown className="mr-2 h-4 w-4" />supported.
                    </div>
                </div>
                <div className='flex justify-between border-t p-2 items-center'>
                    <div className='flex gap-2'>
                        <Icons.starsmile className="mr-2 h-4 w-4" />
                        <Icons.smile className="mr-2 h-4 w-4" />
                        <Icons.sad className="mr-2 h-4 w-4" />
                        <Icons.cry className="mr-2 h-4 w-4" />
                    </div>
                    <Button size={'xs'} className='font-light'>Send</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default FeedbackPopover;

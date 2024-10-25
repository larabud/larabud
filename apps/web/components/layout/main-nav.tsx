import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import WorkspaceSwitcher from "../workspace-switcher";
import { getSession } from "@/lib/session";

export async function MainNav({
    className,
    position = 'left',
    ...props
}: React.HTMLAttributes<HTMLElement> & { position?: 'left' | 'right' }) {
    const session = await getSession();
    const isLeftPosition = position === 'left';

    return (
        <nav
            className={cn("flex items-center space-x-2 lg:space-x-2", className)}
            {...props}
        >
            {isLeftPosition
                ? (session && session.user ?
                    <WorkspaceSwitcher />
                    : (
                        <>
                            <Link
                                href="/examples/dashboard"
                                className="text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary"
                            >
                                Docs
                            </Link>
                            <Link
                                href="/examples/dashboard"
                                className="text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary"
                            >
                                Feedback
                            </Link>
                            <Link
                                href="/examples/dashboard"
                                className="text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary"
                            >
                                Support
                            </Link>
                        </>
                    ))
                : (session && session?.user &&
                    (
                        <>
                            <Link
                                href="/examples/dashboard"
                                className="text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary"
                            >
                                Docs
                            </Link>
                            <Link
                                href="/examples/dashboard"
                                className="text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary"
                            >
                                Feedback
                            </Link>
                            <Link
                                href="/examples/dashboard"
                                className="text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary"
                            >
                                Support
                            </Link>
                        </>
                    ))}
        </nav>
    );
}

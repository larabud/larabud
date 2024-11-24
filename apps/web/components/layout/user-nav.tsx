"use client"
import { Session } from "@/lib/definitions"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { ModeToggle } from "@repo/ui/components/ui/mode-toggle"
import SubmitButton from "../ui/submit-button"
import { logout } from "@/app/[app]/(auth)/actions"
import { useFormState } from "react-dom"
import { revalidatePath } from 'next/cache'

export function UserNav({ session }: { session: Session }) {
    const [state, action, pending] = useFormState(logout, undefined)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={"/avatar.jpeg"} alt={"@"} />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            example@email.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <ModeToggle hasSession={true} />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <form action={action}>
                    <DropdownMenuItem asChild>
                        <SubmitButton size="sm" variant="ghost">
                            Logout
                            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                        </SubmitButton>
                    </DropdownMenuItem>
                </form>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
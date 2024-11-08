"use client"
import { Sun, Moon, Computer } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function ModeToggle({ hasSession }: { hasSession: boolean }) {
    const { theme, setTheme } = useTheme()
    const [selectedTheme, setSelectedTheme] = useState<string>(theme || 'system')

    useEffect(() => {
        setTheme(selectedTheme)
    }, [selectedTheme, setTheme])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTheme(event.target.value as string)
    }

    return (
        <div className={`relative flex cursor-default select-none justify-between items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors`}>
            {hasSession && <p>Theme</p>}
            <div className={`flex items-center border rounded-full`}>
                <input
                    type="radio"
                    id="light"
                    name="theme"
                    value="light"
                    checked={selectedTheme === "light"}
                    onChange={handleChange}
                    className="hidden"
                />
                <label
                    htmlFor="light"
                    className={`flex-1 cursor-pointer rounded-full p-1 transition-all 
                        ${selectedTheme === 'light' ? 'border' : 'bg-transparent'}`}
                >
                    <Sun className={`h-4 w-4`} />
                </label>

                <input
                    type="radio"
                    id="dark"
                    name="theme"
                    value="dark"
                    checked={selectedTheme === "dark"}
                    onChange={handleChange}
                    className="hidden"
                />
                <label
                    htmlFor="dark"
                    className={`flex-1 cursor-pointer rounded-full p-1 transition-all 
                        ${selectedTheme === 'dark' ? 'border' : 'bg-transparent'}`}
                >
                    <Moon className={`h-4 w-4 `} />
                </label>

                <input
                    type="radio"
                    id="system"
                    name="theme"
                    value="system"
                    checked={selectedTheme === "system"}
                    onChange={handleChange}
                    className="hidden"
                />
                <label
                    htmlFor="system"
                    className={`flex-1 cursor-pointer rounded-full p-1 transition-all 
                        ${selectedTheme === 'system' ? 'border' : 'bg-transparent'}`}
                >
                    <Computer className={`h-4 w-4 `} />
                </label>
            </div>
        </div>
    )
}

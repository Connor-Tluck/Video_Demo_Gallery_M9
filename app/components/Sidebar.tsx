import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  onMenuClick: () => void
}

export default function Sidebar({ onMenuClick }: SidebarProps) {
  return (
    <div className="w-16 bg-[#101112] border-r border-[#101112] h-full flex flex-col items-center py-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-6 w-6 text-white" />
        <span className="sr-only">Open menu</span>
      </Button>
    </div>
  )
}

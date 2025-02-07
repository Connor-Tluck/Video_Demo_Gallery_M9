"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { Badge } from "@/components/ui/badge"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  keywords: string[]
  videoSrc: string
}

interface VideoGridModalProps {
  isOpen: boolean
  onClose: () => void
  videos: Video[]
  onVideoSelect: (video: Video) => void
}

export default function VideoGridModal({
  isOpen,
  onClose,
  videos,
  onVideoSelect,
}: VideoGridModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVideos = videos.filter((video) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      video.title.toLowerCase().includes(searchLower) ||
      video.description.toLowerCase().includes(searchLower) ||
      video.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchLower)
      )
    )
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[80%] h-[80vh] p-0 bg-[#101112] border border-[#27272a] flex flex-col"
        aria-describedby="modal-description"
      >
        <VisuallyHidden>
          <DialogTitle>Video Gallery</DialogTitle>
        </VisuallyHidden>

        <div id="modal-description" className="sr-only">
          This modal contains a searchable grid of videos. Use the search bar to
          filter videos by title, description, or keywords. Click on a video to
          select it.
        </div>

        {/* Header with Logo & Search */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-[#27272a] bg-[#101112] h-16">
          <div className="flex items-center">
            <img
              src="Mach9_White.png"
              alt="Mach9 Logo"
              className="h-10 object-contain"
            />
          </div>
          <Input
            type="search"
            placeholder="Search videos by title, description, or keywords..."
            className="
              max-w-sm
              bg-[#1a1b1c]
              text-gray-200
              placeholder-gray-400
              border
              border-[#2a2a2b]
              focus:border-[#aeb6bf]
              focus:ring-0
              focus:outline-none
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Video Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="cursor-pointer bg-[#1a1b1c] border border-[#27272a] 
                           rounded-lg p-4 hover:shadow-md transition-shadow"
                onClick={() => onVideoSelect(video)}
              >
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="font-semibold text-gray-100 mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {video.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {video.keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-[#2a2a2b] text-gray-200 border-none"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import VideoPlayer from "./components/VideoPlayer"
import VideoGridModal from "./components/VideoGridModal"

// Updated video data structure with MP4 links
const videos = [
  {
    id: 1,
    title: "TopoDot",
    description: "TopoDot",
    thumbnail: "/placeholder.svg?height=180&width=320",
    keywords: ["AI", "ML", "data science", "algorithms"],
    videoSrc: "/videos/topo_volume.mp4"
  },
  {
    id: 2,
    title: "Mach9 Geoweek Overview Video",
    description: "Mach9 Geoweek Overview Video",
    thumbnail: "/placeholder.svg?height=180&width=320",
    keywords: ["programming", "algorithms", "computer science", "efficiency"],
    videoSrc: "/videos/Geoweek_2025_Booth.mp4", // Add the actual path to your MP4 file
  },
  {
    id: 3,
    title: "Cloud Computing Fundamentals",
    description: "Understanding the basics of cloud computing and its benefits",
    thumbnail: "/placeholder.svg?height=180&width=320",
    keywords: ["cloud", "AWS", "Azure", "scalability"],
    videoSrc: "/videos/cloud-computing-fundamentals.mp4", // Add the actual path to your MP4 file
  },
  {
    id: 4,
    title: "Cybersecurity Best Practices",
    description: "Essential security measures for protecting digital assets",
    thumbnail: "/placeholder.svg?height=180&width=320",
    keywords: ["security", "encryption", "network", "threats"],
    videoSrc: "/videos/cybersecurity-best-practices.mp4", // Add the actual path to your MP4 file
  },
  {
    id: 5,
    title: "Blockchain Technology Explained",
    description: "Comprehensive guide to understanding blockchain and its applications",
    thumbnail: "/placeholder.svg?height=180&width=320",
    keywords: ["blockchain", "cryptocurrency", "decentralization", "smart contracts"],
    videoSrc: "/videos/blockchain-technology-explained.mp4", // Add the actual path to your MP4 file
  },
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(videos[0])

  return (
    <div className="flex h-screen bg-white">
      <Sidebar onMenuClick={() => setIsModalOpen(true)} />
      <main className="flex-1 bg-white overflow-hidden">
        <VideoPlayer video={currentVideo} />
      </main>
      <VideoGridModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videos={videos}
        onVideoSelect={(video) => {
          setCurrentVideo(video)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}


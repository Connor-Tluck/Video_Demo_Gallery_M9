"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import VideoPlayer from "./components/VideoPlayer"
import VideoGridModal from "./components/VideoGridModal"

const videos = [
  // Keep IDs 1 and 2 as-is
  {
    id: 1,
    title: "Mach9 Geoweek 2025",
    description: "Mach9 Geoweek",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Geoweek"],
    videoSrc: "/videos/Geoweek_Booth_Video.mp4",
  },
  {
    id: 2,
    title: "Mach9 Geoweek 2024",
    description: "Mach9 Geoweek 2024",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Geoweek"],
    videoSrc: "/videos/Geoweek_Digital_Surveyor_2024.mov",
  },

  // NEW videos (IDs 3–11)
  {
    id: 3,
    title: "ADA Ramps",
    description: "Coverage and demonstration of ADA Ramps in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "ADA", "Ramps", "Surveying", "Feature Extraction"],
    videoSrc: "/videos/ADA Ramps.mkv",
  },
  {
    id: 4,
    title: "Linear workflow walkthrough",
    description: "Walkthrough of a linear workflow using Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Linear", "Workflow", "Guide", "Feature Extraction"],
    videoSrc: "/videos/Linear workflow walkthrough.mp4",
  },
  {
    id: 5,
    title: "Objects Workflow Walkthrough",
    description: "Detailed demonstration of an objects-based workflow in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Objects", "Workflow", "Tutorial", "Point Features"],
    videoSrc: "/videos/Objects Workflow Walkthrough.mp4",
  },
  {
    id: 6,
    title: "Point of Attachment",
    description: "Point of Attachment demo in Mach9. (No audio track)",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Attachment", "Pole", "Utility", "Feature"],
    videoSrc: "/videos/Point_of_Attachement.mkv",
  },
  {
    id: 7,
    title: "Signs Demo v1",
    description: "First version of the signs demonstration using Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Signs", "Demo", "Feature Extraction", "Survey"],
    videoSrc: "/videos/Signs Demo v1.mkv",
  },
  {
    id: 8,
    title: "Signs Demo v2",
    description: "Second iteration of the signs demo in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Signs", "Demo", "Feature Extraction", "Survey"],
    videoSrc: "/videos/Signs Demo v2.mkv",
  },
  {
    id: 9,
    title: "Surveying (Linear)",
    description: "Surveying demonstration with linear data in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Surveying", "Linear", "Feature Extraction"],
    videoSrc: "/videos/Surveying (Linear).mkv",
  },
  {
    id: 10,
    title: "Transportation (Objects and Linear)",
    description: "Transportation project featuring objects and linear workflows in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Transportation", "Objects", "Linear", "Survey", "Workflow"],
    videoSrc: "/videos/Transportation (Objects and Linear).mkv",
  },
  {
    id: 11,
    title: "Utilities Demo",
    description: "Utilities demonstration in Mach9, showcasing utility workflows.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Utilities", "Demo", "Power Lines", "Poles", "Feature Extraction"],
    videoSrc: "/videos/Utilities Demo.mkv",
  },

  // PREVIOUS items (IDs 3–12) now shifted to IDs 12–21, with removed "lidar," "engineering," "silent"
  {
    id: 12,
    title: "Video Project 12 - Editing an Object Feature",
    description: "How to edit object features in Mach9 for better data management.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Object Editing", "Features", "Guide", "Vectors"],
    videoSrc: "/videos/Video Project 12-Editing an Object Feature.mp4",
  },
  {
    id: 13,
    title: "Video Project 13 - RIEGL File Export",
    description: "Guide to exporting RIEGL files using Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "RIEGL", "File Export", "Workflow", "Survey"],
    videoSrc: "/videos/Video Project 13-RIEGL File Export.mp4",
  },
  {
    id: 14,
    title: "Video Project 14 - Feature Filters",
    description: "Demonstration of Feature Filters in Mach9 for improved data analysis.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Feature Filters", "Data Analysis", "Survey", "Workflow"],
    videoSrc: "/videos/Video Project 14-Feature Filters.mp4",
  },
  {
    id: 15,
    title: "Video Project 15 - Manually Adding Objects",
    description: "Tutorial on manually adding objects within Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Objects", "Tutorial", "Point Features", "Workflow"],
    videoSrc: "/videos/Video Project 15-Manually Adding Objects.mp4",
  },
  {
    id: 16,
    title: "Video Project 16 - Trajectory Viewing Options",
    description: "How to visualize and manage trajectory viewing options in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Trajectory", "Visualization", "Surveying", "Workflow"],
    videoSrc: "/videos/Video Project 16-Trajectory Viewing Options.mp4",
  },
  {
    id: 17,
    title: "Video Project 17 - FireHydrant&UtilityPedastal",
    description: "Demonstration on handling Fire Hydrants & Utility Pedestals in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Fire Hydrant", "Utility Pedestal", "Infrastructure", "Workflow", "Demo"],
    videoSrc: "/videos/Video Project 17-FireHydrant&UtilityPedastal.mp4",
  },
  {
    id: 18,
    title: "Video Project 18 - rightclickobjects",
    description: "Instructions on how to use the right-click menu for objects in Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Context Menu", "Objects", "Editing", "Feature Extraction", "Tutorial"],
    videoSrc: "/videos/Video Project 18-rightclickobjects.mp4",
  },
  {
    id: 19,
    title: "Video Project 19 - Holding Shift",
    description: "Demonstration of the 'Holding Shift' feature in Mach9 software.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Shift", "Shortcuts", "Editing", "Workflow", "Survey"],
    videoSrc: "/videos/Video Project 19-Holding Shift.mp4",
  },
  {
    id: 20,
    title: "Video Project 20 - QuickImageView",
    description: "Overview of the QuickImageView functionality in Mach9 software.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "QuickImageView", "Tutorial", "Survey", "Workflow"],
    videoSrc: "/videos/Video Project 20-QuickImageView.mp4",
  },
  {
    id: 21,
    title: "Viewing Datasets walkthrough Video",
    description: "Step-by-step guide on how to view datasets using Mach9.",
    thumbnail: "Mach9_Black.png",
    keywords: ["Mach9", "Datasets", "Walkthrough", "Survey", "Demo"],
    videoSrc: "/videos/Viewing Datasets walkthrough Video.mp4",
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

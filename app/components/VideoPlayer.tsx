"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  videoSrc: string
}

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true) // start in "playing" state
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(true) // start muted for autoplay

  // Controls fade state
  const [showControls, setShowControls] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  // Whenever the video changes, reset to the start and attempt to autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {
        // Some browsers block autoplay if not muted
      })
      setIsPlaying(true)
    }
  }, [video])

  // Show controls immediately when video is paused.
  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    } else {
      // If video is playing, start our fade-out timer after mouse stops moving
      resetControlsFade()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const togglePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (newTime: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime[0]
      setCurrentTime(newTime[0])
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    if (!videoRef.current) return
    videoRef.current.volume = newVolume[0]
    setVolume(newVolume[0])
    // If slider is at 0, consider that "muted"
    setIsMuted(newVolume[0] === 0)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const willMute = !isMuted
    videoRef.current.muted = willMute
    setIsMuted(willMute)
    // If unmuting, restore to last known volume
    if (!willMute) {
      videoRef.current.volume = volume
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  /**
   * Shows controls and sets a timer to fade them out after 2s
   * if the video is playing. Resets timer on mouse movement.
   */
  const resetControlsFade = () => {
    if (!isPlaying) return // No fade-out if paused

    setShowControls(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 2000) // 2-second delay before hiding controls
  }

  /**
   * Handle mouse move over the video container:
   * show controls and reset fade timer.
   */
  const handleMouseMove = () => {
    resetControlsFade()
  }

  return (
    <div
      className="relative w-full h-full bg-black"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src={video.videoSrc}
        poster={video.thumbnail}
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Controls container */}
      <div
        className={`
          absolute bottom-0 left-0 right-0
          bg-gradient-to-t from-black to-transparent
          p-4
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="text-white mb-4">
          <h2 className="text-2xl font-bold">{video.title}</h2>
          <p className="text-sm">{video.description}</p>
        </div>

        {/* Scrubber */}
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
        />
        <div className="flex justify-between text-white text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Button controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime -= 10
                }
              }}
            >
              <SkipBack className="h-4 w-4 text-white" />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePlayPause}>
              {isPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime += 10
                }
              }}
            >
              <SkipForward className="h-4 w-4 text-white" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

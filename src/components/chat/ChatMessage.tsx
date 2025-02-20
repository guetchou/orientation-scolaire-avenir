
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  content: string
  isBot?: boolean
  timestamp?: string
}

export function ChatMessage({ content, isBot = false, timestamp }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex items-start gap-4 p-4",
      isBot ? "flex-row" : "flex-row-reverse"
    )}>
      <Avatar showBorder={isBot} online={isBot}>
        {isBot ? (
          <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
        ) : (
          <AvatarImage src="/user-avatar.png" alt="User" />
        )}
        <AvatarFallback>{isBot ? 'AI' : 'You'}</AvatarFallback>
      </Avatar>
      <div className={cn(
        "flex flex-col gap-1 max-w-[80%]",
        isBot ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "rounded-lg p-3",
          isBot ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
        )}>
          {content}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  )
}

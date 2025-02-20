
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "./ChatMessage"
import { Send } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  content: string
  isBot: boolean
  timestamp: string
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Bonjour ! Je suis votre assistant d'orientation. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      content: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Récupérer la clé API depuis Supabase
      const { data: { secret }, error: secretError } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', 'PERPLEXITY_API_KEY')
        .single()

      if (secretError || !secret) {
        throw new Error("Impossible de récupérer la clé API")
      }

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secret.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: "Tu es un assistant spécialisé en orientation scolaire et professionnelle au Congo. Tu dois aider les utilisateurs à trouver leur voie, comprendre les différentes filières d'études et les opportunités professionnelles disponibles. Sois précis, encourageant et adapte tes réponses au contexte congolais."
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de communication avec l'API")
      }

      const data = await response.json()
      
      const botMessage = {
        content: data.choices[0].message.content,
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant."
      })
      const errorMessage = {
        content: "Désolé, j'ai rencontré une erreur. Pouvez-vous reformuler votre question ?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-background border rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

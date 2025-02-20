
import { ChatBot } from "../chat/ChatBot"

export function ChatSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-heading font-bold text-center mb-8">
          Discutez avec notre assistant d'orientation
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Notre assistant IA est là pour répondre à vos questions sur l'orientation scolaire et professionnelle
        </p>
        <ChatBot />
      </div>
    </section>
  )
}

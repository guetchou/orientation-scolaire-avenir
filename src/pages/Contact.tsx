
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "contact@orientationprocongo.com",
      link: "mailto:contact@orientationprocongo.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Téléphone",
      value: "+242 00 000 000",
      link: "tel:+24200000000"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Adresse",
      value: "Brazzaville, République du Congo",
      link: "https://maps.google.com/?q=Brazzaville,Congo"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Horaires",
      value: "Lun-Ven: 8h-17h",
      link: "#"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="background-pattern"></div>
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-600">
              Une question sur votre orientation ? Besoin de conseils personnalisés ? Notre équipe est là pour vous aider.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full frosted-glass">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Nos informations</h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start gap-4" 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="mt-1 bg-primary/10 p-2 rounded-full">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <a 
                            href={item.link} 
                            className="text-gray-600 hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
                    <div className="flex gap-4">
                      <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                        <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                        <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                        <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                        <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full frosted-glass">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="votre@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full min-h-[150px]"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Envoi en cours..." : (
                        <>
                          <Send className="h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-8">Foire Aux Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Comment prendre rendez-vous avec un conseiller ?</h3>
                <p className="text-gray-600">
                  Vous pouvez prendre rendez-vous en ligne via notre page "Conseillers" ou en nous contactant directement par téléphone.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quels services proposez-vous aux écoles ?</h3>
                <p className="text-gray-600">
                  Nous proposons des ateliers d'orientation, des conférences et des outils d'évaluation pour les établissements scolaires.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Vos services sont-ils gratuits ?</h3>
                <p className="text-gray-600">
                  Nos tests et ressources en ligne sont gratuits. Les consultations individuelles et certains services spécialisés sont payants.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Comment devenir partenaire ?</h3>
                <p className="text-gray-600">
                  Les établissements d'enseignement et entreprises souhaitant devenir partenaires peuvent nous contacter via ce formulaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

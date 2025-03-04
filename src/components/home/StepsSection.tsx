
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, UserPlus, ClipboardList, FileText, Users } from "lucide-react";

export const StepsSection = () => {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6 text-white" />,
      title: "Inscription",
      description: "Créez votre compte gratuitement en quelques clics"
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      title: "Test RIASEC",
      description: "Passez notre test d'orientation professionnelle"
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Résultats",
      description: "Recevez une analyse détaillée de votre profil"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Accompagnement",
      description: "Bénéficiez de conseils personnalisés"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Comment ça marche
          </h2>
          <p className="text-gray-600 text-lg">
            Notre processus simple et efficace pour vous aider à trouver votre voie professionnelle
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full relative z-10 hover:translate-y-[-5px]">
                <div className="relative mb-6">
                  <div className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl opacity-10 blur-md"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mb-4 relative">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[75%] w-full h-[2px] bg-gradient-to-r from-primary/40 to-transparent" />
                  )}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="/register" className="inline-flex items-center text-primary font-medium hover:underline gap-1 group">
            Prêt à commencer votre parcours 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

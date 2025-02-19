
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Building2, Award } from "lucide-react";

export const StatisticsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      value: "5000+",
      label: "Utilisateurs",
      description: "Étudiants et professionnels accompagnés"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      value: "150+",
      label: "Établissements",
      description: "Partenaires de formation"
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      value: "300+",
      label: "Entreprises",
      description: "Recruteurs partenaires"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      value: "95%",
      label: "Satisfaction",
      description: "Des utilisateurs recommandent nos services"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            L'Orientation Pro Congo en chiffres
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des résultats concrets qui témoignent de notre engagement pour votre réussite professionnelle
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="font-semibold text-gray-800 mb-2">{stat.label}</p>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

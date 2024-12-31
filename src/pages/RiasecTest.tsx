import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { questions } from "@/data/riasecQuestions";

const RiasecTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleTestCompletion(newAnswers);
    }
  };

  const handleTestCompletion = async (finalAnswers: number[]) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Vous devez être connecté pour sauvegarder vos résultats");
        return;
      }

      const results = calculateRiasecResults(finalAnswers);
      
      const { error } = await supabase
        .from('test_results')
        .insert([{
          user_id: user.id,
          test_type: 'RIASEC',
          results,
          answers: finalAnswers
        }]);

      if (error) {
        console.error("Error saving test results:", error);
        throw error;
      }

      toast.success("Test complété avec succès !");
      navigate("/dashboard/results");
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde des résultats:", error);
      toast.error("Erreur lors de la sauvegarde des résultats");
    } finally {
      setLoading(false);
    }
  };

  const calculateRiasecResults = (finalAnswers: number[]) => {
    const categories = ['R', 'I', 'A', 'S', 'E', 'C'];
    const results: Record<string, number> = {};
    
    categories.forEach((category, index) => {
      const categoryScores = finalAnswers.filter((_, i) => i % 6 === index);
      results[category] = categoryScores.reduce((sum, score) => sum + score, 0);
    });

    return results;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold text-center mb-2">
              Test d'orientation RIASEC
            </h1>
            <p className="text-gray-600 text-center">
              Question {currentQuestion + 1} sur {questions.length}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-center mb-8">
              {questions[currentQuestion].question}
            </p>

            <div className="grid gap-3">
              {[1, 2, 3, 4, 5].map((score) => (
                <Button
                  key={score}
                  onClick={() => handleAnswer(score)}
                  variant={score === 5 ? "default" : "outline"}
                  className="w-full py-6"
                  disabled={loading}
                >
                  {score === 1 && "Pas du tout"}
                  {score === 2 && "Un peu"}
                  {score === 3 && "Moyennement"}
                  {score === 4 && "Beaucoup"}
                  {score === 5 && "Passionnément"}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RiasecTest;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResultsNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg border-0">
        <CardContent className="text-center p-8">
          <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
          <p className="text-gray-600 mb-4">Nous n'avons pas pu trouver les résultats du test demandé.</p>
          <Button onClick={() => navigate('/tests')} variant="outline">
            Voir tous les tests
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsNotFound;

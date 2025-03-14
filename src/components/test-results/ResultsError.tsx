
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ResultsErrorProps {
  error: string;
}

const ResultsError = ({ error }: ResultsErrorProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg border-0 border-red-200">
        <CardContent className="text-center p-8">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Retour au tableau de bord
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsError;

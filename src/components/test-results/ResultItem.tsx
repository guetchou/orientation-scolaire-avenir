
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ClipboardCopy, Lock } from "lucide-react";
import { toast } from "sonner";

interface ResultItemProps {
  itemKey: string;
  value: any;
  index: number;
  hasPaid: boolean;
}

const ResultItem = ({ itemKey, value, index, hasPaid }: ResultItemProps) => {
  const getBadgeColor = (score: number): string => {
    if (score >= 80) return "text-green-700 bg-green-100 border-green-300";
    if (score >= 60) return "text-blue-700 bg-blue-100 border-blue-300";
    if (score >= 40) return "text-yellow-700 bg-yellow-100 border-yellow-300";
    return "text-red-700 bg-red-100 border-red-300";
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <div className={`space-y-2 relative ${!hasPaid && index > 1 ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize">{itemKey.replace(/_/g, ' ')}</h3>
        <Badge className={getBadgeColor(value.score)} variant="outline">
          {value.score}%
        </Badge>
      </div>
      <Progress value={value.score} />
      <p className="text-sm text-gray-500">
        {hasPaid || index <= 1 
          ? value.description 
          : index === 2 
            ? value.description.substring(0, 100) + '...' 
            : '••••••••••••••••••••••••••••••••••'}
      </p>
      {value.details && hasPaid && (
        <div className="mt-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => copyToClipboard(value.details, "Détails copiés!")}
          >
            <ClipboardCopy className="h-4 w-4 mr-2" />
            Afficher les détails
          </Button>
        </div>
      )}
      {!hasPaid && index > 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="h-6 w-6 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ResultItem;

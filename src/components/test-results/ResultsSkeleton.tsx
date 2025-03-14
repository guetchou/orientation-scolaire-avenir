
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ResultsSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-2/4 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSkeleton;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  avatar?: string;
  experience: string;
  rating: number;
  availableSlots: number;
  description: string;
}

interface CounselorCardProps {
  counselor: Counselor;
}

export const CounselorCard = ({ counselor }: CounselorCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={counselor.avatar} alt={counselor.name} />
            <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">{counselor.name}</CardTitle>
            <CardDescription className="text-sm mb-2">{counselor.title}</CardDescription>
            <div className="flex flex-wrap gap-2">
              {counselor.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{counselor.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Expérience</span>
          <span className="font-medium">{counselor.experience}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Note moyenne</span>
          <div className="flex items-center">
            <span className="font-medium mr-1">{counselor.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(counselor.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link to={`/appointment/${counselor.id}`}>
            <Button className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Prendre RDV ({counselor.availableSlots} créneaux)
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

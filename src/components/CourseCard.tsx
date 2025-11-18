import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  duration: string;
  level: string;
  studentCount: string;
}

const CourseCard = ({
  id,
  title,
  description,
  thumbnail,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  level,
  studentCount,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift group">
      <Link to={`/courses/${id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            {level}
          </Badge>
        </div>
      </Link>
      
      <div className="p-5 space-y-4">
        <div>
          <Link to={`/courses/${id}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">{rating}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{studentCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
          <Button asChild>
            <Link to={`/courses/${id}`}>Enroll</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;

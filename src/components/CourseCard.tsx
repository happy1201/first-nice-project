import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleEnroll = async(price: number, itemName: string) => {
    console.log("Enroll clicked for course ID:", id);

    try {
      console.log("Creating order for course ID:", id);

      // Create order on the backend
      const options = {
        course_id :1,
        amount: 1, // Amount in paise
      };  
      const orderCreationResponse = await axios.post("http://localhost:9091/create-order", options);
      const order = orderCreationResponse.data;
      console.log("Order created:", order);

      // Initialize Razorpay payment
      console.log("Initializing Razorpay payment");
      const paymentObject =  new (window as any).Razorpay({
        key: "rzp_test_Ri4Y66ALtKZCcF", // Your Razorpay Key ID
        order_id: order.id,
        ...order,
        handler: function (response: any) {
          console.log("Payment successful:", response);
          const options = {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          axios.post("http://localhost:9091/verify-payment", options)
            .then((res) => {
              console.log("Payment verified:", res.data);
              if(res.data.success === true)
              navigate("/payment-success");
            })
            .catch((err) => {
              console.error("Payment verification failed:", err);
              navigate("/payment-failed");
            }).catch((err) => {
              console.error("Payment verification failed:", err);
              navigate("/payment-failed");
            });
        }
      });
      paymentObject.open();
    } catch (err) {
      alert("Error in payment: " + err);
      console.error("Error during enrollment:", err);
    }
  };


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
          <Button onClick={handleEnroll}>Enroll Now</Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;

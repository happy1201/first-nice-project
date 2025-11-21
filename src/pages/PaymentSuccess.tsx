import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, ArrowRight } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");
  const amount = searchParams.get("amount");

  useEffect(() => {
    // Track successful payment
    if (window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: orderId,
        value: amount ? parseFloat(amount) / 100 : 0,
        currency: "INR",
        payment_method: "razorpay",
      });
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq("track", "Purchase", {
        value: amount ? parseFloat(amount) / 100 : 0,
        currency: "INR",
      });
    }
  }, [orderId, amount]);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 lg:p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-accent" />
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Payment Successful!
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your enrollment has been confirmed and you'll receive a confirmation email shortly.
              </p>

              {orderId && (
                <div className="bg-muted/50 rounded-lg p-4 mb-8 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono font-medium">{orderId}</span>
                  </div>
                  {paymentId && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payment ID:</span>
                      <span className="font-mono font-medium">{paymentId}</span>
                    </div>
                  )}
                  {amount && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span className="font-semibold">₹{(parseFloat(amount) / 100).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/courses")}
                >
                  Go to My Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => window.print()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Need help? Contact our support team at{" "}
                  <a href="mailto:support@khushalstrial.com" className="text-primary hover:underline">
                    support@khushalstrial.com
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;

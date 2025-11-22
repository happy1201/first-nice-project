import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, RefreshCw, Home, HelpCircle } from "lucide-react";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reason = searchParams.get("reason");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    // Track failed payment
    if (window.gtag) {
      window.gtag("event", "payment_failed", {
        transaction_id: orderId,
        reason: reason || "unknown",
      });
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        status: "failed",
        reason: reason || "unknown",
      });
    }
  }, [orderId, reason]);

  const getErrorMessage = () => {
    switch (reason) {
      case "user_cancelled":
        return "You cancelled the payment. No charges were made to your account.";
      case "payment_declined":
        return "Your payment was declined by your bank. Please try a different payment method.";
      case "insufficient_funds":
        return "Insufficient funds in your account. Please try a different payment method.";
      case "network_error":
        return "Network error occurred during payment. Please check your connection and try again.";
      default:
        return "Something went wrong during the payment process. Please try again.";
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 lg:p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-destructive" />
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Payment Failed
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                {getErrorMessage()}
              </p>

              {orderId && (
                <div className="bg-muted/50 rounded-lg p-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono font-medium">{orderId}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/pricing")}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/contact")}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold mb-3">Common Issues:</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                  <li>• Check if your card has sufficient balance</li>
                  <li>• Ensure your card is enabled for online transactions</li>
                  <li>• Verify that you entered the correct card details</li>
                  <li>• Try using a different payment method (UPI, Net Banking)</li>
                  <li>• Contact your bank if the issue persists</li>
                </ul>
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

export default PaymentFailure;

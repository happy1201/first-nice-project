import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => (
  <div className="min-h-screen flex flex-col bg-muted/30">
    <Header />
    <main className="flex-1 flex flex-col items-center justify-center px-4" style={{marginTop: "5rem"}}>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-primary">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Thank you for your purchase.<br />
          You are now enrolled in the course!
        </p>
        <Button asChild className="w-full">
          <a href="/courses">Go to Courses</a>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default PaymentSuccess;
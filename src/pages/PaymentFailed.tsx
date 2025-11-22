import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentFailed = () => (
  <div className="min-h-screen flex flex-col bg-muted/30">
    <Header />
    <main className="flex-1 flex flex-col items-center justify-center px-4" style={{marginTop: "5rem"}}>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        <div className="bg-red-100 rounded-full p-4 mb-4">
          <XCircle className="w-16 h-16 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-destructive">Payment Failed</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Oops! Something went wrong with your payment.<br />
          Please try again or contact support if the issue persists.
        </p>
        <Button asChild className="w-full">
          <a href="/courses">Back to Courses</a>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default PaymentFailed;
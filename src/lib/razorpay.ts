import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export interface RazorpayOptions {
  amount: number; // Amount in paise (₹1 = 100 paise)
  currency?: string;
  name: string;
  description: string;
  orderId?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async (
  options: RazorpayOptions,
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
) => {
  const isLoaded = await initializeRazorpay();

  if (!isLoaded) {
    toast({
      title: "Payment Failed",
      description: "Unable to load payment gateway. Please try again.",
      variant: "destructive",
    });
    return;
  }

  // Get Razorpay key from environment (this would be set in your build config)
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder";

  const razorpayOptions = {
    key: razorpayKeyId,
    amount: options.amount,
    currency: options.currency || "INR",
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    prefill: options.prefill,
    notes: options.notes,
    theme: {
      color: options.theme?.color || "#0B63FF", // Primary brand color
    },
    handler: function (response: any) {
      // Payment successful
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        // User closed the payment modal
        onFailure({
          reason: "user_cancelled",
          message: "Payment was cancelled by user",
        });
      },
    },
  };

  const razorpay = new window.Razorpay(razorpayOptions);

  razorpay.on("payment.failed", function (response: any) {
    onFailure({
      reason: response.error.reason || "payment_failed",
      message: response.error.description || "Payment failed",
      metadata: response.error.metadata,
    });
  });

  razorpay.open();
};

export const formatCurrency = (amount: number, showDecimals = true): string => {
  const formatted = showDecimals
    ? (amount / 100).toFixed(2)
    : Math.round(amount / 100).toString();
  return `₹${formatted}`;
};

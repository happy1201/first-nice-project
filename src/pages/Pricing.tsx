import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Zap } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        "Access to 10 courses",
        "Basic course materials",
        "Community forum access",
        "Email support",
        "Course completion certificates",
        "30-day money-back guarantee",
      ],
      popular: false,
    },
    {
      name: "Pro",
      description: "Best for serious learners",
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        "Unlimited course access",
        "Premium course materials",
        "Priority support 24/7",
        "1-on-1 mentor sessions",
        "Industry-recognized certificates",
        "Job placement assistance",
        "Live workshops & webinars",
        "Downloadable resources",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Everything in Pro",
        "Custom course creation",
        "Dedicated account manager",
        "Team analytics dashboard",
        "SSO & advanced security",
        "Custom integrations",
        "Bulk enrollment options",
        "Corporate training programs",
      ],
      popular: false,
    },
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - annual;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your learning journey. All plans include
            money-back guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Label htmlFor="billing" className="text-base">
              Monthly
            </Label>
            <Switch
              id="billing"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing" className="text-base">
              Annual
            </Label>
            {isAnnual && (
              <Badge className="bg-accent text-accent-foreground">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const savings = plan.monthlyPrice
                ? calculateSavings(plan.monthlyPrice, plan.annualPrice!)
                : null;

              return (
                <Card
                  key={index}
                  className={`relative p-8 ${
                    plan.popular
                      ? "border-primary shadow-custom-lg scale-105 lg:scale-110"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      <Zap className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    {plan.monthlyPrice ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-5xl font-bold">
                            $
                            {isAnnual
                              ? Math.round(plan.annualPrice! / 12)
                              : plan.monthlyPrice}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {isAnnual && savings && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-accent font-medium">
                              Save ${savings.amount}/year ({savings.percentage}% off)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Billed annually (${plan.annualPrice})
                            </p>
                          </div>
                        )}
                        {!isAnnual && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Billed monthly
                          </p>
                        )}
                      </>
                    ) : (
                      <div>
                        <div className="text-3xl font-bold mb-2">
                          Custom Pricing
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Contact us for a quote
                        </p>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.monthlyPrice ? "Get Started" : "Contact Sales"}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, MasterCard, AmEx), PayPal, and UPI for Indian customers. Enterprise plans can be invoiced.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! We offer a 7-day free trial for the Pro plan. No credit card required to start.",
              },
              {
                q: "What's your refund policy?",
                a: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied, we'll refund your payment, no questions asked.",
              },
              {
                q: "Do you offer student discounts?",
                a: "Yes! Students get 50% off any plan with a valid student ID. Contact our support team to apply.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="p-8 lg:p-12 text-center gradient-hero text-primary-foreground">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Looking for corporate training, bulk enrollments, or custom course
              creation? Let's talk about your specific needs.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-base"
            >
              Contact Sales Team
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;

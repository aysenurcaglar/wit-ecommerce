import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import BrandLogos from "../components/BrandLogos";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "FREE",
      description: "Organize across all apps by hand",
      price: 0,
      features: [
        { name: "Unlimited product updates", included: true },
        { name: "Unlimited product updates", included: true },
        { name: "Unlimited product updates", included: true },
        { name: "1GB Cloud storage", included: false },
        { name: "Email and community support", included: false },
      ],
    },
    {
      name: "STANDARD",
      description: "Organize across all apps by hand",
      price: 9.99,
      features: [
        { name: "Unlimited product updates", included: true },
        { name: "Unlimited product updates", included: true },
        { name: "Unlimited product updates", included: true },
        { name: "1GB Cloud storage", included: false },
        { name: "Email and community support", included: false },
      ],
    },
    {
      name: "PREMIUM",
      description: "Organize across all apps by hand",
      price: 19.99,
      features: [
        { name: "Unlimited product updates", included: true },
        { name: "Unlimited product updates", included: true },
        { name: "Unlimited product updates", included: true },
        { name: "1GB Cloud storage", included: false },
        { name: "Email and community support", included: false },
      ],
    },
  ];

  const faqs = [
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
    {
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
    },
  ];

  const calculatePrice = (basePrice) => {
    if (isYearly) {
      return (basePrice * 0.75).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  return (
    <div>
      {/* Header Section */}
      <section className="text-center text-text-color py-16 max-w-75vw mx-auto">
        <p className="uppercase text-light-gray font-semibold">PRICING</p>
        <h1 className="text-5xl font-bold my-4">Simple Pricing</h1>
        <Breadcrumb className="flex flex-row justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <ChevronRight />
          <BreadcrumbItem>
            <BreadcrumbLink href="/pricing" className="font-bold">
              Pricing
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </section>

      <div className="bg-gray">
        <div className="py-12 max-w-[500px] mx-auto">
          <h2 className="text-center text-text-color text-4xl font-bold mb-6">
            Pricing
          </h2>
          <p className="text-center text-light-gray font-medium">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-lg ${!isYearly ? "font-bold" : "font-medium"}`}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`text-lg ${isYearly ? "font-bold" : "font-medium"}`}>
            Yearly
          </span>
          <span className="ml-2 inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Save 25%
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-2 max-w-75vw mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${
                index === 1
                  ? "bg-text-color text-white shadow-lg scale-105"
                  : "bg-background text-text-color border-primary-color"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {plan.name}
                </CardTitle>
                <p className="text-center mt-2 text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center text-primary-color">
                  <span className="text-5xl font-bold">
                    {calculatePrice(plan.price)}
                  </span>
                  <span className="text-xl ml-1">$</span>
                  <span className="text-sm text-muted-foreground block">
                    Per Month
                  </span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check
                        className={`h-5 w-5 ${
                          feature.included
                            ? "text-white bg-success-color rounded-full p-1"
                            : "text-white bg-zinc-400 rounded-full p-1"
                        }`}
                      />
                      <span className="font-medium">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    index === 1
                      ? "bg-primary-color text-white"
                      : "bg-text-color text-white"
                  }`}
                >
                  Try for free
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <span className="text-text-color font-semibold text-lg block text-center mt-24 pt-8">
          Trusted by Over 4000 Big Companies
        </span>
      </div>

      <BrandLogos />

      {/* FAQ Section */}
      <div className="container max-w-75vw mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-text-color font-bold mb-4">
            Pricing FAQs
          </h2>
          <p className="text-light-gray font-medium max-w-xl mx-auto">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics
          </p>
        </div>

        <div className="grid md:grid-cols-2 mx-auto gap-8">
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem
                value={`item-${index}`}
                className="border-none w-full"
              >
                <AccordionTrigger className="flex gap-2 hover:no-underline">
                  <span className="text-left text-text-color font-semibold">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-left text-light-gray font-medium ml-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl cursor-pointer hover:underline">
            Haven't got your answer? Contact our support.
          </p>
        </div>
      </div>
      {/* CTA Section */}
      <section className="bg-gray-100 py-12 text-center max-w-75vw mx-auto">
        <h3 className="text-2xl font-bold">Start your 14 days free trial</h3>
        <p className="text-gray-600 mt-2 mb-4">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
        </p>
        <Button>Try it free now</Button>
        <div className="flex justify-center space-x-6 mt-6">
          <Twitter className="text-primary-color cursor-pointer" />
          <Facebook className="text-primary-color cursor-pointer" />
          <Instagram className="text-primary-color cursor-pointer" />
          <Linkedin className="text-primary-color cursor-pointer" />
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

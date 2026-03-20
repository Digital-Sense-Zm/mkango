import { Suspense } from "react";
import CheckoutExperience from "@/components/checkout/checkout-experience";

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading reservation form...</div>}>
      <CheckoutExperience />
    </Suspense>
  );
};

export default CheckoutPage;

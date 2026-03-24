import { PageTemplate } from "@/components/layout/page-template";
import { CartView } from "@/components/cart/cart-view";

export default function CartPage() {
  return (
    <PageTemplate title="Shopping Bag" subtitle="Your Selection">
      <CartView />
    </PageTemplate>
  );
}

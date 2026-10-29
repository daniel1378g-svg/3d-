// Web-Shop: the live line set large and the button to the live shop (no products could be captured).
import { WebShop } from "@/components/home/WebShop";

export default function ShopPage() {
  return (
    <div style={{ paddingTop: "calc(var(--label-h) + 60px)" }}>
      <WebShop full />
    </div>
  );
}

import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/cart-utils";
import { prisma } from "@/lib/prisma";
import { updateCartItemSchema } from "@/lib/api-schemas";
import { requireSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

async function getCartByCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CART_COOKIE_KEY)?.value;

  if (!token) return null;

  return prisma.cart.findUnique({ where: { token } });
}

export async function PATCH(request: Request, context: RouteContext<"/api/cart/items/[productId]">) {
  try {
    await requireSessionUser();

    const { productId } = await context.params;
    const payload = updateCartItemSchema.safeParse(await request.json());

    if (!payload.success) {
      return Response.json({ error: payload.error.flatten() }, { status: 400 });
    }

    const cart = await getCartByCookie();
    if (!cart) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    const item = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity: payload.data.quantity },
    });

    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ error: "Unable to update item" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext<"/api/cart/items/[productId]">) {
  try {
    await requireSessionUser();

    const { productId } = await context.params;
    const cart = await getCartByCookie();

    if (!cart) {
      return Response.json({ ok: true });
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ error: "Unable to remove item" }, { status: 500 });
  }
}

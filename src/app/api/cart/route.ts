import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/cart-utils";
import { addToCartSchema } from "@/lib/api-schemas";
import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

async function getOrCreateCart(token?: string) {
  if (token) {
    const existing = await prisma.cart.findUnique({ where: { token } });
    if (existing) return existing;
  }

  return prisma.cart.create({
    data: { token: randomUUID() },
  });
}

async function serializeCart(token: string) {
  const cart = await prisma.cart.findUnique({
    where: { token },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!cart) return null;

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return {
    id: cart.id,
    token: cart.token,
    items: cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product,
      lineTotal: item.product.price * item.quantity,
    })),
    subtotal,
  };
}

export async function GET() {
  try {
    await requireSessionUser();

    const cookieStore = await cookies();
    const token = cookieStore.get(CART_COOKIE_KEY)?.value;

    if (!token) {
      return Response.json({ cart: { items: [], subtotal: 0 } });
    }

    const cart = await serializeCart(token);
    return Response.json({ cart: cart ?? { items: [], subtotal: 0 } });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ error: "Unable to load cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireSessionUser();

    const payload = addToCartSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: payload.error.flatten() }, { status: 400 });
    }

    const { productId, quantity } = payload.data;
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const cookieStore = await cookies();
    const currentToken = cookieStore.get(CART_COOKIE_KEY)?.value;

    const cart = await getOrCreateCart(currentToken);

    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
      update: {
        quantity: { increment: quantity },
      },
    });

    if (!currentToken) {
      cookieStore.set(CART_COOKIE_KEY, cart.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      });
    }

    const serialized = await serializeCart(cart.token);
    return Response.json({ cart: serialized, message: "Added to cart" });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ error: "Unable to add item" }, { status: 500 });
  }
}

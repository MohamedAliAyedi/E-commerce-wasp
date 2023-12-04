import HttpError from '@wasp/core/HttpError.js'

export const createProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Product.create({
    data: {
      title: args.title,
      description: args.description,
      price: args.price,
      inventory: args.inventory
    }
  });
}

export const createProductVariant = async (args, context) => {
  const { size, color, productId } = args;

  if (!context.user) { throw new HttpError(401) }

  const productVariant = await context.entities.ProductVariant.create({
    data: {
      size,
      color,
      productId
    }
  });

  return productVariant;
}

export const updateProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId }
  });

  if (!product) { throw new HttpError(404) }

  const updatedProduct = await context.entities.Product.update({
    where: { id: args.productId },
    data: args
  });

  return updatedProduct;
}

export const createOrder = async ({ userId, productIds }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });

  if (!user) { throw new HttpError(404, 'User not found') };

  const products = await context.entities.Product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) { throw new HttpError(404, 'One or more products not found') };

  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  const order = await context.entities.Order.create({
    data: {
      user: { connect: { id: userId } },
      products: { connect: productIds },
      status: 'Created',
      total: totalPrice
    }
  });

  return order;
}

export const updateOrderStatus = async ({ orderId, newStatus }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const order = await context.entities.Order.findUnique({
    where: { id: orderId }
  });
  if (!order) { throw new HttpError(404) };

  return context.entities.Order.update({
    where: { id: orderId },
    data: { status: newStatus }
  });
}
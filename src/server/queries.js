import HttpError from '@wasp/core/HttpError.js'


export const getProduct = async ({ id }, context) => {
  const product = await context.entities.Product.findUnique({ where: { id } });
  if (!product) throw new HttpError(404, 'No product with id ' + id);
  return product;
}

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const products = await context.entities.Product.findMany()

  return products;
}

export const getOrder = async ({ orderId }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const order = await context.entities.Order.findUnique({
    where: { id: orderId },
    include: { products: true }
  });

  if (!order) {
    throw new HttpError(404, `No order with ID ${orderId}`);
  }

  return order;
}

export const getOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Order.findMany({
    where: { userId: context.user.id }
  })
}

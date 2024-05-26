import { allOrdersRequest, orderRequest } from '@/entities/order';
import { OrderStatus } from '@/entities/order/model';
import { ProductInOrderCard } from '@/entities/order/ui';
import { OrderCard } from '@/entities/order/ui/orderCard';
import { ProductCard } from '@/entities/product';

export async function useGetAllOrdersCards() {
    return allOrdersRequest()
        .then(({ status, data }) => {
            const orderCards: ((
                parent: Element,
                orderHref: string,
            ) => OrderCard)[] = [];
            if (status === 200) {
                data.forEach((order) => {
                    orderCards.push((parent: Element, orderHref: string) => {
                        return new OrderCard(parent, {
                            className: 'order-' + order.id.toString(),
                            id: order.id,
                            sum: order.sum,
                            total: order.itemsCount,
                            status: order.status,
                            orderHref: orderHref + '/' + order.id.toString(),
                            orderData: order.createdAt,
                        });
                    });
                });
                return orderCards;
            }
            return [];
        })
        .catch(() => {
            return [];
        });
}

export async function useGetOrder(id: number) {
    const parsedData = {
        sum: 0,
        itemsCount: 0,
        discount: 0,
        sumWithoutDiscount: 0,
        status: 'canceled' as OrderStatus,
        createdAt: '0',
        products: new Array<
            (parent: Element) => ProductInOrderCard<ProductCard>
        >(),
    };

    return orderRequest(id)
        .then(({ status, data }) => {
            parsedData.sum = data.sum;
            parsedData.itemsCount = data.itemsCount;
            parsedData.status = data.status;
            parsedData.createdAt = data.createdAt;

            if (status === 200) {
                data.products.forEach((product) => {
                    parsedData.sumWithoutDiscount +=
                        product.price * product.count;
                    parsedData.products.push((parent: Element) => {
                        const p = new ProductInOrderCard<ProductCard>(parent, {
                            className: `product-${product.id}`,
                            itemCount: product.count,
                        });
                        p.insertProductCard((parent2: Element) => {
                            return new ProductCard(parent2, {
                                className: 'product-' + product.id,
                                id: product.id,
                                style: 'horizontal',
                                src: product.imgSrc,
                                name: product.productName,
                                price: product.price,
                            });
                        });
                        return p;
                    });
                });
                parsedData.discount =
                    parsedData.sumWithoutDiscount - parsedData.sum;

                return parsedData;
            }
            return parsedData;
        })
        .catch(() => {
            return parsedData;
        });
}

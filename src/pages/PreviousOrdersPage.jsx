import api from "../api/axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/order");
        // Sort orders by date in descending order (most recent first)
        const sortedOrders = response.data.sort(
          (a, b) =>
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
        );
        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center my-16">
        No orders found
      </div>
    );

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
      <h1 className="text-2xl font-bold my-4">Previous Orders</h1>

      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <p className="font-semibold">Date:</p>
              <p>{new Date(order.order_date).toLocaleString()}</p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-12 h-12 object-cover object-top"
                        />
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.count}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end mb-2">
            <div className="flex items-center space-x-2 mr-2 md:mr-16">
              <p className="font-semibold text-right">Total:</p>
              <p className="text-right">${order.price.toFixed(2)}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PreviousOrdersPage;

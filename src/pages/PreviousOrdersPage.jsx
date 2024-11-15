import api from "../api/axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        setOrders(response.data);
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

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Previous Orders</h1>
      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
            <p>Total: ${order.price.toFixed(2)}</p>
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
        </Card>
      ))}
    </div>
  );
};

export default PreviousOrdersPage;

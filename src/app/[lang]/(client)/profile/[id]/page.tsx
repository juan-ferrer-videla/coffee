import { getOrders, getUser } from "@/_actions/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Profile() {
  //Info de usuario
  const user = await getUser();
  if (!user) {
    return "Usuario no encontrado";
  }

  //Info de las compras
  const allOrders = await getOrders();

  const data = allOrders
  .filter((order) => order.userId === user.id)
  .map((order) => ({
    id: order.id,
    userId: order.userId,
    productId: order.productId,
    quantity: order.quantity,
    delivery: order.delivery,
    status: order.status,
    purchasedAt: order.purchasedAt,
    title: order.product.title,
    price: order.product.price,
  }));

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
  <CardHeader>
    <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
      User Details
    </CardTitle>
  </CardHeader>
  <CardContent className="grid gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-w-full">
      <p className="font-medium text-sm sm:text-base">Name:</p>
      <p className="text-sm sm:text-base">{user.name}</p>
      <p className="font-medium text-sm sm:text-base">Email:</p>
      <p className="text-sm sm:text-base">{user.email}</p>
      <p className="font-medium text-sm sm:text-base">Mobile:</p>
      <p className="text-sm sm:text-base">
        {user.phone ?? "No has definido tu numero de telefono"}
      </p>
      <p className="font-medium text-sm sm:text-base">Location:</p>
      <p className="text-sm sm:text-base">
        {user.city ?? "No has definido tu locacion"}
      </p>
      <p className="font-medium text-sm sm:text-base">State:</p>
      <p className="text-sm sm:text-base">
        {user.state ?? "No has definido tu estado"}
      </p>
      <p className="font-medium text-sm sm:text-base">Postal Code:</p>
      <p className="text-sm sm:text-base">
        {user.postalCode ?? "No has definido tu codigo postal"}
      </p>
      <p className="font-medium text-sm sm:text-base">Street:</p>
      <p className="text-sm sm:text-base">
        {user.street ?? "No has definido tu calle"}
      </p>
      <p className="font-medium text-sm sm:text-base">Street Number:</p>
      <p className="text-sm sm:text-base">
        {user.streetNumber ?? "No has definido tu numero de calle"}
      </p>
    </div>
  </CardContent>
</Card>

      <div>
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Purchased Items:
        </h2>
        <div>
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </>
  );
}

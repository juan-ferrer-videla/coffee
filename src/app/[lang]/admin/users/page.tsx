import { getUsers } from "@/_actions/actions";
import { UsersColumns } from "./columns";
import { UsersTable } from "./userTable";

export default async function Users() {
  const users = await getUsers();

  const usersInfo = users.map((user) => ({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dni: user.dni,
    city: user.city,
  }));

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          Usuarios
        </h1>

        <div></div>
        <UsersTable data={usersInfo} columns={UsersColumns} />
      </div>
    </>
  );
}

"use client";
// 📦 Dependencies
import { useQuery } from "@tanstack/react-query";

// 📖 lib
import { GetRequest } from "@/lib/api/api.client";

// 🧷 Custom Types
type User = {
  id: number;
  name: string;
  email: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await GetRequest({
    url: "/users",
  });
  return data;
};

export default function Home() {
  const { data, isLoading, isError, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <main>
        {data?.map((user) => (
          <li key={user.id} className="list-group-item">
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </main>
    </div>
  );
}

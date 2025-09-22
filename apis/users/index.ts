//Dependences
import { GetRequest } from "@/lib/api/api.client";

type User = {
  id: number;
  name: string;
  email: string;
};
//Custom types
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await GetRequest({
    url: "/users",
  });
  return data;
};

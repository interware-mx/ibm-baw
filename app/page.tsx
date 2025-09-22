"use client";
//Dependences
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
//Lib
import { GetRequest } from "@/lib/api/api.client";
//Styles
import styles from "./page.module.css";

//Custom types
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
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {data?.map((user) => (
          <li key={user.id} className="list-group-item">
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>

        <button type="button" className="btn btn-outline-primary">
          Primary
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-outline-success">
          Success
        </button>
        <button type="button" className="btn btn-outline-danger">
          Danger
        </button>
        <button type="button" className="btn btn-outline-warning">
          Warning
        </button>
        <button type="button" className="btn btn-outline-info">
          Info
        </button>
        <button type="button" className="btn btn-outline-light fw-bold">
          Light
        </button>
        <button type="button" className="btn btn-outline-dark">
          Dark
        </button>
      </footer>
    </div>
  );
}

import { Container } from "@/components/Container";

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800sm:text-5xl">
            More transparency for San Francisco
          </h1>
          <p className="mt-6 text-base text-zinc-600">lorem ipsum</p>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28"></Container>
    </>
  );
}
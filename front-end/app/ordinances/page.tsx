import { Container } from '@/components/Container'

export default async function Home() {
  return (
    <>
      <Container>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
            Ordinances
          </h1>
          <p className="mt-6 text-base text-zinc-600 ">lorem ipsum</p>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28"></Container>
    </>
  )
}

import { Container } from '@/components/Container'
import { supervisors } from '@/data/supervisors'
import Link from 'next/link'

export default async function Home() {
  return (
    <Container>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
        More transparency for San Francisco
      </h1>
      <div className="w-full">
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8 w-full ">
          {supervisors.map(supervisor => (
            <Link href={`supervisors/${supervisor.slug}`} key={supervisor.id}>
              <li
                key={supervisor.name}
                className="rounded-2xl bg-gray-800 px-8 py-10">
                <img
                  className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56"
                  src={`https://i.pravatar.cc/300?seed=${supervisor.id}`}
                  alt=""
                />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
                  {supervisor.name}
                </h3>
                <p className="text-sm leading-6 text-gray-400">
                  District {supervisor.district}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Container>
  )
}

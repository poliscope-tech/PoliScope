interface ISupervisor {
  id: number
  name: string
  slug: string
  district: number
}

export const supervisors = [
  { id: 1, name: 'Matt Dorsey', slug: 'matt-dorsey', district: 2 },
  { id: 2, name: 'Joel Engardio', slug: 'joel-engardio', district: 5 },
]

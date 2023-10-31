import Animal from '@/models/Animal'
import { dbConnect } from '@/utils/mongoose'

export async function loadAnimals() {
  await dbConnect()
  const animals = await Animal.find()
  return animals
}

export default async function HomePage() {
  const animals = await loadAnimals()
  return (
    <div>
      {
        animals.map((animal) => (
          <div key={animal.id}>{animal.description}</div>
        ))
      }
    </div>
  )
}

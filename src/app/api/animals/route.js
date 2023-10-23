import Animal from '@/models/Animal'
import { dbConnect } from '@/utils/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()
  const animals = await Animal.find()
  return NextResponse.json(animals)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newAnimal = new Animal(body)
    const savedAnimal = await newAnimal.save()

    return NextResponse.json(savedAnimal)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    })
  }
}

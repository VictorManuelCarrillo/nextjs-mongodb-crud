import Animal from '@/models/Animal'
import { dbConnect } from '@/utils/mongoose'
import { NextResponse } from 'next/server'

// GET SINGLE ANIMAL ____________________ //
export async function GET(request, { params }) {
  await dbConnect()
  try {
    const animalFound = await Animal.findById(params.id)
    if (!animalFound)
      return NextResponse.json(
        {
          message: 'animal not found',
        },
        { status: 404 }
      )

    return NextResponse.json(animalFound)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    })
  }
}

// UPDATE ANIMAL ____________________ //
export async function PUT(request, { params }) {
  await dbConnect()
  const body = await request.json()

  try {
    const animalUpdated = await Animal.findByIdAndUpdate(params.id, body, {
      new: true,
    })

    if (!animalUpdated)
      return NextResponse.json(
        {
          message: 'animal not found',
        },
        {
          status: 404,
        }
      )
    return NextResponse.json(animalUpdated)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    })
  }
}

// DELETE ANIMAL ____________________ //
export async function DELETE(request, { params }) {
  await dbConnect()

  try {
    const animalDeleted = await Animal.findByIdAndDelete(params.id)

    if (!animalDeleted)
      return NextResponse.json(
        {
          message: 'Animal not found',
        },
        {
          status: 400,
        }
      )
    return NextResponse.json(animalDeleted)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    })
  }
}

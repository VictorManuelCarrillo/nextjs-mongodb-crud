'use client'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function FormPage() {
  const [newAnimal, setNewAnimal] = useState({
    title: '',
    description: '',
  })

  const router = useRouter()
  const params = useParams()

  const   getAnimal = async () => {
    const res = await fetch(`/api/animals/${params.id}`)
    const data = res.json()
    setNewAnimal({
      title: data.title,
      description: data.description
    })
  }

  const createAnimal = async () => {
    const res = await fetch('/api/animals', {
      method: 'POST',
      body: JSON.stringify(newAnimal),
      // body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    if (res.status === 200) {
      router.push('/')
      router.refresh()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!params.id) {
      await createAnimal()
    }
  }

  const updateAnimal = async () => {
    const res = await  fetch(`/api/animals/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(newAnimal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    router.push('/')
    router.refresh()
  }

  const handleDelete = async () => {
    try {
      if (window.confirm('are you sure you want to delete this animal?')) {
        const res = await fetch(`/api/animals/${params.id}`, {
          method: 'DELETE',
        })
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (params.id) {
      getAnimal()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>{!params.id ? 'create animal' : 'update animal'}</h1>

      <button type="button" onClick={handleDelete}></button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={newAnimal.title}
        />
        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="description"
          onChange={handleChange}
          value={newAnimal.description}
        ></textarea>
        <button type="submit">
          {
            !params.id ? 'create' : 'update'
          }
        </button>
      </form>
    </div>
  )
}

import { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

function Stories() {
  const [suggestns, setSuggestns] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    const suggestns = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestns(suggestns)
  }, [])

  return (
    <div className="mt-8 flex space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-6 scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestns.map((person) => {
        return (
          <Story
            key={person.id}
            img={person.avatar}
            username={person.username}
          />
        )
      })}
    </div>
  )
}

export default Stories

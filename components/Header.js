import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 border-b bg-blue-100 shadow-sm">
      {/* header ... */}
      <div className="mx-5 flex max-w-6xl justify-between xl:mx-auto">
        {/* left .... */}
        <div
          onClick={() => router.push('/')}
          className=" relative hidden w-24 cursor-pointer lg:inline-grid"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => router.push('/')}
          className="relative  w-20 flex-shrink-0 cursor-pointer lg:hidden"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* middle  search input*/}
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md  p-3">
            <div className="pointer-events-none absolute inset-y-0 flex items-center ">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <input
                className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
                type="text"
                name="search"
                id="search"
                placeholder="search"
              />
            </div>
          </div>
        </div>

        {/* right icons*/}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className="h-6 w-10 cursor-pointer md:hidden" />

          {session ? (
            <>
              <div className="navBtn relative ">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                src={session?.user?.image}
                alt="charlie"
                onClick={signOut}
                className="h-10 w-10 cursor-pointer rounded-full"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header

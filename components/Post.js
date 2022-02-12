import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setHasLiked(
        // for every index of users that has liked...it will return its index e.g 0,2,5 ... and for every index of users that has not liked it will return -1....and compare (index !== -1) or (-1 !== -1)...returns true or false
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment(' ')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className="my-7 rounded-sm border bg-white">
      {/* Header */}
      <div className="flex items-center p-3">
        <img
          src={userImg}
          alt={username}
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} alt="" className="w-full object-cover" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn " />
        </div>
      )}

      {/* Caption */}
      <div>
        <p className="truncate p-5">
          {likes.length > 0 && (
            <p className="mb-1 font-bold">
              {likes.length} like{likes.length > 1 && <span>s</span>}
            </p>
          )}
          <span className="mr-1 font-bold">{username}</span>
          {caption}
        </p>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="mb-3 flex items-center space-x-4"
              >
                <img
                  src={comment.data().userImage}
                  alt=""
                  className="h-7 rounded-full"
                />
                <p className="flex-1 text-sm">
                  <span className="font-bold">{comment.data().username}</span>{' '}
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            )
          })}
        </div>
      )}

      {/* Input Box */}
      {session && (
        <form action="" className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            type="text"
            value={comment}
            placeholder="Add a comment ..."
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post

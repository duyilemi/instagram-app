import { collection, onSnapshot, query, orderBy } from '@firebase/firestore'
import Post from './Post'
import { db } from '../firebase'
import { useState, useEffect } from 'react'

// const posts = [
//   {
//     id: 1,
//     username: 'griffith',
//     userImg:
//       'https://z-m-scontent.flos1-1.fna.fbcdn.net/v/t39.30808-1/cp0/e15/q65/c0.5.120.120a/p120x120/242006960_5053272081355788_4020366739509679280_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=U-Kiy33XUSQAX-t73oA&_nc_ad=z-m&_nc_cid=1080&_nc_eh=69ef6c53ef47e1863e1d659ebd021ddd&_nc_rml=0&_nc_ht=z-m-scontent.flos1-1.fna&oh=00_AT_pz2YlERBbHSOPyPzvftT8kED10Exap42caJRhbb_kWg&oe=6201872F',
//     img: 'https://z-m-scontent.flos1-1.fna.fbcdn.net/v/t39.30808-1/cp0/e15/q65/c0.5.120.120a/p120x120/242006960_5053272081355788_4020366739509679280_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=U-Kiy33XUSQAX-t73oA&_nc_ad=z-m&_nc_cid=1080&_nc_eh=69ef6c53ef47e1863e1d659ebd021ddd&_nc_rml=0&_nc_ht=z-m-scontent.flos1-1.fna&oh=00_AT_pz2YlERBbHSOPyPzvftT8kED10Exap42caJRhbb_kWg&oe=6201872F',
//     caption: 'i love em all',
//   },
//   {
//     id: 2,
//     username: 'beau',
//     userImg:
//       'https://z-m-scontent.flos1-1.fna.fbcdn.net/v/t39.30808-1/cp0/e15/q65/c0.5.120.120a/p120x120/242006960_5053272081355788_4020366739509679280_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=U-Kiy33XUSQAX-t73oA&_nc_ad=z-m&_nc_cid=1080&_nc_eh=69ef6c53ef47e1863e1d659ebd021ddd&_nc_rml=0&_nc_ht=z-m-scontent.flos1-1.fna&oh=00_AT_pz2YlERBbHSOPyPzvftT8kED10Exap42caJRhbb_kWg&oe=6201872F',
//     img: 'https://z-m-scontent.flos1-1.fna.fbcdn.net/v/t39.30808-1/cp0/e15/q65/c0.5.120.120a/p120x120/242006960_5053272081355788_4020366739509679280_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=U-Kiy33XUSQAX-t73oA&_nc_ad=z-m&_nc_cid=1080&_nc_eh=69ef6c53ef47e1863e1d659ebd021ddd&_nc_rml=0&_nc_ht=z-m-scontent.flos1-1.fna&oh=00_AT_pz2YlERBbHSOPyPzvftT8kED10Exap42caJRhbb_kWg&oe=6201872F',
//     caption: 'i love Beau',
//   },
// ]

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs)
      }
    )
  }, [db])
  console.log(posts)
  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
          />
        )
      })}
    </div>
  )
}

export default Posts

import { useEffect, useState } from 'react';
import client from './services/api/sanityClient'; 

interface Post {
  _id: string;
  title: string;
}
function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "post"]{ _id, title }`)
      .then((data) => {
        console.log('Fetched posts:', data);
        
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default BlogPosts;

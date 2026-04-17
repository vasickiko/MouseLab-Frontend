import { useParams } from "react-router-dom"
import { BlogPosts } from "./BlogPosts"

const RenderPost = () => {
    const { slug } = useParams()
    const post = BlogPosts.find(post => post.slug === slug)
    
    return (
        <div>
            {post ? (
                <post.component />
            ) : (
                <div>
                    <h1>Post not found</h1>
                </div>
            )}
        </div>
    )
}

export default RenderPost
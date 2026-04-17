import{ useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { BlogPosts } from "./BlogPosts"

const Blog = () => {

    const navigate = useNavigate()

    const handleClick = (slug: string) => {
        navigate(`/blog/${slug}`)
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-6 py-8">
                {BlogPosts.map((post) => (
                    <div onClick={() => handleClick(post.slug)} key={post.slug} className="flex bg-white/5 border border-white/10 cursor-pointer flex-col items-start justify-center gap-2 rounded-2xl">
                        <img src={post.banner} alt={post.title} className="rounded-t-2xl rounded-b-none"/>
                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="text-3xl font-semibold">{post.title}</h2>
                            <span className="text-sm text-white/60">Published April 17, 2026</span>
                            <Button onClick={() => handleClick(post.slug)}>Read More</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog
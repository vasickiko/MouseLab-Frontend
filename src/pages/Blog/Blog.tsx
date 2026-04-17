import{ useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { BlogPosts } from "./BlogPosts"

const Blog = () => {

    const navigate = useNavigate()

    const handleClick = (slug: string) => {
        navigate(`/blog/${slug}`)
    }

    return (
        <div className="min-h-screen container mx-auto flex flex-col items-start bg-black text-white px-6 py-8 space-y-6">
             <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Blog Page
                </h1>
                <p className="max-w-4xl leading-7">
                  Thoughts, reviews, and hands-on impressions on gaming mice and gear. 
                  No overhyped specs — just real experience, what works, and what actually matters in use.
                </p>
                <p className="text-white/60 text-sm">{BlogPosts.length} post{BlogPosts.length !== 1 ? 's' : ''}</p>
              </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto ">
                {BlogPosts.map((post) => (
                    <div onClick={() => handleClick(post.slug)} key={post.slug} className="flex bg-white/5 border border-white/10 cursor-pointer flex-col items-start justify-center gap-2 rounded-2xl">
                        <img src={post.banner} alt={post.title} className="rounded-t-2xl rounded-b-none"/>
                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="sm:text-2xl text-xl font-semibold">{post.title}</h2>
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
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/blog";

/** Article card used on the blog hub and in "Related reading" blocks. */
export function PostCard({ post, meta }: { post: Post; meta: string }) {
  return (
    <Link className="card post-card" href={`/blog/${post.slug}`}>
      <div>
        {post.image && (
          <div className="post-thumb">
            <Image src={post.image.src} alt="" width={post.image.w} height={post.image.h} sizes="(max-width: 920px) 100vw, 560px" />
          </div>
        )}
        <span className="cat">{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
      <span className="meta">{meta}</span>
    </Link>
  );
}

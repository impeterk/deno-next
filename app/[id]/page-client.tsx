"use client";
import { Post, User } from "@/lib/generated/prisma";
import { use, unstable_ViewTransition as ViewTransition } from "react";

type PostWithAuthor = Post & { author: User };
export default function PageClient({ posts }: { posts: PostWithAuthor[] }) {
  return (
    <ViewTransition>
      <div>
        <ViewTransition name="experimental-label">
          <span className="inline-block font-bold">{`<ViewTransitions>`}</span>
        </ViewTransition>
        <p>Product Page</p>
        <ViewTransition name={`user-name-${posts[0].author.id}`}>
          <span>{posts[0].author.name}</span>
        </ViewTransition>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </ViewTransition>
  );
}

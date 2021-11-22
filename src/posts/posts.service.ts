import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostNotFoundException } from './exceptions/post-not-found.exception';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private lastPostId = 0;
  private readonly posts: Post[] = [];

  create(post: CreatePostDto) {
    this.lastPostId += 1;
    this.posts.push(Object.assign({ id: this.lastPostId }, post));
  }

  update(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new PostNotFoundException();
    }

    this.posts[postIndex] = post;
  }

  delete(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new PostNotFoundException();
    }

    this.posts.splice(postIndex, 1);
  }

  async findAll(): Promise<Post[] | undefined> {
    return this.posts;
  }

  async findOne(id: number): Promise<Post | undefined> {
    return this.posts.find((post) => post.id === id);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostMedia } from 'src/post-media/entities';
import { PostMediaRepository } from 'src/post-media/repositories';
import { Post } from 'src/posts/entities';
import { PostsRepository } from 'src/posts/repositories';
import { User } from 'src/users/entities';
import { PostCreateInput } from '../inputs/post-create.input';
import { PostEditInput } from '../inputs/post-edit.input';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postMediaRepository: PostMediaRepository,
  ) {}

  createPostMedia = (postId: string, mediaInput?: PostCreateInput['media']): PostMedia[] => {
    if (!mediaInput) {
      return [];
    }

    const createdMedia = mediaInput.map((media) => this.postMediaRepository.create({ ...media, postId }));

    return createdMedia;
  };

  async createPost(userId: User['id'], input: PostCreateInput): Promise<Post> {
    const createdPost = this.postsRepository.create({ ...input, userId });
    const savedPost = await this.postsRepository.save(createdPost);

    const createdPostMedia = this.createPostMedia(savedPost.id, input.media);

    const savedMedia = await this.postMediaRepository.save(createdPostMedia);

    return { ...savedPost, media: savedMedia };
  }

  async editPost({ id, ...updatedValues }: PostEditInput): Promise<Post> {
    const existPost = await this.postsRepository.findOne(id);

    if (!existPost) {
      throw new InternalServerErrorException();
    }

    return this.postsRepository.save({ ...existPost, ...updatedValues });
  }

  async remove(postId: string): Promise<Post> {
    const post = await this.postsRepository.findOne(postId);

    return this.postsRepository.remove(post);
  }
}

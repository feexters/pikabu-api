import { CommentMediaRepository } from 'src/comment-media/repositories';
import { PostMediaRepository } from 'src/post-media/repositories';
import { PostMediaLoader } from 'src/posts/v1/dataloaders';
import { CommentMediaLoader } from '../comment-media/v1/dataloaders/comment-media.dataloader';

export const commonDataLoaders = [PostMediaLoader, CommentMediaLoader];

export const commonDataLoaderRepositories = [PostMediaRepository, CommentMediaRepository];

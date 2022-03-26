import { PostMediaRepository } from 'src/post-media/repositories';
import { PostMediaLoader } from 'src/posts/v1/dataloaders';

export const commonDataLoaders = [PostMediaLoader];

export const commonDataLoaderRepositories = [PostMediaRepository];

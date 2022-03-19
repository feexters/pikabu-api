import { Column } from 'typeorm';
import { MediaType } from '../types';
import { Base } from './base.entity';

export abstract class MediaBase extends Base {
  @Column({ type: 'text' })
  source: string;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;
}

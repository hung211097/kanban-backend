import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { TAG } from '~/config/constants';

const taskSchema = new mongoose.Schema<Task>(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tag: [
      {
        type: String,
        enum: [TAG.ANDROID, TAG.DESKTOP, TAG.IOS, TAG.WEB],
      },
    ],
    documentLink: {
      type: String,
      default: '',
    },
    designLink: {
      type: String,
      default: '',
    },
    projectLink: {
      type: String,
      default: '',
    },
    owner: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export const boardSchema = new mongoose.Schema<Board>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleBgColor: {
      type: String,
    },
    tasks: [taskSchema],
  },
  { timestamps: true },
);

boardSchema.plugin(mongoosePaginate);

export interface Owner {
  readonly id: string;
  readonly name: string;
}

export interface Task {
  readonly id: string;
  readonly title: string;
  readonly owner: Owner;
  readonly description?: string;
  readonly tag?: string[];
  readonly documentLink?: string;
  readonly projectLink?: string;
  readonly designLink?: string;
}

export interface Board {
  readonly id: string;
  readonly title: string;
  readonly titleBgColor: string;
  readonly tasks: Task[];
}

export type BoardPartial = Partial<Board>;
export type TaskPartial = Partial<Task>;

export const boardSchemaName = 'Board';

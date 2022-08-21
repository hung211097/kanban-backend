import mongoose from 'mongoose';

export const counterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    sequenceValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export interface Counter extends Document {
  readonly id: string;
  readonly sequenceValue: number;
}

export const counterSchemaName = 'Counter';

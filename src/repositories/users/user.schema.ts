import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema<User>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

export interface User {
  readonly id: string;
  readonly password: string;
  readonly email?: string;
  readonly name?: string;
}

userSchema.index({ email: 1 }, { unique: true });

export type UserPartial = Partial<User>;

export const userSchemaName = 'User';

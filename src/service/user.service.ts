import { DocumentDefinition } from 'mongoose';
import UserModel, { IUserModel } from '../model/user.model';

export async function createUser(
  input: DocumentDefinition<Omit<IUserModel, 'updatedAt' | 'createdAt' | 'matchPassword'>>
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

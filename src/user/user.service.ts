import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  findById(userId: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Creates a new user in the system.
   *
   * @param {User} user - The user object to be created.
   * @return {Promise<User>} - The created user object.
   */
  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  /**
   * Finds a user by their username.
   *
   * @param {string} username - The username of the user to find.
   * @return {Promise<User | null>} A promise that resolves with the user if found, or null if not found.
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  /**
   * Validates a user by checking if the provided username and password match.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @return {Promise<User | null>} Returns a promise that resolves to a User object if the username and password match, otherwise returns null.
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}

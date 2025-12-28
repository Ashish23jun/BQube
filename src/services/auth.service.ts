import prisma from '../config/database';
import { AuthResponse, LoginDTO, RegisterDTO } from '../types/auth.type';
import { comparePassword, hashPassword } from '../utils/hash.util';
import { generateToken } from '../utils/jwt.util';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} from '../utils/errors.util';

export class AuthService {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const exisitngUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (exisitngUser) {
      throw new ConflictError('User with this email already exists');
    }
    const hashedPassword = await hashPassword(data.password); // In real implementation, hash the password
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
    const token = generateToken({ userId: newUser.id, email: newUser.email });
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
    };
  }
  async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    if (!user.password) {
      throw new UnauthorizedError('Please sign in with Google');
    }
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const token = generateToken({ userId: user.id, email: user.email });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}

export default new AuthService();

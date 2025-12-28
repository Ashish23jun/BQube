import { Request, Response, NextFunction } from 'express';
import { LoginDTO, RegisterDTO } from '../types/auth.type';
import authService from '../services/auth.service';
import { ApiResponse } from '../utils/response.util';

export class AuthController {
  // POST /api/auth/register
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: RegisterDTO = req.body;
      const result = await authService.register(data);
      ApiResponse.created(res, result, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginDTO = req.body;
      const result = await authService.login(data);
      ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  // GET /api/auth/me
  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // @ts-expect-error - userId will be added by auth middleware
      const userId = req.userId;
      const user = await authService.getUserById(userId);
      ApiResponse.success(res, { user });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

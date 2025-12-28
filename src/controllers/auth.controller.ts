import { Request, Response, NextFunction } from 'express';
import { LoginDTO, RegisterDTO } from '../types/auth.type';
import authService from '../services/auth.service';

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

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result,
      });
    } catch (error: any) {
      if (error.message === 'User with this email already exists') {
        res.status(409).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginDTO = req.body;

      const result = await authService.login(data);

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result,
      });
    } catch (error: any) {
      if (
        error.message === 'Invalid email or password' ||
        error.message === 'Please sign in with Google'
      ) {
        res.status(401).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }

  // GET /api/auth/me
  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // @ts-expect-error - userId will be added by auth middleware
      const userId = req.userId;

      const user = await authService.getUserById(userId);

      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }
}

export default new AuthController();

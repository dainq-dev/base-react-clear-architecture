import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IntentsService } from './intents.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ApiResponse } from '@react-app-store/shared';
import type { Intent } from '@react-app-store/shared';

/**
 * Intent Controller - Single endpoint for all intents
 */
@Controller('intents')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class IntentsController {
  constructor(private readonly intentsService: IntentsService) {}

  /**
   * Handle GET request (for read-only intents)
   */
  @Get()
  async handleGet(@Query() query: Record<string, string>): Promise<ApiResponse> {
    const intent = this.queryToIntent(query);
    return this.intentsService.processIntent(intent);
  }

  /**
   * Handle POST request (for mutations)
   */
  @Post()
  async handlePost(@Body() intent: Intent): Promise<ApiResponse> {
    return this.intentsService.processIntent(intent);
  }

  /**
   * Handle PUT request
   */
  @Put()
  async handlePut(@Body() intent: Intent): Promise<ApiResponse> {
    return this.intentsService.processIntent(intent);
  }

  /**
   * Handle PATCH request
   */
  @Patch()
  async handlePatch(@Body() intent: Intent): Promise<ApiResponse> {
    return this.intentsService.processIntent(intent);
  }

  /**
   * Handle DELETE request
   */
  @Delete()
  async handleDelete(@Body() intent: Intent): Promise<ApiResponse> {
    return this.intentsService.processIntent(intent);
  }

  /**
   * Convert query params to Intent
   */
  private queryToIntent(query: Record<string, string>): Intent {
    const { $kind, ...rest } = query;
    
    if (!$kind) {
      throw new HttpException('Missing $kind parameter', HttpStatus.BAD_REQUEST);
    }

    return {
      $kind,
      ...rest,
    } as Intent;
  }
}


import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get(':id')
  // getOne(@Param('id') id: string): string {
  //   return id;
  // }

  // @Post()
  // create(@Body() body) {
  //   return body;
  // }
}

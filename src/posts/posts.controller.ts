import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    this.postsService.update(id, updatePostDto);
    return updatePostDto;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.postsService.delete(id);
    return { id };
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }
}

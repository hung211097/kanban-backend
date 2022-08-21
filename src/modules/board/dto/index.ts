import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  description: string;

  @ApiProperty({
    type: Array,
  })
  tag: string[];

  @ApiProperty({
    type: String,
  })
  projectLink: string;

  @ApiProperty({
    type: String,
  })
  documentLink: string;

  @ApiProperty({
    type: String,
  })
  designLink: string;
}

export class ReorderTaskDTO {
  @ApiProperty({
    type: Number,
    required: true,
  })
  sourceIndex: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  destinationIndex: number;
}


export class MoveTaskDTO {
  @ApiProperty({
    type: Number,
    required: true,
  })
  destinationIndex: number;
}
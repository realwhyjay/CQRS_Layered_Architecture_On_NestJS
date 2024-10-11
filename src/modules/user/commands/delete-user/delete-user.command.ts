import { CommandProps } from '@common/cqrs';

export class DeleteUserCommand {
  readonly userId: number;

  constructor(props: CommandProps<DeleteUserCommand>) {
    this.userId = props.userId;
  }
}

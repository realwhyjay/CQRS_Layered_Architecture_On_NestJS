import { Command, CommandProps } from '@common/cqrs';

export class DeleteUserCommand extends Command {
  readonly userId: number;

  constructor(props: CommandProps<DeleteUserCommand>) {
    super(props);
    this.userId = props.userId;
  }
}

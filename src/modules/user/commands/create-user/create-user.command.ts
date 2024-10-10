import { Command, CommandProps } from '@common/cqrs';

export class CreateUserCommand extends Command {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.phone = props.phone;
    this.email = props.email;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  @Input() userId: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(user => this.user = user);
  }

}

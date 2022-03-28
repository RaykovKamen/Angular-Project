import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}

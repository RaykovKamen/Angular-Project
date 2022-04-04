import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import {
  MessageBusService,
  MessageType,
} from 'src/app/core/service/message-bus.service';
import { EditUserDto, UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser: IUser;

  isInEditMode: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  enterEditMode(): void {
    this.isInEditMode = true;

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        email: this.currentUser.email,
        username: this.currentUser.username,
        tel: this.currentUser.tel,
      });
    });
  }

  updateProfile(): void {
    const { username, email, tel } = this.editProfileForm.value;

    const body: EditUserDto = {
      username: username,
      email: email,
    };
    if (tel) {
      body.tel = tel;
    }

    this.userService.updateProfile(body).subscribe({
      next: () => {
        this.isInEditMode = false;
      },
    });

    this.messageBus.notifyForMessage({
      text: 'User successfuly updated!',
      type: MessageType.Success,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User;
  users: User[];
  userForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.nullValidator),
    adresse: new FormControl('', Validators.nullValidator),
    telephone: new FormControl('', Validators.nullValidator),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    role: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get prenom() {
    return this.userForm.get('prenom');
  }

  get nom() {
    return this.userForm.get('nom');
  }

  get cin() {
    return this.userForm.get('cin');
  }

  get adresse() {
    return this.userForm.get('adresse');
  }
  get telephone() {
    return this.userForm.get('telephone');
  }

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }
  get role() {
    return this.userForm.get('role');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.user = this.userForm.value;
    console.log(this.user);
    this.userService.save(this.user).subscribe((result) => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

  reset() {
    this.userForm.reset();
  }
}

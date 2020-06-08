import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  user: User;
  users: User[];
  id: string;
  userForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.nullValidator),
    adresse: new FormControl('', Validators.nullValidator),
    telephone: new FormControl('', Validators.nullValidator),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    role: new FormControl('', Validators.required),
    password: new FormControl('', Validators.nullValidator),
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

  get agence() {
    return this.userForm.get('agence');
  }
  get password() {
    return this.userForm.get('password');
  }
  get role() {
    return this.userForm.get('role');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.findUser(this.id).subscribe(
      (data) => {
        this.user = data[0];
        this.adresse.setValue(this.user.adresse);
        this.nom.setValue(this.user.nom);
        this.telephone.setValue(this.user.telephone);
        this.prenom.setValue(this.user.prenom);
        this.email.setValue(this.user.email);
        this.username.setValue(this.user.username);
        this.cin.setValue(this.user.cin);
        this.role.setValue(this.user.role);
        this.password.setValue(this.user.password);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    if (this.password.value == this.user.password) {
      this.password.setValue(null);
    }
    this.user = this.userForm.value;

    this.userService
      .update(this.id, this.user)
      .subscribe((result) => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['users']);
  }

  reset() {
    this.userForm.reset(this.user);
  }

  goBack() {
    this.router.navigate(['users']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../model/provider';
import { ProviderService } from '../../service/provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css'],
})
export class ProviderFormComponent implements OnInit {
  providerForm: FormGroup;
  provider: Provider;

  get id() {
    return this.providerForm.get('id');
  }
  get nom() {
    return this.providerForm.get('nom');
  }
  get adresse() {
    return this.providerForm.get('adresse');
  }
  get telephone() {
    return this.providerForm.get('telephone');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService
  ) {
    this.provider = new Provider();
  }
  onSubmit() {
    this.provider = this.providerForm.value;
    this.providerService
      .save(this.provider)
      .subscribe((result) => this.gotoCategoryList());
  }

  gotoCategoryList() {
    this.router.navigate(['/providers']);
  }

  ngOnInit(): void {
    this.providerForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.nullValidator),
      telephone: new FormControl('', Validators.nullValidator),
    });
  }
}
